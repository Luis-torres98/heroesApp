import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HttpClient } from '@angular/common/http';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styles: [
        `
            img {
                width: 100%;
                border-radius: 5px;
            }
        `
    ]
})
export class HeroeComponent implements OnInit {
    heroe!: Heroe;
    constructor(
        private route: ActivatedRoute,
        private srvHeroe: HeroesService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params.id);
            this.srvHeroe.getHeroesById(params.id).subscribe((e: Heroe) => {
                this.heroe = e;
            });
        });
    }

    regresar() {
        this.router.navigate(['/heroes/listado']);
    }
}
