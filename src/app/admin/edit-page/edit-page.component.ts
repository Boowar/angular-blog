import { ActivatedRoute, Params } from "@angular/router"
import { Component, OnInit, OnDestroy } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms"

import { AlertService } from "./../shared/services/alert.service"
import { PostsService } from "./../../shared/posts.service"
import { Post } from "../../shared/interfaces"
import { Subscription } from "rxjs"
import { switchMap } from "rxjs/operators"

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  post: Post
  submitted: boolean = false

  uSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params["id"])
        })
      )
      .subscribe((post: Post) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        })
      })
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postsService
      .update({
        ...this.post,
        id: this.post.id,
        text: this.form.value.text,
        title: this.form.value.title,
      })
      .subscribe(() => {
        this.submitted = false
        this.alert.success("Пост был обновлен")
      })
  }
}
