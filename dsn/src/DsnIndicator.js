import { CANBERRA_ANTENNAS, GOLDSTONE_ANTENNAS, MADRID_ANTENNAS } from './dsn-constants.js';

class DsnIndicator {
    constructor(openmct) {
        this.indicator = openmct.indicators.simpleIndicator();
        this.indicator.text('Deep Space Network');
        this.indicator.description('Select telemetry item to fetch data.');
        this.indicator.iconClass('icon-connectivity');
    }

    formatAntennaStatus(station, activeAntennas) {
        let status = `${station}: ${activeAntennas.length}`;

        if (activeAntennas.length > 0) {
            const antennas = activeAntennas.flatMap(s => s.replace(/dss/, 'DSS '));
            status += ` (${antennas.join(', ')})`;
        }

        return status;
    }

    getActiveAntennas(dsn, antennas) {
        return antennas.filter(antenna => {
            const key = antenna + '.signals';

            return Object.prototype.hasOwnProperty.call(dsn.data, key) && dsn.data[key].length > 0;
        });
    }

    setActiveAntennas(dsn) {
        const activeCanberraAntennas = this.getActiveAntennas(dsn, CANBERRA_ANTENNAS);
        const activeGoldstoneAntennas = this.getActiveAntennas(dsn, GOLDSTONE_ANTENNAS);
        const activeMadridAntennas = this.getActiveAntennas(dsn, MADRID_ANTENNAS);

        let status = this.formatAntennaStatus('Canberra', activeCanberraAntennas);
        status += '\n' + this.formatAntennaStatus('Goldstone', activeGoldstoneAntennas);
        status += '\n' + this.formatAntennaStatus('Madrid', activeMadridAntennas);

        this.indicator.statusClass('s-status-ok');
        this.indicator.description(status);
    }

    setError(error) {
        this.indicator.statusClass('s-status-error');
        this.indicator.description(error);
    }
}

export default DsnIndicator;
