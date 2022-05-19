import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenService} from "../service/token.service";
import {CONSTANTS} from "../constant/util";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.tokenService.getToken();
    const tokenType = this.tokenService.getTokenType();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(CONSTANTS.TOKEN_HEADER_KEY, tokenType + ' ' + token)});
    }
    return next.handle(authReq);
  }
}

export const HttpInterceptorProvider =
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};
