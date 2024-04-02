import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnChanges {


  
  @Input() user!: { id: number }; // Define the type of 'user'
 
  @Input() post!: Post; // Define la propiedad 'post' y su tipo de dato


  ROOT_URL = 'https://dummyjson.com';
  publicaciones: Post[] = [];
 // @Input() post!:{ id: number };  // Asegúrate de que el tipo de dato coincida con lo que esperas recibir

  constructor(private http: HttpClient) {}

  
  ngOnInit() {
    if (this.user) {
      this.getPostsByUser();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && !changes['user'].firstChange) {
      this.getPostsByUser();
    }
  }

  getPostsByUser() {
    this.http.get<any>(this.ROOT_URL + '/posts/user/' + this.user.id).subscribe((response: any) => {
      if (response && response.posts) {
        this.publicaciones = response.posts;
      } else {
        this.publicaciones = [];
      }
    });
  }
}
