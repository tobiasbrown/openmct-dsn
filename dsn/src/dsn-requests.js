import { DSN_CONFIG_SOURCE } from "./constants.js";

export function checkFetchStatus(response) {
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
