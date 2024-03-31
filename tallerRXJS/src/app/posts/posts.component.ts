import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  @Input() user: any; // Change the type as per your User model
  ROOT_URL = 'https://dummyjson.com';
  publicaciones: Post[] = []; // Define the publicaciones array

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.user) {
      this.getPostsByUser();
    }
  }

  getPostsByUser() {
    this.http.get<any>(this.ROOT_URL + '/posts/user/' + this.user.id).subscribe((response: any) => {
      if (response && response.posts) {
        this.publicaciones = response.posts; // Assign the posts array to publicaciones
      } else {
        this.publicaciones = []; // Handle case when there are no posts
      }
    });
  }
  
}
  
