export class GUID {
  public static newGuid(): GUID {
    return new GUID(
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // tslint:disable-next-line:no-bitwise
        const r = (Math.random() * 16) | 0;
        // tslint:disable-next-line:no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }),
    );
  }

  public static get empty(): string {
    return '00000000-0000-0000-0000-000000000000';
  }

  public static isValid(str: string): boolean {
    const validRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return validRegex.test(str);
  }

  public get empty(): string {
    return GUID.empty;
  }

  private value: string = this.empty;

  constructor(value?: string) {
    if (value) {
      if (GUID.isValid(value)) {
        this.value = value;
      }
    }
  }

  public toString() {
    return this.value;
  }

  public toJSON(): string {
    return this.value;
  }
}
