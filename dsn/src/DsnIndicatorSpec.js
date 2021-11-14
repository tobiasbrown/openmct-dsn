import DsnIndicator from './DsnIndicator.js';
import { CANBERRA_ANTENNAS, GOLDSTONE_ANTENNAS, MADRID_ANTENNAS } from './constants.js';

describe('DsnIndicator', function () {
    const simpleIndicator = {
        description: jasmine.createSpy(),
        iconClass: jasmine.createSpy(),
        statusClass: jasmine.createSpy(),
        text: jasmine.createSpy()
    };

    const openmct = jasmine.createSpyObj('openmct', ['indicators']);
    openmct.indicators = jasmine.createSpyObj('indicators', ['simpleIndicator']);
    openmct.indicators.simpleIndicator = jasmine.createSpy().and.callFake(() => simpleIndicator);

    let indicator;
    const dsn = {
        data: {
            'dss25.signals': [{}],
            'dss54.signals': [{}],
            'dss55.signals': [{}, {}]
        }
    };

    beforeEach(function () {
        indicator = new DsnIndicator(openmct);
    });

    it('formats status with no active antennas', function () {
        const status = indicator.formatAntennaStatus('Canberra', []);
        expect(status).toEqual('Canberra: 0');
    });

    it('formats status with one active antenna', function () {
        const status = indicator.formatAntennaStatus('Goldstone', ['dss14']);
        expect(status).toEqual('Goldstone: 1 (DSS 14)');
    });

    it('formats status with multiple active antennas', function () {
        const status = indicator.formatAntennaStatus('Madrid', ['dss54', 'dss55', 'dss63']);
        expect(status).toEqual('Madrid: 3 (DSS 54, DSS 55, DSS 63)');
    });

    it('finds no active antennas', function () {
        const activeAntennas = indicator.getActiveAntennas(dsn, CANBERRA_ANTENNAS);
        expect(activeAntennas).toEqual([]);
    });

    it('finds one active antenna', function () {
        const activeAntennas = indicator.getActiveAntennas(dsn, GOLDSTONE_ANTENNAS);
        expect(activeAntennas).toEqual(['dss25']);
    });

    it('finds multiple active antennas', function () {
        const activeAntennas = indicator.getActiveAntennas(dsn, MADRID_ANTENNAS);
        expect(activeAntennas).toEqual(['dss54', 'dss55']);
    });

    it('updates the status class when setting active antennas', function () {
        const expected = 's-status-ok';
        indicator.setActiveAntennas(dsn);
        expect(indicator.indicator.statusClass).toHaveBeenCalledWith(expected);
    });

    it('updates the description when setting active antennas', function () {
        const expected = 'Canberra: 0\nGoldstone: 1 (DSS 25)\nMadrid: 2 (DSS 54, DSS 55)';
        indicator.setActiveAntennas(dsn);
        expect(indicator.indicator.description).toHaveBeenCalledWith(expected);
    });

    it('updates the status class when setting an error', function () {
        const expected = 's-status-error';
        indicator.setError('error');
        expect(indicator.indicator.statusClass).toHaveBeenCalledWith(expected);
    });

    it('updates the description when setting an error', function () {
        const expected = 'error';
        indicator.setError(expected);
        expect(indicator.indicator.description).toHaveBeenCalledWith(expected);
    });
});
