import { Params } from "@angular/router"
import { switchMap } from "rxjs/operators"
import { Post } from "./../shared/interfaces"
import { PostsService } from "./../shared/posts.service"
import { ActivatedRoute } from "@angular/router"
import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"

@Component({
  selector: "app-post-page",
  templateUrl: "./post-page.component.html",
  styleUrls: ["./post-page.component.scss"],
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params["id"])
      })
    )
  }
}
