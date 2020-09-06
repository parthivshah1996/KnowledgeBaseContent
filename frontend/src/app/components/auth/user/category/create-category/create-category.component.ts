import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FileUploadService } from "./../../../../../core/services/file-upload.service";
import { Categories } from "./../../../../../core/models/categories.model";
import { Subscription } from "rxjs";
import { FormControl } from "@angular/forms"; 
import { Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { NotificationService } from "./../../../../../core/services/notification.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CategoryService } from '../../../../../core/services/category.service';

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.css"],
})
export class CreateCategoryComponent implements OnInit {
  isFormSubmitted: Boolean = false;
  subscriptions = new Subscription();
  categoryForm: FormGroup;
  files: any;
  categoryId: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private categoryService: CategoryService,
    private fileUploadService: FileUploadService,
    private loadingService: Ng4LoadingSpinnerService,
  ) { }

  ngOnInit() {
    this.authService.setTitle("Create Category");
    this.categoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      image: new FormControl(""),
    });
  }

  createCategory(categoryForm: FormGroup) {
    this.isFormSubmitted = true;
    if (categoryForm.invalid) {
      this.notification.error("Please fill all mandatory fields");
      return;
    }
    const categoryDetails = categoryForm.value;
    const category: Categories = new Categories();
    category.name = categoryDetails.name;
    category.description = categoryDetails.description;
    this.loadingService.show();
    category.image = "";
    this.storeCategory(category);
  }

  storeCategory(categories: Categories) {
    this.subscriptions.add(
      this.categoryService.addCategory(categories).subscribe(
        (res) => {
          this.loadingService.hide();
          this.notification.success(res.message);
          this.router.navigate([`/users/category`]);
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[storeCategory Error]", err);
        }
      )
    );
  }
  prepareFiles(files: any) {
    this.files = files;
  }
}
