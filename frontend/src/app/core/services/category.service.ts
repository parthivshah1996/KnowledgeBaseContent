import { Categories } from "./../models/categories.model";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { ApiConstants } from "./../constants/api.constant";
import { HttpClientService } from "./http-client.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http_client: HttpClientService) {}
  getCategory() {
    return this.http_client.get(ApiConstants.getCategory).pipe(
      map((res: any) => {
        console.log("[getCategory Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteCategory(id: string) {
    return this.http_client.delete(`${ApiConstants.getCategory}/${id}`).pipe(
      map((res: any) => {
        console.log("[deleteCategory Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  addCategory(categories: Categories) {
    return this.http_client.post(ApiConstants.getCategory, categories).pipe(
      map((res: any) => {
        console.log("[addCategory Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  updateCategory(categories: Categories) {
    return this.http_client.put(ApiConstants.getCategory, categories).pipe(
      map((res: any) => {
        console.log("[updateCategory Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  getCategoryById(id: string) {
    return this.http_client.get(`${ApiConstants.getCategory}/${id}`).pipe(
      map((res: any) => {
        console.log("[getCategoryById Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }
}
