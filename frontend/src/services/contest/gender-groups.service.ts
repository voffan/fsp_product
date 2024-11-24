import { instance } from "../../api/api.interceptor"
import {
  IGetAllGenderGroups,
  IGetGenderGroup,
} from "../../interfaces/gender-gorup"

export const GenderGroupsService = {
  async getAll(): Promise<IGetAllGenderGroups> {
    const response = await instance({
      url: `/contestapi/gendergroups`,
      method: "GET",
    })

    return response
  },

  async getById(id: string | number): Promise<IGetGenderGroup> {
    const response = await instance({
      url: `/contestapi/gendergroups/${id}`,
      method: "GET",
    })

    return response
  },
}
