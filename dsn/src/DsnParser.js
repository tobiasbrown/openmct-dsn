import {
    getStationNameByDish,
    parseTelemetryAsFloatOrString,
    parseTelemetryAsIntegerOrString
} from './dsn-utils.js';

class DsnParser {
    /**
     * Construct a new Deep Space Network parser.
     *
     * @memberof plugins/dsn
     * @param {object} config - The parsed configuration of the Deep Space Network.
     */
    constructor(config) {
        this.dsn = {
            data: config ? config : {}
        };
    }

    /**
     * Parses a sites tag contained in the Deep Space Network's configuration XML.
     *
     * @private
     * @param {Element} sitesElement - The sites to parse.
     * @returns {object} An object containing information about each site and its dishes.
     */
    parseSitesTag(sitesElement) {
        let dishElement;
        let dishKey = '';
        let siteElement;
        let siteKey = '';
        const sites = {};

        for (let i = 0; i < sitesElement.children.length; i++) {
            siteElement = sitesElement.children[i];
            siteKey = siteElement.getAttribute('name').toLowerCase();

            sites[siteKey + '.name'] = siteElement.getAttribute('name');
            sites[siteKey + '.friendly.name'] = siteElement.getAttribute('friendlyName');
            sites[siteKey + '.station.longitude'] = parseFloat(siteElement.getAttribute('longitude'));
            sites[siteKey + '.station.latitude'] = parseFloat(siteElement.getAttribute('latitude'));

            for (let j = 0; j < siteElement.children.length; j++) {
                dishElement = siteElement.children[j];
                dishKey = dishElement.getAttribute('name').toLowerCase();

                sites[dishKey + '.name'] = dishElement.getAttribute('name');
                sites[dishKey + '.dish.friendly.name'] = dishElement.getAttribute('friendlyName');
                sites[dishKey + '.dish.type'] = dishElement.getAttribute('type');
            }
        }

        return sites;
    }

    /**
     * Parses a spacecraftMap tag contained in the Deep Space Network's configuration XML.
     *
     * @private
     * @param {Element} spacecraftMapElement - The spacecraftMap to parse.
     * @returns {object} An object containing information about each spacecraft that is being tracked.
     */
    parseSpacecraftMapTag(spacecraftMapElement) {
        let key = '';
        let spacecraftElement;
        const spacecrafts = {};

        for (let i = 0; i < spacecraftMapElement.children.length; i++) {
            spacecraftElement = spacecraftMapElement.children[i];
            key = spacecraftElement.getAttribute('name').toLowerCase();

            spacecrafts[key + '.name'] = spacecraftElement.getAttribute('name');
            spacecrafts[key + '.explorer.name'] = spacecraftElement.getAttribute('explorerName');
            spacecrafts[key + '.friendly.name'] = spacecraftElement.getAttribute('friendlyName');
            spacecrafts[key + '.thumbnail'] = spacecraftElement.getAttribute('thumbnail') === 'true';
        }

        return spacecrafts;
    }

    /**
     * Parses the sites and spacecraftMap tags contained in the Deep Space Network's
     * configuration XML.
     *
     * @private
     * @param {Document} xmlDocument - The XML document representing the configuration of the
     * Deep Space Network.
     */
    parseDsnConfig(xmlDocument) {
        const configElements = xmlDocument.documentElement.children;
        let element;

        for (let i = 0; i < configElements.length; i++) {
            element = configElements[i];

            switch (element.tagName) {
                case 'sites':
                    Object.assign(this.dsn.data, this.parseSitesTag(element));
                    break;
                case 'spacecraftMap':
                    Object.assign(this.dsn.data, this.parseSpacecraftMapTag(element));
            }
        }
    }

