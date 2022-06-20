import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // creamos un observable usando el behaviourSubject
  // solo será accesible desde el componente para que no pueda se puedan modificar sus propiedades desde otros componentes
  private loadingSubject = new BehaviorSubject(false);
  // creamos una propiedad publica para pasarla al html del loader. 
  loading$ = this.loadingSubject.asObservable(); // el asObservable hace que solo se puedan ver los datos que emite

  constructor() { }

  // con esta función hacemos que la primera vez se ejecute el loadingOn y después cambiamos al observable que se le pasa
  // por parametro y cuando este finalice, se ejecuta el loadingOff
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe( // inicuiamos con un observable de null simplemente para ejecutar el loadnigOn
      tap( () => this.loadingOn()),
      concatMap(() => obs$), // nos permite hacer switch a otro observable
      finalize(() => this.loadingOff())
    )
  }

  loadingOn() {
    this.loadingSubject.next(true);
  };

  loadingOff() {
    this.loadingSubject.next(false);
  };
}
