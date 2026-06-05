import { Basecoat, objBasecoat } from "@/pages/Basecoats/typesOfBasecoats";
import { httpClient } from "./httpClient";

export class BasecoatService {

  static async getBasecoats() {
    const res = await httpClient.get('/basecoats');
    return res;
  }

  static async createBasecoat(data: objBasecoat) {
    const res = await httpClient.post('/basecoat/create', data);

    return res;
  }

  static async updateBasecoat(basecoatId: string, data: Basecoat) {
    console.log(data);
    const res = await httpClient.post(`/basecoat/update/${basecoatId}`, data);


    return res;
  }

  static async deleteBasecoat(basecoatId: string) {
    const res = await httpClient.delete(`/basecoat/${basecoatId}`);

    return res;
  };
}

export namespace BasecoatService {}
