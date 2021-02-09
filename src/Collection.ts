import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {
    this.rootUrl = rootUrl;
    this.deserialize = deserialize;
  }
  // We do it function here because we need to init eventing first (in js runtime)
  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }
  fetch(): T[] {
    axios.get(`${this.rootUrl}`).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger("change");
    });
    return [];
  }
}
