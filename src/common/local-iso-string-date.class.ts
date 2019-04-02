export class LocalIsoStringDate {

    /**
     * Converts the current date into ISO string format with the option of including the timezone offset.
     *
     * @static
     * @param {Date} date
     * @param {{ includeOffset: boolean }} [options={ includeOffset: false }]
     * @returns {string}
     * @memberof LocalIsoStringDate
     */
    public static convert(date: Date, options: { includeOffset: boolean } = { includeOffset: false }): string {
        let localIsoDate = `${LocalIsoStringDate.pad(date.getFullYear())}-${LocalIsoStringDate.pad(date.getMonth() + 1)}-${LocalIsoStringDate.pad(date.getDate())}T${LocalIsoStringDate.pad(date.getHours())}:${LocalIsoStringDate.pad(date.getMinutes())}:${LocalIsoStringDate.pad(date.getSeconds())}.${LocalIsoStringDate.padMillis(date.getMilliseconds())}`;
        if (options.includeOffset) {
            localIsoDate += LocalIsoStringDate.getOffset(date);
        }
        return localIsoDate;
    }

    private static getOffset(date: Date): string {
        const sign = LocalIsoStringDate.startsWithMinus(date.getTimezoneOffset()) ? '+' : '-';
        const hours = parseInt((date.getTimezoneOffset() / 60).toFixed(0), 10);
        const mins = (date.getTimezoneOffset() % 60);
        return `${sign}${LocalIsoStringDate.pad(hours)}:${LocalIsoStringDate.pad(mins)}`;
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