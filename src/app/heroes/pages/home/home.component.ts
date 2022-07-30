import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../auth/interfaces/auth.intefaces';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	styles: [
		`
			.container {
				margin: 10px;
			}
		`
	]
})
export class HomeComponent {
	get auth() {
		return this.authSrv.auth;
	}

	constructor(private _router: Router, private authSrv: AuthService) {}

	logout() {
		this._router.navigate(['/auth/login']);
	}
}
