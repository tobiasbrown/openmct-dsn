import DsnUtils from './DsnUtils.js';

describe('DsnUtils', function () {
    it('deserializes a domain object identifier', function () {
        const identifier = DsnUtils.deserializeIdentifier('deep.space.network:canberra');
        expect(identifier.namespace).toBe('deep.space.network');
        expect(identifier.key).toBe('canberra');
    });

    it('serializes a domain object identifier', function () {
        const identifer = DsnUtils.serializeIdentifier({
            namespace: 'deep.space.network',
            key: 'madrid'
        });

        expect(identifer).toBe('deep.space.network:madrid');
    });

    it('logs a warning to the console when unknown dish is provided', function () {
        spyOn(console, 'warn');
        DsnUtils.getStationNameByDish('iss');
        expect(console.warn).toHaveBeenCalled();
    });

    describe('returns Goldstone station name for', function () {
        let station;

        afterEach(function () {
            station = null;
        });

        it('DSS14', function () {
            station = DsnUtils.getStationNameByDish('dss14');
            expect(station).toBe('gdscc');
        });

        it('DSS24', function () {
            station = DsnUtils.getStationNameByDish('dss24');
            expect(station).toBe('gdscc');
        });

        it('DSS25', function () {
            station = DsnUtils.getStationNameByDish('dss25');
            expect(station).toBe('gdscc');
        });

        it('DSS26', function () {
            station = DsnUtils.getStationNameByDish('dss26');
            expect(station).toBe('gdscc');
        });
    });

    describe('returns Canberra station name for', function () {
        let station;

        afterEach(function () {
            station = null;
        });

        it('DSS34', function () {
            station = DsnUtils.getStationNameByDish('dss34');
            expect(station).toBe('cdscc');
        });

        it('DSS35', function () {
            station = DsnUtils.getStationNameByDish('dss35');
            expect(station).toBe('cdscc');
        });

        it('DSS36', function () {
            station = DsnUtils.getStationNameByDish('dss36');
            expect(station).toBe('cdscc');
        });

        it('DSS43', function () {
            station = DsnUtils.getStationNameByDish('dss43');
            expect(station).toBe('cdscc');
        });
    });

    describe('returns Madrid station name for', function () {
        let station;

        afterEach(function () {
            station = null;
        });

        it('DSS54', function () {
            station = DsnUtils.getStationNameByDish('dss54');
            expect(station).toBe('mdscc');
        });

        it('DSS55', function () {
            station = DsnUtils.getStationNameByDish('dss55');
            expect(station).toBe('mdscc');
        });

        it('DSS56', function () {
            station = DsnUtils.getStationNameByDish('dss56');
            expect(station).toBe('mdscc');
        });

        it('DSS63', function () {
            station = DsnUtils.getStationNameByDish('dss63');
            expect(station).toBe('mdscc');
        });

        it('DSS65', function () {
            station = DsnUtils.getStationNameByDish('dss65');
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
            dataRate = DsnUtils.parseTelemetryAsFloatOrString(downSignal, 'dataRate');
            expect(dataRate).toBe(160.002853);
        });

        it('as a string when a float can not be parsed', function () {
            let dataRate;
            let frequency;
            let power;

            downSignal.setAttribute('dataRate', '');
            downSignal.setAttribute('frequency', ' ');
            downSignal.setAttribute('power', 'none');

            dataRate = DsnUtils.parseTelemetryAsFloatOrString(downSignal, 'dataRate');
            frequency = DsnUtils.parseTelemetryAsFloatOrString(downSignal, 'frequency');
            power = DsnUtils.parseTelemetryAsFloatOrString(downSignal, 'power');

            expect(dataRate).toBe('');
            expect(frequency).toBe(' ');
            expect(power).toBe('none');
        });

        it('as an integer', function () {
            let dataRate;

            downSignal.setAttribute('dataRate', '160');
            dataRate = DsnUtils.parseTelemetryAsIntegerOrString(downSignal, 'dataRate');
            expect(dataRate).toBe(160);
        });

        it('as a string when an integer can not be parsed', function () {
            let dataRate;
            let frequency;
            let power;

            downSignal.setAttribute('dataRate', '');
            downSignal.setAttribute('frequency', ' ');
            downSignal.setAttribute('power', 'none');

            dataRate = DsnUtils.parseTelemetryAsIntegerOrString(downSignal, 'dataRate');
            frequency = DsnUtils.parseTelemetryAsIntegerOrString(downSignal, 'frequency');
            power = DsnUtils.parseTelemetryAsIntegerOrString(downSignal, 'power');

            expect(dataRate).toBe('');
            expect(frequency).toBe(' ');
            expect(power).toBe('none');
        });
    });
});
