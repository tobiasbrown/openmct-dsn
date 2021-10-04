import DsnParser from "./DsnParser.js";
import DsnTelemetryProvider from "./DsnTelemetryProvider.js";
import { DSN_NAMESPACE } from "./constants.js";
import testXmlConfigResponse from '!!raw-loader!../res/test-dsn-config-response.xml';

describe('DsnTelemetryProvider', function () {
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
        dsnXml = domParser.parseFromString(testXmlConfigResponse, 'application/xml');
        dsnParser = new DsnParser();
        dsn = dsnParser.parseXml(dsnXml);
        telemetryProvider = new DsnTelemetryProvider(dsn);
    });

    afterEach(function () {
        dsn = null;
        dsnParser = null;
        dsnXml = null;
    });

    it("supports subscriptions for DSN telemetry", function () {
        expect(telemetryProvider.supportsSubscribe(domainObjectWithTelemetry)).toBe(true);
    });

    it("does not support other subscriptions", function () {
        expect(telemetryProvider.supportsSubscribe(domainObjectWithoutTelemetry)).toBe(false);
    });
});
