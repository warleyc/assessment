import { IPratice } from 'app/shared/model/pratice.model';

export interface ICategory {
  id?: number;
  name?: string;
  category?: IPratice;
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public category?: IPratice) {}
}
