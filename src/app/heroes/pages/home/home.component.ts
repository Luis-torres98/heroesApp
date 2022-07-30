import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
	constructor(private _router: Router) {}

	logout() {
		this._router.navigate(['/auth/login']);
	}
}
