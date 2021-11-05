const testContext = require.context('.', true, /\/dsn\/src\/.*[sS]pec.js$/);
testContext.keys().forEach(testContext);
