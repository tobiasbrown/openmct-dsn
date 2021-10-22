import DsnParser from './DsnParser.js';
import { DSN_CONFIG_SOURCE, DSN_TELEMETRY_SOURCE } from './constants.js';

function checkFetchStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function parseResponse(responseText, config) {
    const domParser = new DOMParser();
    const parser = new DsnParser(config);
    const xml = domParser.parseFromString(responseText, 'application/xml');

    return parser.parseXml(xml);
}

export function getDsnConfiguration() {
    const url = '/proxyUrl?url=' + encodeURIComponent(DSN_CONFIG_SOURCE);

    return fetch(url)
        .then(checkFetchStatus)
        .then(response => response.text())
        .then(parseResponse)
        .catch(error => console.error('Error fetching DSN config: ', error));
}

export function getDsnData(config) {
    // Add the same query string parameter the DSN site sends with each request
    const url = '/proxyUrl?url=' + encodeURIComponent(DSN_TELEMETRY_SOURCE + '?r=' + Math.floor(new Date().getTime() / 5000));

    return fetch(url)
        .then(checkFetchStatus)
        .then(response => response.text())
        .then(responseText => parseResponse(responseText, config))
        .catch(error => console.error('Error fetching DSN data: ', error));
}
