import axios, { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}
interface Sync<T> {
  fetch(id: number): Promise<AxiosPromise<T>>;
  save(data: T): Promise<AxiosPromise<T>>;
}
interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}
interface HasId {
  id?: number;
}
export class Model<T extends HasId> {
  constructor(private attributes: ModelAttributes<T>, private sync: Sync<T>, private events: Events) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;
  set(update: T) {
    this.attributes.set(update);
    this.events.trigger("change");
  }
  async fetch() {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }
    let response: AxiosResponse = await this.sync.fetch(id);
    this.set(response.data);
  }
  async save() {
    let data: T = this.attributes.getAll();
    try {
      await this.sync.save(data);
      this.trigger("save");
    } catch (e) {
      this.trigger("error");
    }
  }
}
