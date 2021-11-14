import DsnIndicator from './DsnIndicator.js';
import { CANBERRA_ANTENNAS } from './constants.js';

describe('DsnIndicator', function () {
    const simpleIndicator = {
        description: jasmine.createSpy(),
        iconClass: jasmine.createSpy(),
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
});
