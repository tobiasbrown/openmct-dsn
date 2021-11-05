import DsnParser from './DsnParser.js';
import DsnTelemetryProvider from './DsnTelemetryProvider.js';
import { DSN_NAMESPACE } from './constants.js';
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

    const signalsDomainObject = {
        'identifier': {
            'key': 'dss14.signals',
            'namespace': 'deep.space.network'
        },
        'name': 'Signals',
        'telemetry': {
            'values': [
                {
                    'hints': {
                        'domain': 1
                    },
                    'key': 'dss14.signal.spacecraft.friendly.name',
                    'name': 'Spacecraft'
                },
                {
                    'hints': {
                        'domain': 1
                    },
                    'key': 'dss14.signal.direction',
                    'name': 'Direction'
                },
                {
                    'hints': {
                        'domain': 1
                    },
                    'key': 'dss14.signal.type',
                    'name': 'Type'
                },
                {
                    'hints': {
                        'domain': 1
                    },
                    'key': 'dss14.signal.type.debug',
                    'name': 'Debug'
                },
                {
                    'format': 'data-rate-to-string',
                    'hints': {
                        'domain': 1
                    },
                    'key': 'dss14.signal.data.rate',
                    'name': 'Data rate'
                },
                {
                    'format': 'frequency-to-string',
                    'hints': {
                        'domain': 1
                    },
                    'key': 'dss14.signal.frequency',
                    'name': 'Frequency'
                },
                {
                    'format': 'power-to-string',
                    'hints': {
                        'domain': 1
                    },
                    'key': 'dss14.signal.power',
                    'name': 'Power'
                },
                {
                    'format': 'utc',
                    'hints': {
                        'domain': 1
                    },
                    'key': 'utc',
                    'name': 'UTC',
                    'source': 'gdscc.utc.time'
                }
            ]
        },
        'type': 'dsn.telemetry'
    };

    const domainObjectWithTelemetry = {
        'identifier': {
            'key': 'mdscc.latitude',
            'namespace': DSN_NAMESPACE
        },
        'name': 'Latitude',
        'telemetry': {
            'values': [
                {
                    'hints': {
                        'domain': 1
                    },
                    'key': 'mdscc.latitude',
                    'name': 'Latitude'
                },
                {
                    'format': 'utc',
                    'hints': {
                        'domain': 1
                    },
                    'key': 'utc',
                    'name': 'UTC',
                    'source': 'mdscc.utc.time'
                }
            ]
        },
        'type': 'dsn.telemetry'
    };

    const domainObjectWithoutTelemetry = {
        'composition': [],
        'identifier': {
            'key': 'gdscc.dss14',
            'namespace': DSN_NAMESPACE
        },
        'name': 'DSS 14',
        'type': 'folder'
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

    it('supports subscriptions for DSN telemetry', function () {
        expect(telemetryProvider.supportsSubscribe(domainObjectWithTelemetry)).toBe(true);
    });

    it('does not support other subscriptions', function () {
        expect(telemetryProvider.supportsSubscribe(domainObjectWithoutTelemetry)).toBe(false);
    });

    it('subscription returns a function', function () {
        function callback() {
            return null;
        }

        const unsubscribe = telemetryProvider.subscribe(domainObjectWithTelemetry, callback);
        expect(unsubscribe).toEqual(jasmine.any(Function));
    });

    describe('invokes a callback', function () {
        let callback;

        beforeEach(function () {
            callback = jasmine.createSpy('callback');
        });

        it('with a datum that has no value', function () {
            const key = domainObjectWithTelemetry.identifier.key;
            dsn.data[key] = '';
            telemetryProvider.provideTelemetry(dsn, domainObjectWithTelemetry, callback);
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith({ [key]: '' });
        });

        it('once with a datum that has a value', function () {
            telemetryProvider.provideTelemetry(dsn, domainObjectWithTelemetry, callback);
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(
                {
                    'mdscc.latitude': 40.2413554,
                    'mdscc.utc.time': 1549708172929
                }
            );
        });

        it('multiple times with a datum that has multiple values', function () {
            telemetryProvider.provideTelemetry(dsn, signalsDomainObject, callback);
            expect(callback).toHaveBeenCalledTimes(2);
            expect(callback).toHaveBeenCalledWith({
                'dss14.signal.direction': 'down',
                'dss14.signal.type': 'data',
                'dss14.signal.type.debug': 'IN LOCK OFF 1 MCD2',
                'dss14.signal.data.rate': 160.002853,
                'dss14.signal.frequency': 8420585323.254991,
                'dss14.signal.power': -155.647873,
                'dss14.signal.spacecraft': 'VGR1',
                'dss14.signal.spacecraft.id': 31,
                'dss14.signal.spacecraft.friendly.name': 'Voyager 1',
                'gdscc.utc.time': 1549708172929
            });

            expect(callback).toHaveBeenCalledWith({
                'dss14.signal.direction': 'up',
                'dss14.signal.type': 'none',
                'dss14.signal.type.debug': 'none',
                'dss14.signal.data.rate': 160.002853,
                'dss14.signal.frequency': 8420585323.254991,
                'dss14.signal.power': -155.647873,
                'dss14.signal.spacecraft': '',
                'dss14.signal.spacecraft.id': '',
                'dss14.signal.spacecraft.friendly.name': undefined,
                'gdscc.utc.time': 1549708172929
            });
        });
    });
});
