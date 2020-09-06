import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from './category/category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { ContentComponent } from './content/content.component';
import { CreateContentComponent } from './content/create-content/create-content.component';
import { ContentDetailComponent } from './content/content-detail/content-detail.component';

const routes: Routes = [
  {
    path: "",
    component: null,
    children: [
      { path: "category", component: CategoryComponent },
      { path: "create-category", component: CreateCategoryComponent },
      { path: "update-category/:id", component: EditCategoryComponent },
      { path: "category-detail/:id", component: CategoryDetailComponent },
      { path: "content", component: ContentComponent },
      { path: "create-content/:id", component: CreateContentComponent },
      { path: "content-detail/:id", component: ContentDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
