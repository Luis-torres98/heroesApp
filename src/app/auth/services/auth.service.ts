import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { auth } from '../interfaces/auth.intefaces';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private urlBase = environment.baseUrl;

	constructor(private http: HttpClient) {}

	login() {
		return this.http.get<auth>(`${this.urlBase}/usuarios/1`);
	}
}
