import { deserializeIdentifier, serializeIdentifier } from './DsnUtils.js';
import { DSN_KEY, DSN_NAMESPACE } from './constants.js';
import dictionary from '../res/dsn-dictionary.json';

export const compositionProvider = {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === DSN_NAMESPACE && domainObject.composition !== undefined;
    },
    load: function (domainObject) {
        if (domainObject.identifier.key === DSN_KEY) {
            return Promise.resolve(Object.keys(dictionary.domainObjects).filter(function (key) {
                return dictionary.domainObjects[key].location === DSN_NAMESPACE + ':' + DSN_KEY;
            }).map(function (key) {
                const childId = deserializeIdentifier(key);

                return {
                    namespace: childId.namespace,
                    key: childId.key
                };
            }));
        } else {
            return Promise.resolve(
                dictionary.domainObjects[serializeIdentifier(domainObject.identifier)].composition.map(function (key) {
                    const childId = deserializeIdentifier(key);

                    return {
                        namespace: childId.namespace,
                        key: childId.key
                    };
                })
            );
        }
    }
};
