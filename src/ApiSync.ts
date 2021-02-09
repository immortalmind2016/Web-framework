import axios, { AxiosPromise, AxiosResponse } from "axios";
// there are three options to solve this.set , this.get from diff class
// #1 save(receive data here), fetch(receive id number) (arguments)
// #2 Serialize and Deserialize  save(serialize), fetch(deserialize) (arguments)
/*
#3 Generic class to customize data coming into save 

*/
interface HasId {
  id?: number;
}
//http://localhost:3000/users
export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {
    this.rootUrl = rootUrl;
  }
  async fetch(id: number): Promise<AxiosPromise<T>> {
    return axios.get(`${this.rootUrl}/${id}`);
  }
  async save(data: T): Promise<AxiosPromise<T>> {
    try {
      const { id } = data;
      if (id) return await axios.post(`${this.rootUrl}/users`, data);
      else return await axios.put(`${this.rootUrl}/users/${id}`, data);
    } catch (e) {
      console.log("ERROR Saving");
    }
  }
}
