
/**
 * Converts a domain object's identifier to an object.
 *
 * @param {string} identifier - The identifier to convert.  The namespace and key
 * need to be separated by a colon (eg. 'my.namespace:my.key').
 * @returns {Object} identifier
 */
export function deserializeIdentifier(identifier) {
    const tokens = identifier.split(':');

    return {
        namespace: tokens[0],
        key: tokens[1]
    };
}

/**
 * Returns the name of a station given the name of a dish.
 *
 * @param {string} dish - The name of a dish (eg. 'dss14').
 * @returns {string} The station name (eg. 'gdscc').
 */
export function getStationNameByDish(dish) {
    switch (dish.toLowerCase()) {
        case 'dss14':
        case 'dss24':
        case 'dss25':
        case 'dss26':
            return 'gdscc';
        case 'dss34':
        case 'dss35':
        case 'dss36':
        case 'dss43':
            return 'cdscc';
        case 'dss54':
        case 'dss55':
        case 'dss56':
        case 'dss63':
        case 'dss65':
            return 'mdscc';
        default:
            console.warn('Unknown dish: ', dish);
    }
}

/**
 * Parses an element's attribute as a float.  If it's not a number, it will return
 * the attribute value as is.
 *
 * @param {Element} element - The element to parse.
 * @param {string} attribute - The name of the attribute to parse.
 * @returns {(number|string)} The parsed attribute as a floating point number or a string.
 */
export function parseTelemetryAsFloatOrString(element, attribute) {
    return isNaN(parseFloat(element.getAttribute(attribute))) ? element.getAttribute(attribute) : parseFloat(element.getAttribute(attribute));
}

/**
 * Parses an element's attribute as an integer.  If it's not a number, it will return
 * the attribute value as is.
 *
 * @param {Element} element - The element to parse.
 * @param {string} attribute - The name of the attribute to parse.
 * @returns {(number|string)} The parsed attribute as an integer or a string.
 */
export function parseTelemetryAsIntegerOrString(element, attribute) {
    return isNaN(parseInt(element.getAttribute(attribute), 10)) ? element.getAttribute(attribute) : parseInt(element.getAttribute(attribute), 10);
}

/**
 * Converts a domain object's identifier to a string, separating the namespace and
 * key with a colon.
 *
 * @param {Object} identifier - The identifier to convert.
 * @returns {string} The identifier as a string (eg. 'my.namespace:my.key').
 */
export function serializeIdentifier(identifier) {
    return identifier.namespace + ':' + identifier.key;
}

export default {
    deserializeIdentifier: deserializeIdentifier,
    getStationNameByDish: getStationNameByDish,
    parseTelemetryAsFloatOrString: parseTelemetryAsFloatOrString,
    parseTelemetryAsIntegerOrString: parseTelemetryAsIntegerOrString,
    serializeIdentifier: serializeIdentifier
};
