import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FileUploadService } from "./../../../../../core/services/file-upload.service";
import { Subscription } from "rxjs";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { NotificationService } from "./../../../../../core/services/notification.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CategoryService } from '../../../../../core/services/category.service';
import { Categories } from '../../../../../core/models/Categories.model';

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.css"],
})
export class EditCategoryComponent implements OnInit {
  isFormSubmitted: Boolean = false;
  subscriptions = new Subscription();
  categoryForm: FormGroup;
  categoryId: string;
  files: any;
  categoryImage: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private loadingService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.authService.setTitle("Update Category");
    this.categoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      image: new FormControl(""),
    });
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params["id"];
    });
    this.subscriptions.add(
      this.categoryService.getCategoryById(this.categoryId).subscribe(
        (res) => {
          this.setValue(res.data);
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[EditCategory Error]", err);
        }
      )
    );
  }

  setValue(category: Categories) {
    this.categoryImage = category.image;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
    });
  }

  updateCategory(categoryForm: FormGroup) {
    this.isFormSubmitted = true;
    if (categoryForm.invalid) {
      this.notification.error("Please fill all mandatory fields");
      return;
    }
    const categoryDetails = categoryForm.value;
    const category: Categories = new Categories();
    category.id = this.categoryId;
    category.name = categoryDetails.name;
    category.description = categoryDetails.description;
    this.loadingService.show();
    category.image = "";
    this.callUpdateCategory(category);
  }

  callUpdateCategory(category: Categories) {
    this.subscriptions.add(
      this.categoryService.updateCategory(category).subscribe(
        (res) => {
          this.loadingService.hide();
          this.notification.success(res.message);
          this.router.navigate([`/users/category`]);
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[callUpdateCategory Error]", err);
        }
      )
    );
  }

  prepareFiles(files: any) {
    this.files = files;
  }
}
