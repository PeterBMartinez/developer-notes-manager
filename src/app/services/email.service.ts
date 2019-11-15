import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";

@Injectable({
  providedIn: "root"
})
export class EmailService {
  constructor(private rest: RestService) {}

  sendEmail(emailObj) {
    const request = this.rest.postRequest("/email/send", emailObj);
    return request;
  }
}
