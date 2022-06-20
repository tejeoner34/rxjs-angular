import { Injectable } from "@angular/core";
import { of, BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

// el Injectable lo dejamos sin provideIn. De esta manera en vez de tener la misma instancia para toda la app
// tendremos que insertarlo como provider dentro del componente donde queramos usarlo.
// así creamos diferentes instancias
@Injectable() 
export class MessagesService {
  private errosSubject$ = new BehaviorSubject([]);

  errors$ = this.errosSubject$
    .asObservable()
    .pipe(filter((err) => err && err.length > 0));

  constructor() {}

  showMessages(...errs: string[]) {
    this.errosSubject$.next([...errs]);
  }
}
