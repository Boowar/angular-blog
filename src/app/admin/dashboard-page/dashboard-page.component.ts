import { PostsService } from "./../../shared/posts.service"
import { Component, OnInit, OnDestroy } from "@angular/core"
import { Post } from "src/app/shared/interfaces"
import { Subscription } from "rxjs"

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = []
  pSub: Subscription
  searchStr: string = ""

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string) {}

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
