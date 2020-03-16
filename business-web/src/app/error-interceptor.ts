import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler){
      return next.handle(req).pipe(
        catchError((err:HttpErrorResponse)=>{

            alert(err.error.message);
            const error = err.error.message || err.statusText
            return throwError(error);
        }));
    }
}
