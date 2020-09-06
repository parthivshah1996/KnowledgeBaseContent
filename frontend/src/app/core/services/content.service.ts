import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { ApiConstants } from "./../constants/api.constant";
import { HttpClientService } from "./http-client.service";
import { Injectable } from "@angular/core";
import { Content } from '../models/content.model';

@Injectable({
  providedIn: "root",
})
export class ContentService {
  constructor(private http_client: HttpClientService) {}
  getContent(id: string) {
    return this.http_client.get(`${ApiConstants.getContent}/${id}`).pipe(
      map((res: any) => {
        console.log("[getContent Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteContent(id: string) {
    return this.http_client.delete(`${ApiConstants.getContent}/${id}`).pipe(
      map((res: any) => {
        console.log("[deleteContent Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  addContent(content: Content) {
    return this.http_client.post(ApiConstants.getContent, content).pipe(
      map((res: any) => {
        console.log("[addContent Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  updateContent(content: Content) {
    return this.http_client.put(ApiConstants.getContent, content).pipe(
      map((res: any) => {
        console.log("[updateContent Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  getContentById(id: string) {
    return this.http_client.get(`${ApiConstants.getContent}/${id}`).pipe(
      map((res: any) => {
        console.log("[getContentById Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }

  getContentByCategoryId(id: string) {
    return this.http_client.get(`${ApiConstants.getContent}/${id}`).pipe(
      map((res: any) => {
        console.log("[getContentById Response]", res);
        return res;
      }),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
  }
}
