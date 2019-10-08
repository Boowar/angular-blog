import { Post, FbCreateResponse } from "./interfaces"
import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment.prod"
import { map } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDBUrl}/posts.json`, post).pipe(
      map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        }
      })
    )
  }
}