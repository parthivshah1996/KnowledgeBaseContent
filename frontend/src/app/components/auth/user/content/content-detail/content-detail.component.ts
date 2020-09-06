import { Subscription } from "rxjs";
import { NotificationService } from "./../../../../../core/services/notification.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ContentService } from '../../../../../core/services/content.service';
import { Content } from '../../../../../core/models/content.model';

@Component({
  selector: "app-content-detail",
  templateUrl: "./content-detail.component.html",
  styleUrls: ["./content-detail.component.css"],
})
export class ContentDetailComponent implements OnInit {
  contentId: string;
  content: Content;
  subscriptions = new Subscription();
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private contentService: ContentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.setTitle("Content Detail");
    this.route.params.subscribe((params: Params) => {
      this.contentId = params["id"];
    });
    this.subscriptions.add(
      this.contentService.getContentById(this.contentId).subscribe(
        (res: any) => {
          this.content = res.data;
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[ContentDetail Error]", err);
        }
      )
    );
  }
}
