import { DSN_TELEMETRY_TYPE } from "./constants.js";
import { getDsnData } from "./dsn-requests.js";

class DsnTelemetryProvider {
    constructor(config) {
        this.config = config;
    }

    supportsSubscribe(domainObject) {
        return domainObject.type === DSN_TELEMETRY_TYPE || domainObject.type === 'table';
    }

    subscribe(domainObject, callback, options) {
        const config = this.config;
        const listeners = {};

        // Keep track of the domain objects subscribed
        if (!listeners[domainObject.identifier.key]) {
            listeners[domainObject.identifier.key] = [];
        }

        listeners[domainObject.identifier.key].push(callback);

        // DSN data is updated every 5 seconds
        const interval = setInterval(function () {
            getDsnData(config)
                .then(dsn => {
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
                });
        }, 5000);

        return function () {
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
