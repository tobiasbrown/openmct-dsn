import DsnParser from './DsnParser.js';
import testXmlConfigResponse from '!!raw-loader!../res/test-dsn-config-response.xml';
import testXmlResponse from '!!raw-loader!../res/test-dsn-response.xml';

describe('DsnParser', function () {
    const domParser = new DOMParser();

    describe('parses a response', function () {
        let dsn;
        let dsnParser;
        let dsnXml;

        beforeEach(function () {
            dsnXml = domParser.parseFromString('<dsn></dsn>', 'application/xml');
            dsnParser = new DsnParser();
            dsn = dsnParser.parseXml(dsnXml);
        });

        afterEach(function () {
            dsn = null;
            dsnParser = null;
            dsnXml = null;
        });

        it('with no child elements', function () {
            expect(dsn.data).toBeDefined();
            expect(Object.keys(dsn.data).length).toBe(0);
        });
    });

    describe('parses a response', function () {
        let dsn;
        let dsnParser;
        let dsnXml;
        let xml;

        beforeEach(function () {
            xml = '<dsn><spacecraft id="1" name="VGR1" friendlyName="Voyager 1" /></dsn>';
            dsnXml = domParser.parseFromString(xml, 'application/xml');
            dsnParser = new DsnParser();
            dsn = dsnParser.parseXml(dsnXml);
        });

        afterEach(function () {
            dsn = null;
            dsnParser = null;
            dsnXml = null;
        });

        it('with an unknown element', function () {
            expect(dsn.data).toBeDefined();
            expect(Object.keys(dsn.data).length).toBe(0);
        });
    });

    describe('parses a config response', function () {
        let dsn;
        let dsnParser;
        let dsnXml;

        beforeEach(function () {
            dsnXml = domParser.parseFromString(testXmlConfigResponse, 'application/xml');
            dsnParser = new DsnParser();
            dsn = dsnParser.parseXml(dsnXml);
        });

        afterEach(function () {
            dsn = null;
            dsnParser = null;
            dsnXml = null;
        });

        it('with a sites element', function () {
            expect(dsn.data['mdscc.name']).toBe('mdscc');
            expect(dsn.data['mdscc.friendly.name']).toBe('Madrid');
            expect(dsn.data['mdscc.station.longitude']).toBe(-4.2480085);
            expect(dsn.data['mdscc.station.latitude']).toBe(40.2413554);
        });

        it('with a spacecraftMap element', function () {
            expect(dsn.data['vgr2.name']).toBe('vgr2');
            expect(dsn.data['vgr2.explorer.name']).toBe('sc_voyager_2');
            expect(dsn.data['vgr2.friendly.name']).toBe('Voyager 2');
            expect(dsn.data['vgr2.thumbnail']).toBe(true);
        });
    });

    describe('parses a response', function () {
        let dsn;
        let dsnParser;
        let dsnXml;

        beforeEach(function () {
            dsnXml = domParser.parseFromString(testXmlResponse, 'application/xml');
            dsnParser = new DsnParser();
            dsn = dsnParser.parseXml(dsnXml);
        });

        afterEach(function () {
            dsn = null;
            dsnParser = null;
            dsnXml = null;
        });

        it('with a station element', function () {
            expect(dsn.data['cdscc.station']).toBeDefined();
            expect(dsn.data['cdscc.name']['cdscc.name']).toBe('cdscc');
            expect(dsn.data['cdscc.friendly.name']['cdscc.friendly.name']).toBe('Canberra');
            expect(dsn.data['cdscc.utc.time']['cdscc.utc.time']).toBe(1549708172929);
            expect(dsn.data['cdscc.time.zone.offset']['cdscc.time.zone.offset']).toBe(39600000);
        });

        describe('with a dish element', function () {
            it('containing signals and targets', function () {
                let downSignal = {};
                let upSignal = {};
                let target = {};

                expect(dsn.data['dss14.antenna']).toBeDefined();
                expect(dsn.data['dss14.name']['dss14.name']).toBe('DSS14');
                expect(dsn.data['dss14.azimuth.angle']['dss14.azimuth.angle']).toBe(86.24);
                expect(dsn.data['dss14.elevation.angle']['dss14.elevation.angle']).toBe(15.91);
                expect(dsn.data['dss14.wind.speed']['dss14.wind.speed']).toBe(12.35);
                expect(dsn.data['dss14.mspa']['dss14.mspa']).toBe(false);
                expect(dsn.data['dss14.array']['dss14.array']).toBe(false);
                expect(dsn.data['dss14.ddor']['dss14.ddor']).toBe(false);
                expect(dsn.data['dss14.created']['dss14.created']).toBe('2019-02-09T09:35:17.496Z');
                expect(dsn.data['dss14.updated']['dss14.updated']).toBe('2019-02-09T09:35:20.154Z');

                expect(dsn.data['dss14.signals']).toBeDefined();

                downSignal = dsn.data['dss14.signals'][0];
                expect(downSignal['dss14.signal.direction']).toBe('down');
                expect(downSignal['dss14.signal.type']).toBe('data');
                expect(downSignal['dss14.signal.type.debug']).toBe('IN LOCK OFF 1 MCD2');
                expect(downSignal['dss14.signal.data.rate']).toBe(160.002853);
                expect(downSignal['dss14.signal.frequency']).toBe(8420585323.254991);
                expect(downSignal['dss14.signal.power']).toBe(-155.647873);
                expect(downSignal['dss14.signal.spacecraft']).toBe('VGR1');
                expect(downSignal['dss14.signal.spacecraft.id']).toBe(31);

                upSignal = dsn.data['dss14.signals'][1];
                expect(upSignal['dss14.signal.direction']).toBe('up');
                expect(upSignal['dss14.signal.type']).toBe('none');
                expect(upSignal['dss14.signal.type.debug']).toBe('none');
                expect(upSignal['dss14.signal.data.rate']).toBe(160.002853);
                expect(upSignal['dss14.signal.frequency']).toBe(8420585323.254991);
                expect(upSignal['dss14.signal.power']).toBe(-155.647873);
                expect(upSignal['dss14.signal.spacecraft']).toBe('');
                expect(upSignal['dss14.signal.spacecraft.id']).toBe('');
                expect(dsn.data['dss14.targets']).toBeDefined();

                expect(dsn.data['dss14.targets']).toBeDefined();

                target = dsn.data['dss14.targets'][0];
                expect(target['dss14.target.name']).toBe('VGR1');
                expect(target['dss14.target.id']).toBe(31);
                expect(target['dss14.target.upleg.range']).toBe(21700581860.317);
                expect(target['dss14.target.downleg.range']).toBe(21698131625.495);
                expect(target['dss14.target.rtlt']).toBe(144764.894661);
            });

            it('containing signals with no data rate, frequency or power', function () {
                const mroDownSignal = dsn.data['dss35.signals'][1];
                const tgoDownSignal = dsn.data['dss35.signals'][0];

                expect(mroDownSignal['dss35.signal.data.rate']).toBe('');
                expect(mroDownSignal['dss35.signal.frequency']).toBe('');
                expect(mroDownSignal['dss35.signal.power']).toBe('');

                expect(tgoDownSignal['dss35.signal.data.rate']).toBe('none');
                expect(tgoDownSignal['dss35.signal.frequency']).toBe('none');
                expect(tgoDownSignal['dss35.signal.power']).toBe('none');
            });
        });

        it('with a timestamp element', function () {
            expect(dsn.data.timestamp).toBe(1549708172928);
        });
    });
});
