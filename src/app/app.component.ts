import {Component, OnInit} from '@angular/core';
import { MessagesService } from './services/messages.service';
import { UserStoreService } from './services/user-store.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessagesService] // declaramos el provider de este servicio para que sea accesible por todo el arbol de componentes
})
export class AppComponent implements  OnInit {

    constructor(public userStore: UserStoreService) {

    }

    ngOnInit() {


    }

  logout() {
    this.userStore.logOut();
  }

}
