import { DSN_CONFIG_SOURCE, DSN_TELEMETRY_SOURCE } from "./constants.js";

function checkFetchStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

export function getDsnConfiguration() {
    const url = '/proxyUrl?url=' + encodeURIComponent(DSN_CONFIG_SOURCE);

    return fetch(url)
        .then(checkFetchStatus)
        .then(response => response.text())
        .catch(error => console.error('Error fetching DSN config: ', error));
}

export function getDsnData() {
    // Add the same query string parameter the DSN site sends with each request
    const url = '/proxyUrl?url=' + encodeURIComponent(DSN_TELEMETRY_SOURCE + '?r=' + Math.floor(new Date().getTime() / 5000));

    return fetch(url)
        .then(checkFetchStatus)
        .then(response => response.text())
        .catch(error => console.error('Error fetching DSN data: ', error));
}
