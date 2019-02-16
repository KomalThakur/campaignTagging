import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { DataStorageService } from "./data-storage.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: DataStorageService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
