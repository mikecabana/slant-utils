export class ToLocalIso {

    /**
     * Converts the current date into ISO string format with the option of including the timezone offset.
     *
     * @static
     * @param {Date} date
     * @param {{ includeOffset: boolean }} [options={ includeOffset: false }]
     * @returns {string}
     * @memberof ToLocalIso
     */
    public static convert(date: Date, options: { includeOffset: boolean } = { includeOffset: false }): string {
        let localIsoDate = `${ToLocalIso.pad(date.getFullYear())}-${ToLocalIso.pad(date.getMonth() + 1)}-${ToLocalIso.pad(date.getDate())}T${ToLocalIso.pad(date.getHours())}:${ToLocalIso.pad(date.getMinutes())}:${ToLocalIso.pad(date.getSeconds())}.${ToLocalIso.padMillis(date.getMilliseconds())}`;
        if (options.includeOffset) {
            localIsoDate += ToLocalIso.getOffset(date);
        }
        return localIsoDate;
    }

    private static getOffset(date: Date): string {
        const sign = ToLocalIso.startsWithMinus(date.getTimezoneOffset()) ? '+' : '-';
        const hours = parseInt((date.getTimezoneOffset() / 60).toFixed(0), 10);
        const mins = (date.getTimezoneOffset() % 60);
        return `${sign}${ToLocalIso.pad(hours)}:${ToLocalIso.pad(mins)}`;
    }

    private static startsWithMinus(num: number): boolean {
        return Math.sign(num).toString().startsWith('-');
    }

    private static pad(num: number): string {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    }

    private static padMillis(num: number): string {
        const norm = Math.floor(Math.abs(num));
        let val = norm.toString();

        if (norm < 100 && norm > 9) {
            val = ('0') + norm;
        }

        if (norm < 10) {
            val = ('00') + norm;
        }
        return val;
    }
}