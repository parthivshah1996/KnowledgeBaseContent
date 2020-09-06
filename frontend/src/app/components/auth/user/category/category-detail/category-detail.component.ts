import { Subscription } from "rxjs";
import { NotificationService } from "./../../../../../core/services/notification.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Categories } from '../../../../../core/models/Categories.model';
import { CategoryService } from '../../../../../core/services/category.service';
const FileSaver = require('file-saver');
@Component({
  selector: "app-category-detail",
  templateUrl: "./category-detail.component.html",
  styleUrls: ["./category-detail.component.css"],
})
export class CategoryDetailComponent implements OnInit {
  categoryId: string;
  category: Categories;
  subscriptions = new Subscription();
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.setTitle("Category Detail");
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params["id"];
    });
    this.subscriptions.add(
      this.categoryService.getCategoryById(this.categoryId).subscribe(
        (res: any) => {
          this.category = res.data;
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[catergoryDetail Error]", err);
        }
      )
    );
  }
}
