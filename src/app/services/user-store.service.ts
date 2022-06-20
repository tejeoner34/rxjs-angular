import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Observable, BehaviorSubject } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  userSubject$ = new BehaviorSubject(null);

  user$: Observable<User> = this.userSubject$.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user), tap(res => console.log(res)));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
  }

  logIn(email: string, password: string) {
    return this.http.post<User>("/api/login", { email, password }).pipe(
      tap((res) => this.userSubject$.next(res)),
      shareReplay()
    );
  }

  logOut() {
    this.userSubject$.next(null);
  }
}
