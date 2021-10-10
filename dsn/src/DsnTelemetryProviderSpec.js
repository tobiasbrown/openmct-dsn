import DsnParser from "./DsnParser.js";
import DsnTelemetryProvider from "./DsnTelemetryProvider.js";
import { DSN_NAMESPACE } from "./constants.js";
import testXmlConfigResponse from '!!raw-loader!../res/test-dsn-config-response.xml';
import testXmlResponse from '!!raw-loader!../res/test-dsn-response.xml';

describe('DsnTelemetryProvider', function () {
    let config;
    let configParser;
    let configXml;
    const domParser = new DOMParser();
    let dsn;
    let dsnParser;
    let dsnXml;
    let telemetryProvider;

    const domainObjectWithTelemetry = {
        "identifier": {
            "key": "mdscc.latitude",
            "namespace": DSN_NAMESPACE
        },
        "name": "Latitude",
        "telemetry": {
            "values": [
                {
                    "hints": {
                        "domain": 1
                    },
                    "key": "mdscc.latitude",
                    "name": "Latitude"
                },
                {
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    },
                    "key": "utc",
                    "name": "UTC",
                    "source": "mdscc.utc.time"
                }
            ]
        },
        "type": "dsn.telemetry"
    };

    const domainObjectWithoutTelemetry = {
        "composition": [],
        "identifier": {
            "key": "gdscc.dss14",
            "namespace": DSN_NAMESPACE
        },
        "name": "DSS 14",
        "type": "folder"
    };

    beforeEach(function () {
        configParser = new DsnParser();
        configXml = domParser.parseFromString(testXmlConfigResponse, 'application/xml');
        config = configParser.parseXml(configXml);

        dsnParser = new DsnParser(config.data);
        dsnXml = domParser.parseFromString(testXmlResponse, 'application/xml');
        dsn = dsnParser.parseXml(dsnXml);

        telemetryProvider = new DsnTelemetryProvider(dsn);
    });

    afterEach(function () {
        config = null;
        configParser = null;
        configXml = null;
        dsn = null;
        dsnParser = null;
        dsnXml = null;
        telemetryProvider = null;
    });

    it("supports subscriptions for DSN telemetry", function () {
        expect(telemetryProvider.supportsSubscribe(domainObjectWithTelemetry)).toBe(true);
    });

    it("does not support other subscriptions", function () {
        expect(telemetryProvider.supportsSubscribe(domainObjectWithoutTelemetry)).toBe(false);
    });

    describe('invokes a callback', function () {
        let callback;

        beforeEach(function () {
            callback = jasmine.createSpy('callback');
        });

        it("with a datum that has no value", function () {
            const key = domainObjectWithTelemetry.identifier.key;
            dsn.data[key] = '';
            telemetryProvider.provideTelemetry(dsn, domainObjectWithTelemetry, callback);
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith({ [key]: '' });
        });
    });
});
