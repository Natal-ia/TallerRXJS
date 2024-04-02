import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { catchError, forkJoin, merge, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnChanges {
  @Input() user!: { id: number };
  @Input() post!: Post;

  ROOT_URL = 'https://dummyjson.com';
  publicaciones: Post[] = [];
  comentarios: { [postId: number]: Comment[] } = {}; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.user) {
      //this.getPostsByUser();
      this.getPostsByUser();
      
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && !changes['user'].firstChange) {
      this.getPostsByUser();
    }
  }

  getPostsByUser() {
    this.http
      .get<any>(this.ROOT_URL + '/posts/user/' + this.user.id)
      .subscribe((response: any) => {
        if (response && response.posts) {
          this.publicaciones = response.posts;
          this.publicaciones.forEach(post => {
            this.getCommentsByPost(post.id); // Obtener comentarios para cada post
          });
        } else {
          this.publicaciones = [];
        }
      });
  }

 
  getCommentsByPost(id: number) {
    this.http
      .get<any>(this.ROOT_URL + '/comments/post/' + id)
      .subscribe((commentInfo: any) => {
        if (commentInfo && commentInfo.comments) {
          this.comentarios[id] = commentInfo.comments.map((comment: any) => {
            return {
              id: comment.id,
              body: comment.body,
              postId: comment.postId,
              username: comment.user.username // Obtener el username del comentario
            };
          });
        } else {
          this.comentarios[id] = []; // Manejar el caso en que no haya comentarios
        }
      });
  }

}
