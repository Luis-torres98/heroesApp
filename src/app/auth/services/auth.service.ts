import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.intefaces';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private urlBase = environment.baseUrl;
	private _auth: Auth | undefined;

	get auth() {
		return { ...this._auth };
	}

	constructor(private http: HttpClient) {}

	verificarAutenticacion(): Observable<boolean> {
		if (!localStorage.getItem('id')) {
			return of(false);
		}
		return this.http.get<Auth>(`${this.urlBase}/usuarios/1`).pipe(
			map(auth => {
				this._auth = auth;
				return true;
			})
		);
	}

	login() {
		return this.http.get<Auth>(`${this.urlBase}/usuarios/1`).pipe(
			tap(auth => (this._auth = auth)),
			tap(auth => localStorage.setItem('id', auth.id))
		);
	}
}