    /**
     * Parses a station tag contained in the Deep Space Network's XML.
     *
     * @private
     * @param {Element} stationElement - The station to parse.
     * @returns {object} An object containing the station's data.
     */
    parseStationTag(stationElement) {
        const friendlyName = {};
        const key = stationElement.getAttribute('name').toLowerCase();
        const latitude = {};
        const longitude = {};
        const name = {};
        const station = {};
        const timeZoneOffset = {};
        const utcTime = {};

        name[key + '.name'] = stationElement.getAttribute('name');
        friendlyName[key + '.friendly.name'] = stationElement.getAttribute('friendlyName');
        utcTime[key + '.utc.time'] = parseInt(stationElement.getAttribute('timeUTC'), 10);
        timeZoneOffset[key + '.time.zone.offset'] = parseInt(stationElement.getAttribute('timeZoneOffset'), 10);
        longitude[key + '.longitude'] = this.dsn.data[key + '.station.longitude'];
        latitude[key + '.latitude'] = this.dsn.data[key + '.station.latitude'];

        station[key + '.name'] = Object.assign({}, name, utcTime);
        station[key + '.friendly.name'] = Object.assign({}, friendlyName, utcTime);
        station[key + '.utc.time'] = Object.assign({}, utcTime);
        station[key + '.time.zone.offset'] = Object.assign({}, timeZoneOffset, utcTime);
        station[key + '.longitude'] = Object.assign({}, longitude, utcTime);
        station[key + '.latitude'] = Object.assign({}, latitude, utcTime);
        station[key + '.station'] = Object.assign({}, station);

        return station;
    }

    /**
     * Parses a dish tag contained in the Deep Space Network's XML.
     *
     * @private
     * @param {Element} dishElement - The dish to parse.
     * @returns {object} An object containing data about the dish's antenna, down signals,
     * up signals and targets.
     */
    parseDishTag(dishElement) {
        const azimuthAngle = {};
        let child;
        const created = {};
        const dish = {};
        const elevationAngle = {};
        const friendlyName = {};
        const isArray = {};
        const isDdor = {};
        const isMspa = {};
        const key = dishElement.getAttribute('name').toLowerCase();
        const name = {};
        let signal = {};
        let spacecraftName = '';
        const stationKey = getStationNameByDish(key);
        let target = {};
        let targetName = '';
        const type = {};
        const updated = {};
        const utcTime = this.dsn.data[stationKey + '.utc.time'];
        const windSpeed = {};

        name[key + '.name'] = dishElement.getAttribute('name');
        friendlyName[key + '.friendly.name'] = this.dsn.data[key + '.dish.friendly.name'];
        type[key + '.type'] = this.dsn.data[key + '.dish.type'];
        azimuthAngle[key + '.azimuth.angle'] = parseTelemetryAsFloatOrString(dishElement, 'azimuthAngle');
        elevationAngle[key + '.elevation.angle'] = parseTelemetryAsFloatOrString(dishElement, 'elevationAngle');
        windSpeed[key + '.wind.speed'] = parseTelemetryAsFloatOrString(dishElement, 'windSpeed');
        isMspa[key + '.mspa'] = dishElement.getAttribute('isMSPA') === 'true';
        isArray[key + '.array'] = dishElement.getAttribute('isArray') === 'true';
        isDdor[key + '.ddor'] = dishElement.getAttribute('isDDOR') === 'true';
        created[key + '.created'] = dishElement.getAttribute('created');
        updated[key + '.updated'] = dishElement.getAttribute('updated');

        dish[key + '.name'] = Object.assign({}, name, utcTime);
        dish[key + '.friendly.name'] = Object.assign({}, friendlyName, utcTime);
        dish[key + '.type'] = Object.assign({}, type, utcTime);
        dish[key + '.azimuth.angle'] = Object.assign({}, azimuthAngle, utcTime);
        dish[key + '.elevation.angle'] = Object.assign({}, elevationAngle, utcTime);
        dish[key + '.wind.speed'] = Object.assign({}, windSpeed, utcTime);
        dish[key + '.mspa'] = Object.assign({}, isMspa, utcTime);
        dish[key + '.array'] = Object.assign({}, isArray, utcTime);
        dish[key + '.ddor'] = Object.assign({}, isDdor, utcTime);
        dish[key + '.created'] = Object.assign({}, created, utcTime);
        dish[key + '.updated'] = Object.assign({}, updated, utcTime);
        dish[key + '.antenna'] = Object.assign({}, dish, utcTime);
        dish[key + '.signals'] = [];
        dish[key + '.targets'] = [];

        for (let i = 0; i < dishElement.children.length; i++) {
            child = dishElement.children[i];

            switch (child.tagName) {
                case 'downSignal':
                case 'upSignal':
                    spacecraftName = child.getAttribute('spacecraft').toLowerCase();

                    signal = {};
                    signal[key + '.signal.direction'] = child.tagName.substring(0, child.tagName.length - 6);
                    signal[key + '.signal.type'] = child.getAttribute('signalType');
                    signal[key + '.signal.type.debug'] = child.getAttribute('signalTypeDebug');
                    signal[key + '.signal.data.rate'] = parseTelemetryAsFloatOrString(child, 'dataRate');
                    signal[key + '.signal.frequency'] = parseTelemetryAsFloatOrString(child, 'frequency');
                    signal[key + '.signal.power'] = parseTelemetryAsFloatOrString(child, 'power');
                    signal[key + '.signal.spacecraft'] = child.getAttribute('spacecraft');
                    signal[key + '.signal.spacecraft.id'] = parseTelemetryAsIntegerOrString(child, 'spacecraftId');
                    signal[key + '.signal.spacecraft.friendly.name'] = this.dsn.data[spacecraftName + '.friendly.name'];
                    signal = Object.assign(signal, utcTime);
                    dish[key + '.signals'].push(signal);
                    break;
                case 'target':
                    targetName = child.getAttribute('name').toLowerCase();

                    target = {};
                    target[key + '.target.name'] = child.getAttribute('name');
                    target[key + '.target.id'] = parseTelemetryAsIntegerOrString(child, 'id');
                    target[key + '.target.upleg.range'] = parseTelemetryAsFloatOrString(child, 'uplegRange');
                    target[key + '.target.downleg.range'] = parseTelemetryAsFloatOrString(child, 'downlegRange');
                    target[key + '.target.rtlt'] = parseTelemetryAsFloatOrString(child, 'rtlt');
                    target[key + '.target.friendly.name'] = targetName ? this.dsn.data[targetName + '.friendly.name'] : '';
                    target = Object.assign(target, utcTime);
                    dish[key + '.targets'].push(target);
                    break;
            }
        }

        return dish;
    }

