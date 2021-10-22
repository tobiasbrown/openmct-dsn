import {
    deserializeIdentifier,
    getStationNameByDish,
    parseTelemetryAsFloatOrString,
    parseTelemetryAsIntegerOrString,
    serializeIdentifier
} from './DsnUtils.js';

describe('DsnUtils', function () {
    it('deserializes a domain object identifier', function () {
        const identifier = deserializeIdentifier('deep.space.network:canberra');
        expect(identifier.namespace).toBe('deep.space.network');
        expect(identifier.key).toBe('canberra');
    });

    it('serializes a domain object identifier', function () {
        const identifer = serializeIdentifier({
            namespace: 'deep.space.network',
            key: 'madrid'
        });

        expect(identifer).toBe('deep.space.network:madrid');
    });

    it('logs a warning to the console when unknown dish is provided', function () {
        spyOn(console, 'warn');
        getStationNameByDish('iss');
        expect(console.warn).toHaveBeenCalled();
    });

    describe('returns Goldstone station name for', function () {
        let station;

        afterEach(function () {
            station = null;
        });

        it('DSS14', function () {
            station = getStationNameByDish('dss14');
            expect(station).toBe('gdscc');
        });

        it('DSS24', function () {
            station = getStationNameByDish('dss24');
            expect(station).toBe('gdscc');
        });

        it('DSS25', function () {
            station = getStationNameByDish('dss25');
            expect(station).toBe('gdscc');
        });

        it('DSS26', function () {
            station = getStationNameByDish('dss26');
            expect(station).toBe('gdscc');
        });
    });

    describe('returns Canberra station name for', function () {
        let station;

        afterEach(function () {
            station = null;
        });

        it('DSS34', function () {
            station = getStationNameByDish('dss34');
            expect(station).toBe('cdscc');
        });

        it('DSS35', function () {
            station = getStationNameByDish('dss35');
            expect(station).toBe('cdscc');
        });

        it('DSS36', function () {
            station = getStationNameByDish('dss36');
            expect(station).toBe('cdscc');
        });

        it('DSS43', function () {
            station = getStationNameByDish('dss43');
            expect(station).toBe('cdscc');
        });
    });

    describe('returns Madrid station name for', function () {
        let station;

        afterEach(function () {
            station = null;
        });

        it('DSS54', function () {
            station = getStationNameByDish('dss54');
            expect(station).toBe('mdscc');
        });

        it('DSS55', function () {
            station = getStationNameByDish('dss55');
            expect(station).toBe('mdscc');
        });

        it('DSS56', function () {
            station = getStationNameByDish('dss56');
            expect(station).toBe('mdscc');
        });

        it('DSS63', function () {
            station = getStationNameByDish('dss63');
            expect(station).toBe('mdscc');
        });

        it('DSS65', function () {
            station = getStationNameByDish('dss65');
            expect(station).toBe('mdscc');
        });
    });

    describe('parses telemetry', function () {
        let downSignal;

        beforeEach(function () {
            downSignal = document.createElement('downSignal');
        });

        afterEach(function () {
            downSignal = null;
        });

        it('as a float', function () {
            let dataRate;

            downSignal.setAttribute('dataRate', '160.002853');
            dataRate = parseTelemetryAsFloatOrString(downSignal, 'dataRate');
            expect(dataRate).toBe(160.002853);
        });

        it('as a string when a float can not be parsed', function () {
            let dataRate;
            let frequency;
            let power;

            downSignal.setAttribute('dataRate', '');
            downSignal.setAttribute('frequency', ' ');
            downSignal.setAttribute('power', 'none');

            dataRate = parseTelemetryAsFloatOrString(downSignal, 'dataRate');
            frequency = parseTelemetryAsFloatOrString(downSignal, 'frequency');
            power = parseTelemetryAsFloatOrString(downSignal, 'power');

            expect(dataRate).toBe('');
            expect(frequency).toBe(' ');
            expect(power).toBe('none');
        });

        it('as an integer', function () {
            let dataRate;

            downSignal.setAttribute('dataRate', '160');
            dataRate = parseTelemetryAsIntegerOrString(downSignal, 'dataRate');
            expect(dataRate).toBe(160);
        });

        it('as a string when an integer can not be parsed', function () {
            let dataRate;
            let frequency;
            let power;

            downSignal.setAttribute('dataRate', '');
            downSignal.setAttribute('frequency', ' ');
            downSignal.setAttribute('power', 'none');

            dataRate = parseTelemetryAsIntegerOrString(downSignal, 'dataRate');
            frequency = parseTelemetryAsIntegerOrString(downSignal, 'frequency');
            power = parseTelemetryAsIntegerOrString(downSignal, 'power');

            expect(dataRate).toBe('');
            expect(frequency).toBe(' ');
            expect(power).toBe('none');
        });
    });
});
