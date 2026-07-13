import { Basecoat, objBasecoat } from "@/pages/Basecoats/typesOfBasecoats";
import { httpClient } from "./httpClient";

export class BasecoatService {

  static async getBasecoats() {
    const { data } = await httpClient.get('/basecoats');
    return data;
  }

  static async createBasecoat(dataBasecoat: objBasecoat) {
    const { data } = await httpClient.post('/basecoat/create', dataBasecoat);

    return data;
  }

  static async updateBasecoat(basecoatId: string, dataBasecoat: Basecoat) {
    const { data } = await httpClient.post(`/basecoat/update/${basecoatId}`, dataBasecoat);


    return data;
  }

  static async deleteBasecoat(basecoatId: string) {
    const { data } = await httpClient.delete(`/basecoat/${basecoatId}`);

    return data;
  };

  static async searchBy(colorGroup: string, colorName: string) {
    const { data } = await httpClient.get('/basecoat/listcolor', {
      params: {
        colorGroup,
        colorName,
      }
    });

    return data;
  }
}

export namespace BasecoatService { }
