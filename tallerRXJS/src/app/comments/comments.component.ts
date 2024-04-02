import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnChanges {
 
  @Input() user!: { id: number }; // Define the type of 'user'
  @Input() post!: { id: number }; // Define the type of 'post'
  ROOT_URL = 'https://dummyjson.com';
  publicaciones: Comment[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.user) {
      this.getCommentsByPost();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && !changes['post'].firstChange) {
      this.getCommentsByPost();
    }
  }

  getCommentsByUser() {
    this.http
      .get<any>(this.ROOT_URL + '/comments/user/' + this.user.id)
      .subscribe((response: any) => {
        if (response && response.comments) {
          this.publicaciones = response.comments;
        } else {
          this.publicaciones = [];
        }
      });
  }


  getCommentsByPost() {
    this.http
      .get<any>(this.ROOT_URL + '/comments/post/' + this.post.id)
      .subscribe((response: any) => {
        if (response && response.comments) {
          this.publicaciones = response.comments;
        } else {
          this.publicaciones = [];
        }
      });
  
  }

  getUserById(id: number) {
    this.http
      .get<any>(this.ROOT_URL + '/users/' + id)
      .subscribe((response: any) => {
        if (response && response.user) {
          return response.user;
        } else {
          return null;
        }
      });
  }
}

