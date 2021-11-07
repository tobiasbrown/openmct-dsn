import { serializeIdentifier } from './dsn-utils.js';
import dictionary from '../res/dsn-dictionary.json';

export const objectProvider = {
    get: function (identifier) {
        return Promise.resolve(
            dictionary.domainObjects[serializeIdentifier(identifier)]
        );
    }
};
