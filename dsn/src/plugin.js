import {
    DSN_KEY,
    DSN_NAMESPACE,
    DSN_TELEMETRY_TYPE
} from './constants.js';

import {
    angleToString,
    dataRateToString,
    frequencyToString,
    lightTimeToString,
    powerToString,
    rangeToString,
    windSpeedToString
} from './dsn-formatters.js';

import DsnTelemetryProvider from './DsnTelemetryProvider.js';
import { objectProvider } from './dsn-object-provider.js';
import { getDsnConfiguration } from './dsn-requests.js';

export default function DsnPlugin() {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: DSN_NAMESPACE,
            key: DSN_KEY
        });

        // Antenna formatters
        openmct.telemetry.addFormat(angleToString);
        openmct.telemetry.addFormat(windSpeedToString);

        // Signal formatters
        openmct.telemetry.addFormat(dataRateToString);
        openmct.telemetry.addFormat(frequencyToString);
        openmct.telemetry.addFormat(powerToString);

        // Target formatters
        openmct.telemetry.addFormat(rangeToString);
        openmct.telemetry.addFormat(lightTimeToString);

        getDsnConfiguration()
            .then(dsn => openmct.telemetry.addProvider(new DsnTelemetryProvider(dsn.data)));

        openmct.objects.addProvider(DSN_NAMESPACE, objectProvider);

        // This type represents DSN domain objects with telemetry
        openmct.types.addType(DSN_TELEMETRY_TYPE, {
            name: 'DSNTelemetry',
            description: 'A DSN domain object with telemetry.',
            cssClass: 'icon-telemetry'
        });
    };
}
