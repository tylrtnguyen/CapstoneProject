import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler){
      return next.handle(req).pipe(
        catchError((err:HttpErrorResponse) => {

            alert(err.error.message);
            const error = err.error.message || err.statusText
            return throwError(error);
        }));
    }
}
