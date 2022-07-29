import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interfaces';

@Injectable({
	providedIn: 'root'
})
export class HeroesService {
	constructor(private _http: HttpClient) {}

	private baseUrl: string = environment.baseUrl;
	// private url = `http://localhost:3000/heroes`;
	getHeroes(): Observable<Heroe[]> {
		return this._http.get<Heroe[]>(`${this.baseUrl}/heroes`);
	}

	getHeroesById(id: string): Observable<Heroe> {
		return this._http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
	}

	getSugerencias(termino: string): Observable<Heroe[]> {
		return this._http.get<Heroe[]>(
			`${this.baseUrl}/heroes?q=${termino}&_limit=6`
		);
	}

	agregrarHeroe(heroe: Heroe): Observable<Heroe> {
		return this._http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
	}
	actualizarHeroe(heroe: Heroe): Observable<Heroe> {
		return this._http.put<Heroe>(
			`${this.baseUrl}/heroes/${heroe.id}`,
			heroe
		);
	}
	borrarHeroe(id: string): Observable<any> {
		return this._http.delete<any>(`${this.baseUrl}/heroes/${id}`);
	}
}
