import {
    angleToString,
    dataRateToString,
    frequencyToString,
    lightTimeToString,
    powerToString,
    rangeToString,
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

describe('data-rate-to-string', function () {
    it('formats the data rate of a signal to two decimal places', function () {
        const dataRate = dataRateToString.format(12.3456);
        expect(dataRate).toEqual('12.35 b/sec');
    });

    it('formats the data rate of a signal as a string', function () {
        const dataRate = dataRateToString.format('12.3456 bits per second');
        expect(dataRate).toEqual('12.3456 bits per second');
    });

    it('formats the data rate of a signal as b/sec', function () {
        const dataRate = dataRateToString.format(987.65);
        expect(dataRate).toEqual('987.65 b/sec');
    });

    it('formats the data rate of a signal as kb/sec', function () {
        const dataRate = dataRateToString.format(987654.32);
        expect(dataRate).toEqual('987.65 kb/sec');
    });

    it('formats the data rate of a signal as Mb/sec', function () {
        const dataRate = dataRateToString.format(987654321.01);
        expect(dataRate).toEqual('987.65 Mb/sec');
    });

    it('formats the data rate of a signal as Gb/sec', function () {
        const dataRate = dataRateToString.format(987654321012);
        expect(dataRate).toEqual('987.65 Gb/sec');
    });

    it('formats the data rate of a signal as Tb/sec', function () {
        const dataRate = dataRateToString.format(987654321012345);
        expect(dataRate).toEqual('987.65 Tb/sec');
    });

    it('formats the data rate of a signal as Pb/sec', function () {
        const dataRate = dataRateToString.format(9876543210123456);
        expect(dataRate).toEqual('9.88 Pb/sec');
    });

    it('parses the data rate of a signal as a number', function () {
        const dataRate = dataRateToString.parse(12.3456);
        expect(dataRate).toEqual(12.3456);
    });

    it('parses the data rate of a signal as a string', function () {
        const dataRate = dataRateToString.parse('12.34 b/sec');
        expect(dataRate).toEqual(12.34);
    });

    it('validates the data rate of a signal as a number', function () {
        const canParseDataRate = dataRateToString.validate(12.3456);
        expect(canParseDataRate).toBeTrue();
    });

    it('validates the data rate of a signal as a string', function () {
        const canParseDataRate = dataRateToString.validate('12.34 b/sec');
        expect(canParseDataRate).toBeTrue();
    });

    it('does not validate a null data rate', function () {
        const canParseDataRate = dataRateToString.validate(null);
        expect(canParseDataRate).toBeFalse();
    });

    it('does not validate an undefined data rate', function () {
        const canParseDataRate = dataRateToString.validate(undefined);
        expect(canParseDataRate).toBeFalse();
    });
});

describe('frequency-to-string', function () {
    it('formats the frequency of a signal to two decimal places', function () {
        const frequency = frequencyToString.format(12.3456);
        expect(frequency).toEqual('12.35 Hz');
    });

    it('formats the frequency of a signal as a string', function () {
        const frequency = frequencyToString.format('12.3456 hertz');
        expect(frequency).toEqual('12.3456 hertz');
    });

    it('formats the frequency of a signal as Hz', function () {
        const frequency = frequencyToString.format(987.65);
        expect(frequency).toEqual('987.65 Hz');
    });

    it('formats the frequency of a signal as kHz', function () {
        const frequency = frequencyToString.format(987654.32);
        expect(frequency).toEqual('987.65 kHz');
    });

    it('formats the frequency of a signal as MHz', function () {
        const frequency = frequencyToString.format(987654321.01);
        expect(frequency).toEqual('987.65 MHz');
    });

    it('formats the frequency of a signal as GHz', function () {
        const frequency = frequencyToString.format(987654321012);
        expect(frequency).toEqual('987.65 GHz');
    });

    it('formats the frequency of a signal as THz', function () {
        const frequency = frequencyToString.format(987654321012345);
        expect(frequency).toEqual('987.654321012345 THz');
    });

    it('parses the frequency of a signal as a number', function () {
        const frequency = frequencyToString.parse(12.3456);
        expect(frequency).toEqual(12.3456);
    });

    it('parses the frequency of a signal as a string', function () {
        const frequency = frequencyToString.parse('12.34 Hz');
        expect(frequency).toEqual(12.34);
    });

    it('validates the frequency of a signal as a number', function () {
        const canParseFrequency = frequencyToString.validate(12.3456);
        expect(canParseFrequency).toBeTrue();
    });

    it('validates the frequency of a signal as a string', function () {
        const canParseFrequency = frequencyToString.validate('12.34 Hz');
        expect(canParseFrequency).toBeTrue();
    });

    it('does not validate a null frequency', function () {
        const canParseFrequency = frequencyToString.validate(null);
        expect(canParseFrequency).toBeFalse();
    });

    it('does not validate an undefined frequency', function () {
        const canParseFrequency = frequencyToString.validate(undefined);
        expect(canParseFrequency).toBeFalse();
    });
});

describe('power-to-string', function () {
    it('formats the power of a signal to two decimal places', function () {
        const power = powerToString.format(12.3456);
        expect(power).toEqual('12.35 kW');
    });

    it('formats the power of a signal as a string', function () {
        const power = powerToString.format('12.3456 kilowatts');
        expect(power).toEqual('12.3456 kilowatts');
    });

    it('formats the power of a signal as kW', function () {
        const power = powerToString.format(987.65);
        expect(power).toEqual('987.65 kW');
    });

    it('formats the power of a signal as dBm', function () {
        const power = powerToString.format(-987.65);
        expect(power).toEqual('-987.65 dBm');
    });

    it('parses the power of a signal as a number (kW)', function () {
        const power = powerToString.parse(12.3456);
        expect(power).toEqual(12.3456);
    });

    it('parses the power of a signal as a number (dBm)', function () {
        const power = powerToString.parse(-12.3456);
        expect(power).toEqual(-12.3456);
    });

    it('parses the power of a signal as a string (kW)', function () {
        const power = powerToString.parse('12.34 kW');
        expect(power).toEqual(12.34);
    });

    it('parses the power of a signal as a string (dBm)', function () {
        const power = powerToString.parse('-12.34 dBm');
        expect(power).toEqual(-12.34);
    });

    it('validates the power of a signal as a number (kW)', function () {
        const canParsePower = powerToString.validate(12.3456);
        expect(canParsePower).toBeTrue();
    });

    it('validates the power of a signal as a number (dBm)', function () {
        const canParsePower = powerToString.validate(-12.3456);
        expect(canParsePower).toBeTrue();
    });

    it('validates the power of a signal as a string (kW)', function () {
        const canParsePower = powerToString.validate('12.34 kW');
        expect(canParsePower).toBeTrue();
    });

    it('validates the power of a signal as a string (dBm)', function () {
        const canParsePower = powerToString.validate('-12.34 dBm');
        expect(canParsePower).toBeTrue();
    });

    it('does not validate a null value for the power of a signal', function () {
        const canParsePower = powerToString.validate(null);
        expect(canParsePower).toBeFalse();
    });

    it('does not validate an undefined value for the power of a signal', function () {
        const canParsePower = powerToString.validate(undefined);
        expect(canParsePower).toBeFalse();
    });
});

describe('range-to-string', function () {
    it('formats the range of a spacecraft to two decimal places', function () {
        const range = rangeToString.format(12.3456);
        expect(range).toEqual('12.35 km');
    });

    it('formats the range of a spacecraft as a string', function () {
        const range = rangeToString.format('12.3456 kilometres');
        expect(range).toEqual('12.3456 kilometres');
    });

    it('formats the range of a spacecraft as km', function () {
        const range = rangeToString.format(987.65);
        expect(range).toEqual('987.65 km');
    });

    it('formats the range of a spacecraft as thousand km', function () {
        const range = rangeToString.format(987654.32);
        expect(range).toEqual('987.65 thousand km');
    });

    it('formats the range of a spacecraft as million km', function () {
        const range = rangeToString.format(987654321.01);
        expect(range).toEqual('987.65 million km');
    });

    it('formats the range of a spacecraft as billion km', function () {
        const range = rangeToString.format(987654321012);
        expect(range).toEqual('987.65 billion km');
    });

    it('formats the range of a spacecraft as trillion km', function () {
        const range = rangeToString.format(987654321012345);
        expect(range).toEqual('987.65 trillion km');
    });

    it('formats the range of a spacecraft as quadrillion km', function () {
        const range = rangeToString.format(9876543210123456);
        expect(range).toEqual('9.88 quadrillion km');
    });

    it('parses the range of a spacecraft as a number', function () {
        const range = rangeToString.parse(12.3456);
        expect(range).toEqual(12.3456);
    });

    it('parses the range of a spacecraft as a string', function () {
        const range = rangeToString.parse('12.34 km');
        expect(range).toEqual(12.34);
    });

    it('validates the range of a spacecraft as a number', function () {
        const canParseRange = rangeToString.validate(12.3456);
        expect(canParseRange).toBeTrue();
    });

    it('validates the range of a spacecraft as a string', function () {
        const canParseRange = rangeToString.validate('12.34 km');
        expect(canParseRange).toBeTrue();
    });

    it('does not validate a null range of a spacecraft', function () {
        const canParseRange = rangeToString.validate(null);
        expect(canParseRange).toBeFalse();
    });

    it('does not validate an undefined range of a spacecraft', function () {
        const canParseRange = rangeToString.validate(undefined);
        expect(canParseRange).toBeFalse();
    });
});

describe('light-time-to-string', function () {
    it('formats the round-trip light time for a spacecraft to two decimal places', function () {
        const lightTime = lightTimeToString.format(12.3456);
        expect(lightTime).toEqual('12.35 sec');
    });

    it('formats the round-trip light time for a spacecraft as a string', function () {
        const lightTime = lightTimeToString.format('12.3456 seconds');
        expect(lightTime).toEqual('12.3456 seconds');
    });

    it('formats the round-trip light time for a spacecraft as sec', function () {
        const lightTime = lightTimeToString.format(12.34);
        expect(lightTime).toEqual('12.34 sec');
    });

    it('formats the round-trip light time for a spacecraft as minutes', function () {
        const lightTime = lightTimeToString.format(123.45);
        expect(lightTime).toEqual('2.06 minutes');
    });

    it('formats the round-trip light time for a spacecraft as hours', function () {
        const lightTime = lightTimeToString.format(12345.67);
        expect(lightTime).toEqual('3.43 hours');
    });

    it('formats the round-trip light time for a spacecraft as days', function () {
        const lightTime = lightTimeToString.format(123456.78);
        expect(lightTime).toEqual('1.43 days');
    });

    it('formats the round-trip light time for a spacecraft as weeks', function () {
        const lightTime = lightTimeToString.format(123456789);
        expect(lightTime).toEqual('204.13 weeks');
    });

    it('parses the round-trip light time for a spacecraft as a number', function () {
        const lightTime = lightTimeToString.parse(12.3456);
        expect(lightTime).toEqual(12.3456);
    });

    it('parses the round-trip light time for a spacecraft as a string', function () {
        const lightTime = lightTimeToString.parse('12.34 sec');
        expect(lightTime).toEqual(12.34);
    });

    it('validates the round-trip light time for a spacecraft as a number', function () {
        const canParseLightTime = lightTimeToString.validate(12.3456);
        expect(canParseLightTime).toBeTrue();
    });

    it('validates the round-trip light time for a spacecraft as a string', function () {
        const canParseLightTime = lightTimeToString.validate('12.34 sec');
        expect(canParseLightTime).toBeTrue();
    });

    it('does not validate a null round-trip light time for a spacecraft', function () {
        const canParseLightTime = lightTimeToString.validate(null);
        expect(canParseLightTime).toBeFalse();
    });

    it('does not validate an undefined round-trip light time for a spacecraft', function () {
        const canParseLightTime = lightTimeToString.validate(undefined);
        expect(canParseLightTime).toBeFalse();
    });
});
