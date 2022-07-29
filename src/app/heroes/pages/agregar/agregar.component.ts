import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
	selector: 'app-agregar',
	templateUrl: './agregar.component.html',
	styles: [
		`
			img {
				width: 100%;
				border-radius: 5px;
			}
		`
	]
})
export class AgregarComponent implements OnInit {
	publishers = [
		{
			id: 'DC-Comics',
			desc: 'DC - Comics'
		},
		{
			id: 'Marvel-Comics',
			desc: 'Marvel - Comics'
		}
	];
	heroe: Heroe = {
		superhero: '',
		alter_ego: '',
		characters: '',
		first_appearance: '',
		publisher: Publisher.DCComics,
		alt_img: ''
	};
	constructor(
		private heroesSrv: HeroesService,
		private routerAct: ActivatedRoute,
		private router: Router,
		private _snackBar: MatSnackBar,
		private _dialog: MatDialog
	) {}

	ngOnInit() {
		console.log();
		if (!this.router.url.includes('editar')) {
			return;
		}

		this.routerAct.params
			.pipe(switchMap(({ id }) => this.heroesSrv.getHeroesById(id)))
			.subscribe(heroe => (this.heroe = heroe));
	}

	guardar() {
		if (this.heroe.superhero.trim().length === 0) {
			return;
		}

		if (this.heroe.id) {
			this.heroesSrv
				.actualizarHeroe(this.heroe)
				.subscribe(heroe =>
					this.mostrarSnackBar('Registro Actualizado')
				);
		} else {
			this.heroesSrv.agregrarHeroe(this.heroe).subscribe(heroe => {
				this.router.navigate(['/heroes/editar', heroe.id]);
				this.mostrarSnackBar('Registro Creado');
			});
		}
	}

	borrarHeroe() {
		const dialog = this._dialog.open(ConfirmarComponent, {
			width: '250px',
			data: this.heroe
		});

		dialog.afterClosed().subscribe(resp => {
			if (resp) {
				this.heroesSrv.borrarHeroe(this.heroe.id!).subscribe(resp => {
					this.router.navigate(['/heroes']);
				});
			}
		});
	}

	mostrarSnackBar(mensaje: string) {
		this._snackBar.open(mensaje, 'ok!', {
			duration: 2500
		});
	}
}
