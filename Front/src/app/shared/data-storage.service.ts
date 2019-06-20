import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Headers, RequestOptions } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  baseUrl = "http://localhost:3000/";
  formData;
  private token: string;
  constructor(private http: Http) {}

  private saveToken(token: string): void {
    localStorage.setItem("mean-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }

  public getUserDetails() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  createCampaign(data) {
    return this.http
      .post(this.baseUrl + "campaign", data, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken()
        })
      })
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(err.json());
        throw err.json()
      });
  }

  getAllCampaigns() {
    return this.http
      .get(this.baseUrl + "campaign", {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken()
        })
      })
      .toPromise()
      .then(response => {
        let res = response.json();
        return res.data;
      })
      .catch(err => {
        console.log(err.json());
        throw err.json()
      });
  }

  getCampaignsByUser() {
    return this.http
      .get(this.baseUrl + "campaign/user", {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken()
        })
      })
      .toPromise()
      .then(response => {
        let res = response.json();
        return res.data;
      })
      .catch(err => {
        console.log(err.json());
        throw err.json();
      });
  }

  async getFormData() {
    return this.http
      .get(this.baseUrl + "data", {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken()
        })
      })
      .toPromise()
      .then(response => {
        let res = response.json();
        this.formData = res.data[0];
        return res.data[0];
      })
      .catch(err => {
        console.log(err.json());
        throw err.json();
      });
  }

  updateFormData(data) {
    return this.http
      .post(this.baseUrl + "data", data, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken()
        })
      })
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(err.json());
        throw err.json();
      });
  }

  login(data) {
    return this.http
      .post(this.baseUrl + "login", data, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken()
        })
      })
      .toPromise()
      .then(res => {
        this.saveToken(res.json().data.token);
        return res.json();
      })
      .catch(err => {
        console.log(err.json());
        throw err.json();
      });
  }

  getTargetAudience(data) {
    console.log("inside get target audience");
    return this.http
      .post(this.baseUrl + "target",  data, {
        headers: new Headers({
          "Content-Type": "application/json",
        })
      })
      .toPromise()
      .then(res => {
        let jsonResp = res.json();
        return jsonResp.data.value;
      })
      .catch(err => {
        console.log(err.json());
        throw err.json();
      });
  }

  logout() {
    this.token = "";
    window.localStorage.removeItem("mean-token");
  }
}
