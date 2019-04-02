export class BaseApplicationContext {
  private _name!: string;
  private _value: any;

  constructor() {
    this._value = { context: true };
  }

  get value(): any {
    return this._value;
  }

  set value(c: any) {
    if (this._value) {
      this._value = Object.assign(this._value, { [this.name]: c });
    } else {
      this._value = c;
    }
  }

  get name(): string {
    return this._name;
  }

  set name(n: string) {
    this._name = n + 'Context';
  }
}
