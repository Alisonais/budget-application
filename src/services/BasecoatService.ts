import { httpClient } from "./httpClient";

export class BasecoatService {

  static async getBasecoats() {
    const res = await httpClient.get('/basecoats');
    return res;
  }
}

export namespace BasecoatService {}
