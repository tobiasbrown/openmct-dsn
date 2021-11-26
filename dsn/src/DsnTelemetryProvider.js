import { DSN_TELEMETRY_TYPE } from './dsn-constants.js';
import { getDsnData } from './dsn-requests.js';

class DsnTelemetryProvider {
    constructor(config, indicator) {
        this.config = config;
        this.indicator = indicator;
    }

    provideTelemetry(dsn, domainObject, callback) {
        let dsnData = '';

        if (Object.prototype.hasOwnProperty.call(dsn.data, domainObject.identifier.key)) {
            if (typeof dsn.data[domainObject.identifier.key] === 'object') {
                dsnData = dsn.data[domainObject.identifier.key];
            } else {
                dsnData = {};
                dsnData[domainObject.identifier.key] = dsn.data[domainObject.identifier.key];
            }
        }

        // Invoke the callback with the updated datum
        if (Array.isArray(dsnData)) {
            dsnData.forEach(function (value) {
                callback(value);
            });
        } else {
            callback(dsnData);
        }
    }

    supportsSubscribe(domainObject) {
        return domainObject.type === DSN_TELEMETRY_TYPE;
    }

    subscribe(domainObject, callback, options) {
        const config = this.config;
        const indicator = this.indicator;
        const listeners = {};
        const provideTelemetry = this.provideTelemetry;

        // Keep track of the domain objects subscribed
        if (!listeners[domainObject.identifier.key]) {
            listeners[domainObject.identifier.key] = [];
        }

        listeners[domainObject.identifier.key].push(callback);

        // DSN data is updated every 5 seconds
        const interval = setInterval(function () {
            getDsnData(config)
                .then(dsn => {
                    provideTelemetry(dsn, domainObject, callback);
                    indicator.setActiveAntennas(dsn);
                })
                .catch(error => {
                    indicator.setError(error);
                });
        }, 5000);

        return function unsubscribe() {
            // Stop polling the DSN site
            clearInterval(interval);

            // Unsubscribe domain object
            listeners[domainObject.identifier.key] =
                        listeners[domainObject.identifier.key].filter(function (c) {
                            return c !== callback;
                        });
        };
    }
}

export default DsnTelemetryProvider;
