import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	constructor(private router: Router, private authSrv: AuthService) {}

	login() {
		this.authSrv.login().subscribe(resp => {
			if (resp.id) {
				this.router.navigate(['/heroes']);
			}
		});
	}
}
