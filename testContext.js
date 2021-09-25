const testContext = require.context('.', true, /\/dsn\/src\/.*Spec.js$/);
testContext.keys().forEach(testContext);
