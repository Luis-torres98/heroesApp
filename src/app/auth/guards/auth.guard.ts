import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot,
	UrlSegment,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
	constructor(private _authSrv: AuthService, private _router: Router) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this._authSrv.verificarAutenticacion().pipe(
			tap(isAuth => {
				if (!isAuth) {
					this._router.navigate(['./auth/login']);
				}
			})
		);

		// if (this._authSrv.auth.id) {
		// 	return true;
		// }

		// console.log('Bloqueado por AuthGuard - CanActivate');

		// return false;
	}
	canLoad(
		route: Route,
		segments: UrlSegment[]
	): Observable<boolean> | boolean {
		return this._authSrv.verificarAutenticacion();
		// if (this._authSrv.auth.id) {
		// 	return true;
		// }

		// console.log('Bloqueado por AuthGuard - CanLoad');

		// return false;
	}
}
