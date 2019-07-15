export interface IPratice {
  id?: number;
  name?: string;
}

export class Pratice implements IPratice {
  constructor(public id?: number, public name?: string) {}
}
