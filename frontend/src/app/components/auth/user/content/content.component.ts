import { Router } from "@angular/router";
import { ConfirmationModalComponent } from "./../../../../shared/components/confirmation-modal/confirmation-modal.component";
import { NotificationService } from "./../../../../core/services/notification.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { Component, OnInit, Input, ViewChild, HostListener } from "@angular/core";
import { ContentService } from '../../../../core/services/content.service';
import { Content } from '../../../../core/models/content.model';
import * as FileSaver from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"],
})
export class ContentComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private contentService: ContentService,
    private notification: NotificationService,
    private router: Router,
    private http: HttpClient
  ) {}
  @Input() categoryId: string;
  modalComponent: ConfirmationModalComponent;
  contents: Content[];
  subscriptions = new Subscription();
  pageNumber: number = 1;
  search="";

  ngOnInit() {
    this.authService.setTitle("Content Listing");
    this.getContents();
  }
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };
  getContents() {
    this.subscriptions.add(
      this.contentService.getContent(this.categoryId).subscribe(
        (res) => {
          this.contents = res.data;
        },
        (err) => {
          this.notification.error(err.message, "Content Error");
          console.error("[Content Error]", err);
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
            this.contentService.deleteContent(id).subscribe(
              (res) => {
                this.notification.success(res.message);
                this.getContents();
              },
              (err) => {
                this.notification.error(err.message, "Content Error");
                console.error("[Content Error]", err);
              }
            )
          );
        } else {
          this.modalComponent.onClose.unsubscribe();
        }
      })
    );
  }

  createContent() {
    this.router.navigate(["users/create-content", this.categoryId]);
  }

 downloadPdf = function(link: string, downloadFileName: string) {
  const req = new XMLHttpRequest();
  req.open('GET', link, true);
  req.responseType = 'blob';

  req.onload = function(event) {
    const blob = new Blob([req.response], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, downloadFileName);
  };
  req.send();
};

}
