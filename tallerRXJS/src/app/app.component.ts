import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/User';
import { mergeMap } from 'rxjs';
import { Post } from './models/Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  buttonClicked: boolean = false;
  ROOT_URL = 'https://dummyjson.com';
  title = 'tallerRXJS';
  txtUser: string = '';
  usuario: User | null = null;

  constructor(private http: HttpClient) {}

  searchUser() {

    this.buttonClicked = true;

    const url = `${this.ROOT_URL}/users/filter?key=username&value=${this.txtUser}`;
    this.http.get<any>(url).subscribe((response: any) => {
      if (response.users && response.users.length > 0) {
        this.usuario = response.users[0];
      } else {
        this.usuario = null;
      }
    });
  }
}
