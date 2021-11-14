import DsnIndicator from './DsnIndicator.js';

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

    beforeEach(function () {
        indicator = new DsnIndicator(openmct);
    });

    it('formats status with no active antennas', function () {
        const status = indicator.formatAntennaStatus('Canberra', []);
        expect(status).toEqual('Canberra: 0');
    });
});