    /**
     * Parses the timestamp tag contained in the Deep Space Network's XML.
     *
     * @private
     * @param {Element} timestampElement - The timestamp to parse.
     * @returns {integer} The time in milliseconds since the UNIX epoch.
     */
    parseTimestampTag(timestampElement) {
        return parseInt(timestampElement.textContent, 10);
    }

    /**
     * Parses the station, dish and timestamp tags contained in the Deep Space Network's XML.
     *
     * @private
     * @param {Document} xmlDocument - The XML document representing the Deep Space Network's data.
     */
    parseDsnData(xmlDocument) {
        const dsnElements = xmlDocument.documentElement.children;
        let element;

        for (let i = 0; i < dsnElements.length; i++) {
            element = dsnElements[i];

            switch (element.tagName) {
                case 'station':
                    Object.assign(this.dsn.data, this.parseStationTag(element));
                    break;
                case 'dish':
                    Object.assign(this.dsn.data, this.parseDishTag(element));
                    break;
                case 'timestamp':
                    this.dsn.data.timestamp = this.parseTimestampTag(element);
            }
        }
    }

    /**
     * @typedef DsnData
     * @type {object}
     * @property {object} config - An object containing properties that match the values of domain
     * object identifier keys and their corresponding telemetry values.
     * @property {object} data - An object containing properties that match the values of domain
     * object identifier keys and their corresponding telemetry values.
     * @property {integer} timestamp - The time in milliseconds since the UNIX epoch.
     */

    /**
     * Parses the Deep Space Network's configuration or data.
     *
     * @param {Document} xmlDocument - The XML document representing the Deep Space Network's
     * configuration or data.
     * @returns {DsnData} The parsed XML as an object with configuration data and properties that
     * match the values of domain object identifier keys.
     */
    parseXml(xmlDocument) {
        if (xmlDocument.documentElement.tagName === 'config') {
            this.parseDsnConfig(xmlDocument);
        } else {
            this.parseDsnData(xmlDocument);
        }

        return this.dsn;
    }
}

export default DsnParser;
