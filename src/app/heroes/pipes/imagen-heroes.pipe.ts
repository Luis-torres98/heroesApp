import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
	name: 'imagenHeroes'
	// TODO: pipe puros e impuros para activarse cada que  se activa el cycle-changes
	// pure: false
})
export class ImagenHeroesPipe implements PipeTransform {
	transform(heroe: Heroe): string {
		if (!heroe.id && !heroe.alt_img) {
			return `assets/no-image.png`;
		} else if (heroe.alt_img) return heroe.alt_img;

		return `assets/heroes/${heroe.id}.jpg`;
	}
}
