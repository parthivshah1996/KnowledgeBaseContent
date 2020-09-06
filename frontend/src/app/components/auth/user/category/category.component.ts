import { Router } from "@angular/router";
import { ConfirmationModalComponent } from "./../../../../shared/components/confirmation-modal/confirmation-modal.component";
import { NotificationService } from "./../../../../core/services/notification.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { CategoryService } from '../../../../core/services/category.service';
import { Categories } from '../../../../core/models/Categories.model';

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private notification: NotificationService,
    private router: Router
  ) {}

  modalComponent: ConfirmationModalComponent;
  categories: Categories[];
  subscriptions = new Subscription();
  pageNumber: number = 1;
  search="";

  ngOnInit() {
    this.authService.setTitle("Category Listing");
    this.getCategories();
  }

  getCategories() {
    this.subscriptions.add(
      this.categoryService.getCategory().subscribe(
        (res) => {
          this.categories = res.data;
        },
        (err) => {
          this.notification.error(err.message, "categories Error");
          console.error("[categories Error]", err);
        }
      )
    );
  }

  delete(id: string) {
    this.modalComponent = this.authService.openConfimationModal();
    this.modalComponent.showConfirmationModal(
      `Logout`,
      `Are you sure want to delete?`,
      `Yes`,
      `No`
    );
    this.subscriptions.add(
      this.modalComponent.onClose.subscribe((result) => {
        if (result) {
          this.subscriptions.add(
            this.categoryService.deleteCategory(id).subscribe(
              (res) => {
                this.notification.success(res.message);
                this.getCategories();
              },
              (err) => {
                this.notification.error(err.message, "categories Error");
                console.error("[categories Error]", err);
              }
            )
          );
        } else {
          this.modalComponent.onClose.unsubscribe();
        }
      })
    );
  }

  updateCategory(id: string) {
    this.router.navigate(["users/update-category", id]);
  }

  viewCategory(id: string) {
    this.router.navigate(["users/category-detail", id]);
  }
}
