import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-buscar',
    templateUrl: './buscar.component.html',
    styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {
    termino: string = '';
    heroes: Heroe[] = [];

    heroeSeleccionado!: Heroe | undefined;
    constructor(private heroesSrv: HeroesService) {}

    ngOnInit(): void {}

    buscando() {
        this.heroesSrv
            .getSugerencias(this.termino.trim())
            .subscribe(heroes => (this.heroes = heroes));

        console.log(this.heroes);
    }

    opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
        const heroe: Heroe = event.option.value;

        if (!heroe) {
            this.heroeSeleccionado = undefined;
            return;
        }
        this.termino = heroe.superhero;
        this.heroesSrv
            .getHeroesById(heroe.id!)
            .subscribe(heroe => (this.heroeSeleccionado = heroe));
    }
}
