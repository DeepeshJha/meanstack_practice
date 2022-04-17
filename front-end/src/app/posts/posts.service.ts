import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  postUrl = "http://localhost:3000/api/posts/"

  getPosts() {
    this.http.get<{message: string, data: Post[]}>(this.postUrl).subscribe((postData) => {
      console.log("postData",postData)
      this.posts = postData.data;
      this.postsUpdated.next([...this.posts])
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: any = {id: null, title: title, content: content};
    this.http.post<{message: string, postId: any}>(this.postUrl,post).subscribe((resData) => {
      post.id = resData.postId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      // this.getPosts();
    })
  }

  deletePost(id: any) {
    this.http.delete(this.postUrl+`${id}`).subscribe(res => {
      console.log("deletePost Response",res)
      this.posts = this.posts.filter(post => post.id != id);
      this.postsUpdated.next([...this.posts]);
      // this.getPosts()
    });
  }
}
