import { serializeIdentifier } from './dsn-utils.js';
import dictionary from '../res/dsn-dictionary.json';

export const objectProvider = {
    get: function (identifier) {
        if (identifier.key === 'dsn') {
            return Promise.resolve({
                identifier: {
                    namespace: 'deep.space.network',
                    key: 'dsn'
                },
                type: 'folder',
                location: 'ROOT',
                name: 'Deep Space Network',
                composition: []
            });
        } else {
            return Promise.resolve(
                dictionary.domainObjects[serializeIdentifier(identifier)]
            );
        }
    }
};
