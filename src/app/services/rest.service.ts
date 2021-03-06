import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RestService {
  constructor(private http: HttpClient) {}

  API_URL = "https://developer-notes-api.herokuapp.com/api";
  TOKEN: string = window.localStorage.getItem("token");

  getHeaderOptions(type): object {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": `${type}`,
        Authorization: `Token ${this.TOKEN || ""}`
      })
    };
    return httpOptions;
  }

  getRequest(params) {
    const request = this.http.get(
      `${this.API_URL}${params}`,
      this.getHeaderOptions("application/json")
    );
    return request;
  }

  putRequest(params, obj) {
    const request = this.http.put(
      `${this.API_URL}${params}`,
      obj,
      this.getHeaderOptions("application/json")
    );
    return request;
  }

  deleteRequest(params) {
    const request = this.http.delete(
      `${this.API_URL}${params}`,
      this.getHeaderOptions("application/json")
    );
    return request;
  }

  postRequest(params, obj) {
    const request = this.http.post(
      `${this.API_URL}${params}`,
      obj,
      this.getHeaderOptions("application/json")
    );
    return request;
  }
}
