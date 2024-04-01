import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{


  ROOT_URL = 'https://dummyjson.com';
  usuario: User | null = null;
  
  @Input() user!: User; // Define the type of 'user'
  constructor(private http: HttpClient) {}

}