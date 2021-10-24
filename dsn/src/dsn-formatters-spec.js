import {
    angleToString,
    windSpeedToString
} from './dsn-formatters.js';

describe('angle-to-string', function () {
    it('formats an angle', function () {
        const angle = angleToString.format(12);
        expect(angle).toEqual('12.00 deg');
    });

    it('formats an angle to two decimal places', function () {
        const angle = angleToString.format(12.3456);
        expect(angle).toEqual('12.35 deg');
    });

    it('formats an angle as a string', function () {
        const angle = angleToString.format('12.3456 degrees');
        expect(angle).toEqual('12.3456 degrees');
    });

    it('parses an angle as a number', function () {
        const angle = angleToString.parse(12.3456);
        expect(angle).toEqual(12.3456);
    });

    it('parses an angle as a string', function () {
        const angle = angleToString.parse('12.3456 degrees');
        expect(angle).toEqual(12.3456);
    });

    it('validates an angle as a number', function () {
        const canParseAngle = angleToString.validate(12.3456);
        expect(canParseAngle).toBeTrue();
    });

    it('validates an angle as a string', function () {
        const canParseAngle = angleToString.validate('12.3456 degrees');
        expect(canParseAngle).toBeTrue();
    });

    it('does not validate a null angle', function () {
        const canParseAngle = angleToString.validate(null);
        expect(canParseAngle).toBeFalse();
    });

    it('does not validate an undefined angle', function () {
        const canParseAngle = angleToString.validate(undefined);
        expect(canParseAngle).toBeFalse();
    });
});

describe('wind-speed-to-string', function () {
    it('formats the wind speed', function () {
        const windSpeed = windSpeedToString.format(12);
        expect(windSpeed).toEqual('12.00 km/hr');
    });

    it('formats the wind speed to two decimal places', function () {
        const windSpeed = windSpeedToString.format(12.3456);
        expect(windSpeed).toEqual('12.35 km/hr');
    });

    it('formats the wind speed as a string', function () {
        const windSpeed = windSpeedToString.format('12.3456 kilometres per hour');
        expect(windSpeed).toEqual('12.3456 kilometres per hour');
    });

    it('parses the wind speed as a number', function () {
        const windSpeed = windSpeedToString.parse(12.3456);
        expect(windSpeed).toEqual(12.3456);
    });

    it('parses the wind speed as a string', function () {
        const windSpeed = windSpeedToString.parse('12.3456 km/hr');
        expect(windSpeed).toEqual(12.3456);
    });

    it('validates the wind speed as a number', function () {
        const canParseWindSpeed = windSpeedToString.validate(12.3456);
        expect(canParseWindSpeed).toBeTrue();
    });

    it('validates the wind speed as a string', function () {
        const canParseWindSpeed = windSpeedToString.validate('12.3456 km/hr');
        expect(canParseWindSpeed).toBeTrue();
    });

    it('does not validate a null wind speed', function () {
        const canParseWindSpeed = windSpeedToString.validate(null);
        expect(canParseWindSpeed).toBeFalse();
    });

    it('does not validate an undefined wind speed', function () {
        const canParseWindSpeed = windSpeedToString.validate(undefined);
        expect(canParseWindSpeed).toBeFalse();
    });
});
