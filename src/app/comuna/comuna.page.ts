import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-comuna',
  templateUrl: './comuna.page.html',
  styleUrls: ['./comuna.page.scss'],
})
export class ComunaPage implements OnInit {
  comunas: any[] = [];
  regiones: any[] = [];
  newComuna = { nombre: '', idRegion: '' };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadComunas();
    this.loadRegiones();
  }

  async loadComunas() {
    try {
      this.comunas = await this.dataService.getComunas();
    } catch (error) {
      console.error('Error loading comunas', error);
    }
  }

  async loadRegiones() {
    try {
      this.regiones = await this.dataService.getRegiones();
    } catch (error) {
      console.error('Error loading regiones', error);
    }
  }

  async addComuna() {
    try {
      await this.dataService.addComuna(this.newComuna);
      this.newComuna = { nombre: '', idRegion: '' };
      this.loadComunas();
    } catch (error) {
      console.error('Error agregando comuna', error);
    }
  }

  async deleteComuna(id: string) {
    try {
      await this.dataService.deleteComuna(id);
      this.loadComunas();
    } catch (error) {
      console.error('Error eliminando comuna', error);
    }
  }
}
