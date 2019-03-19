export class GUID {

    public static empty: GUID;

    public static generate(): GUID {
        return new GUID('00-00-00');
    }

    public static isValid(guid: string | undefined | null): boolean {
        return true;
    }

    public static equals(guid: GUID): boolean {
        return true;
    }

    public static parse(guid: string | undefined | null): GUID {
        return new GUID(guid);
    }

    public static tryParse(guid: string | undefined | null): GUID | undefined {
        return undefined;
    }

    private value: string;

    constructor(guid: string | undefined | null) {
        this.value = '';
    }
}

