import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FileUploadService } from "./../../../../../core/services/file-upload.service";
import { Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { NotificationService } from "./../../../../../core/services/notification.service";
import { AuthService } from "src/app/core/services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Content } from '../../../../../core/models/content.model';
import { ContentService } from '../../../../../core/services/content.service';

@Component({
  selector: "app-create-content",
  templateUrl: "./create-content.component.html",
  styleUrls: ["./create-content.component.css"],
})
export class CreateContentComponent implements OnInit {
  isFormSubmitted: Boolean = false;
  subscriptions = new Subscription();
  contentForm: FormGroup;
  files: any;
  categoryId: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private contentService: ContentService,
    private fileUploadService: FileUploadService,
    private loadingService: Ng4LoadingSpinnerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.authService.setTitle("Create Content");
    this.contentForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      type: new FormControl(""),
      image: new FormControl("",[Validators.required]),
    });
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params["id"];
    });
  }

  createContent(contentForm: FormGroup) {
    this.isFormSubmitted = true;
    if (contentForm.invalid) {
      this.notification.error("Please fill all mandatory fields");
      return;
    }
    const contentDetails = contentForm.value;
    const content: Content = new Content();
    content.name = contentDetails.name;
    content.description = contentDetails.description;
    content.type = contentDetails.type;
    content.categoryId = this.categoryId;
    this.loadingService.show();
    if (!!this.files) {
      this.fileUploadService.uploadFile(this.files[0]).subscribe((result) => {
        content.image = result.data.DownloadURL;
        content.imageName = result.data.FileName;
        this.storeContent(content);
      });
    } else {
      content.image = "";
      this.storeContent(content);
    }
  }

  storeContent(content: Content) {
    if (content.image === "") {
      this.notification.error("Image not selected");
      return;
    }

    this.subscriptions.add(
      this.contentService.addContent(content).subscribe(
        (res) => {
          this.loadingService.hide();
          this.notification.success(res.message);
          this.router.navigate([`/users/category`]);
        },
        (err) => {
          this.notification.error(err.message);
          console.error("[storeContent Error]", err);
        }
      )
    );
  }
  prepareFiles(files: any) {
    this.files = files;
  }
}
