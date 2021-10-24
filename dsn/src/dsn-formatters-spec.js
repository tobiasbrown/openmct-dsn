import {
    angleToString
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
