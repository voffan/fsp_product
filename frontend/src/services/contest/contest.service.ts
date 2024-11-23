import { instance } from "../../api/api.interceptor"
import { IContest, IGetAllContests } from "../../interfaces/contest"

export const ContestService = {
  async getAll(searchParams?: string): Promise<IGetAllContests> {
    const response = await instance({
      url: `/contestapi/contests/filter?${searchParams}`,
      method: "GET",
    })

    return response.data
  },

  async getById(id: string | number): Promise<IContest> {
    const response = await instance({
      url: `/contestapi/contests/${id}`,
      method: "GET",
    })

    return response.data
  },
}
