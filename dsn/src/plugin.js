import {
    DSN_KEY,
    DSN_NAMESPACE,
    DSN_TELEMETRY_TYPE
} from './constants.js';

import DsnParser from './DsnParser.js';
import DsnTelemetryProvider from './DsnTelemetryProvider.js';
import { compositionProvider } from './dsn-composition-provider.js';
import { objectProvider } from './dsn-object-provider.js';
import { getDsnConfiguration } from './dsn-requests.js';

export default function DsnPlugin() {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: DSN_NAMESPACE,
            key: DSN_KEY
        });

        // Original formatter calculations: https://eyes.nasa.gov/dsn/javascripts/main.js

        // Antenna formatters
        openmct.telemetry.addFormat({
            key: 'angle-to-string',
            format: function (angle) {
                // Assumes angle is in degrees
                return typeof angle === 'number' ? angle.toFixed(2) + ' deg' : angle;
            },
            parse: function (angle) {
                return typeof angle === 'string' ? parseFloat(angle) : angle;
            },
            validate: function (angle) {
                return !isNaN(parseFloat(angle));
            }
        });

        openmct.telemetry.addFormat({
            key: 'wind-speed-to-string',
            format: function (windSpeed) {
                // Assumes wind speed is in km/hr
                return typeof windSpeed === 'number' ? windSpeed.toFixed(2) + ' km/hr' : windSpeed;
            },
            parse: function (windSpeed) {
                return typeof windSpeed === 'string' ? parseFloat(windSpeed) : windSpeed;
            },
            validate: function (windSpeed) {
                return !isNaN(parseFloat(windSpeed));
            }
        });

        // Signal formatters
        openmct.telemetry.addFormat({
            key: 'data-rate-to-string',
            format: function (dataRate) {
                // Assumes data rate is in b/sec
                if (typeof dataRate === 'number') {
                    if (dataRate < 1000) {
                        return dataRate.toFixed(2) + ' b/sec';
                    } else if (dataRate < 1000000) {
                        return (dataRate / 1000).toFixed(2) + ' kb/sec';
                    } else if (dataRate < 1000000000) {
                        return (dataRate / 1000000).toFixed(2) + ' Mb/sec';
                    } else if (dataRate < 1000000000000) {
                        return (dataRate / 1000000000).toFixed(2) + ' Gb/sec';
                    } else if (dataRate < 1000000000000000) {
                        return (dataRate / 1000000000000).toFixed(2) + ' Tb/sec';
                    } else {
                        return (dataRate / 1000000000000000).toFixed(2) + ' Pb/sec';
                    }
                } else {
                    return dataRate;
                }
            },
            parse: function (dataRate) {
                return typeof dataRate === 'string' ? parseFloat(dataRate) : dataRate;
            },
            validate: function (dataRate) {
                return !isNaN(parseFloat(dataRate));
            }
        });

        openmct.telemetry.addFormat({
            key: 'frequency-to-string',
            format: function (frequency) {
                // Assumes frequency is in Hz
                if (typeof frequency === 'number') {
                    if (frequency < 1000) {
                        return frequency.toFixed(2) + ' Hz';
                    } else if (frequency < 1000000) {
                        return (frequency / 1000).toFixed(2) + ' kHz';
                    } else if (frequency < 1000000000) {
                        return (frequency / 1000000).toFixed(2) + ' MHz';
                    } else if (frequency < 1000000000000) {
                        return (frequency / 1000000000).toFixed(2) + ' GHz';
                    } else {
                        return (frequency / 1000000000000) + ' THz';
                    }
                } else {
                    return frequency;
                }
            },
            parse: function (frequency) {
                return typeof frequency === 'string' ? parseFloat(frequency) : frequency;
            },
            validate: function (frequency) {
                return !isNaN(parseFloat(frequency));
            }
        });

        openmct.telemetry.addFormat({
            key: 'power-to-string',
            format: function (power) {
                // Assumes power is in kW or dBm (if negative)
                if (typeof power === 'number') {
                    if (power >= 0) {
                        return power.toFixed(2) + ' kW';
                    } else {
                        return power.toFixed(2) + ' dBm';
                    }
                } else {
                    return power;
                }
            },
            parse: function (power) {
                return typeof power === 'string' ? parseFloat(power) : power;
            },
            validate: function (power) {
                return !isNaN(parseFloat(power));
            }
        });

        // Target formatters
        openmct.telemetry.addFormat({
            key: 'range-to-string',
            format: function (distance) {
                // Assumes distance is in km
                if (typeof distance === 'number') {
                    if (distance >= 0) {
                        if (distance < 1000) {
                            return distance.toFixed(2) + ' km';
                        } else if (distance < 1000000) {
                            return (distance / 1000).toFixed(2) + ' thousand km';
                        } else if (distance < 1000000000) {
                            return (distance / 1000000).toFixed(2) + ' million km';
                        } else if (distance < 1000000000000) {
                            return (distance / 1000000000).toFixed(2) + ' billion km';
                        } else if (distance < 1000000000000000) {
                            return (distance / 1000000000000).toFixed(2) + ' trillion km';
                        } else {
                            return (distance / 1000000000000000).toFixed(2) + ' quadrillion km';
                        }
                    } else {
                        return distance;
                    }
                } else {
                    return distance;
                }
            },
            parse: function (distance) {
                return typeof distance === 'string' ? parseFloat(distance) : distance;
            },
            validate: function (distance) {
                return !isNaN(parseFloat(distance));
            }
        });

        openmct.telemetry.addFormat({
            key: 'light-time-to-string',
            format: function (lightTime) {
                // Assumes light time is in seconds
                if (typeof lightTime === 'number') {
                    if (lightTime >= 0) {
                        if (lightTime < 60) {
                            return lightTime.toFixed(2) + ' sec';
                        } else if (lightTime < 3600) {
                            return (lightTime / 60).toFixed(2) + ' minutes';
                        } else if (lightTime < 86400) {
                            return (lightTime / 3600).toFixed(2) + ' hours';
                        } else if (lightTime < 604800) {
                            return (lightTime / 86400).toFixed(2) + ' days';
                        } else {
                            return (lightTime / 604800).toFixed(2) + ' weeks';
                        }
                    } else {
                        return lightTime;
                    }
                } else {
                    return lightTime;
                }
            },
            parse: function (lightTime) {
                return typeof lightTime === 'string' ? parseFloat(lightTime) : lightTime;
            },
            validate: function (lightTime) {
                return !isNaN(parseFloat(lightTime));
            }
        });

        getDsnConfiguration()
            .then(data => {
                const domParser = new DOMParser();
                const parser = new DsnParser();
                const xml = domParser.parseFromString(data, 'application/xml');
                const dsn = parser.parseXml(xml);

                openmct.telemetry.addProvider(new DsnTelemetryProvider(dsn.data));
            });

        openmct.objects.addProvider(DSN_NAMESPACE, objectProvider);
        openmct.composition.addProvider(compositionProvider);

        // This type represents DSN domain objects with telemetry
        openmct.types.addType(DSN_TELEMETRY_TYPE, {
            name: 'DSNTelemetry',
            description: 'A DSN domain object with telemetry.',
            cssClass: 'icon-telemetry'
        });
    };
}
