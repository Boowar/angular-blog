import { AuthService } from "./../shared/services/auth.service"
import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"],
})
export class DashboardPageComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  test() {
    console.log(this.auth.token)
  }
}
