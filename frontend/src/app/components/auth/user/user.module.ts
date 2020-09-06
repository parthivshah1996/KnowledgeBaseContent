import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { CategoryComponent } from './category/category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { ContentComponent } from './content/content.component';
import { CreateContentComponent } from './content/create-content/create-content.component';
import { ContentDetailComponent } from './content/content-detail/content-detail.component';
import { SearchPipe } from '../../../core/pipes/content.pipe'
import { CategorySearchPipe } from '../../../core/pipes/category.pipe';

@NgModule({
  declarations: [SearchPipe, CategorySearchPipe,ContentComponent, CreateContentComponent, ContentDetailComponent ,CategoryComponent, CreateCategoryComponent, EditCategoryComponent, CategoryDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    TranslateModule,
    // SafeUrlPipe
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class UserModule {}
