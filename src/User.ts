import axios, { AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Model } from "./Model";
import { ApiSync } from "./ApiSync";
import { Collection } from "./Collection";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
const rootUrl = "http://localhost:3000";
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(new Attributes<UserProps>(attrs), new ApiSync<UserProps>(rootUrl), new Eventing());
  }
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection("http://localhost:3000/users", (json: UserProps) => User.buildUser(json));
  }
  isAdminUser(): boolean {
    return this.get("id") == 1;
  }

  //we can use diff Sync module too
  //   static buildLocalUser(attrs: UserProps): User {
  //     return new User(new Attributes<UserProps>(attrs), new LocalSync<UserProps>(rootUrl), new Eventing());
  //   }
}
