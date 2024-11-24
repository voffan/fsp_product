import { instance } from "../../api/api.interceptor"
import { IDistrict } from "../../interfaces/district"

export const DistrictService = {
  async getAll(): Promise<IDistrict[]> {
    const response = await instance({
      url: `/countryapi/districts`,
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<IDistrict> {
    const response = await instance({
      url: `/countryapi/districts/${id}`,
      method: "GET",
    })

    return response.data
  },
}
