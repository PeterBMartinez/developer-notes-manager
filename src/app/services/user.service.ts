import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";
import { Subject } from "rxjs";

interface IUser {
  user: {
    email: string;
    token: string;
    role: string;
    _id: string;
  };
}

@Injectable({
  providedIn: "root"
})
export class UserService {
  role = "Viewer";
  getCurrentRoleChange: Subject<string> = new Subject<string>();

  constructor(private rest: RestService) {
    this.getCurrentRoleChange.subscribe(role => {
      this.role = role;
    });
  }

  login(credentials) {
    const request = this.rest.postRequest("/users/login", credentials);
    request.subscribe((userObject: IUser) => {
      window.localStorage.setItem("token", userObject.user.token);
      this.setCurrentRole(userObject.user.role);
    });
    return request;
  }

  setCurrentRole(role) {
    this.getCurrentRoleChange.next(role);
    window.localStorage.setItem("role", role);
  }

  getRole() {
    return this.role;
  }
}
