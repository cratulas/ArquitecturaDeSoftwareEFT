import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-region',
  templateUrl: './region.page.html',
  styleUrls: ['./region.page.scss'],
})
export class RegionPage implements OnInit {
  regiones: any[] = [];
  newRegion = { nombre: '' };

  constructor(private dataService: DataService, private auth: Auth) {}

  ngOnInit() {
    this.loadRegiones();
  }

  async loadRegiones() {
    try {
      const user = this.auth.currentUser;
      if (user) {
        this.regiones = await this.dataService.getRegiones();
      } else {
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error loading regiones', error);
    }
  }

  async addRegion() {
    try {
      const user = this.auth.currentUser;
      if (user) {
        await this.dataService.addRegion(this.newRegion);
        this.newRegion = { nombre: '' };
        this.loadRegiones();
      } else {
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error adding region', error);
    }
  }

  async deleteRegion(id: string) {
    try {
      const user = this.auth.currentUser;
      if (user) {
        await this.dataService.deleteRegion(id);
        this.loadRegiones();
      } else {
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error deleting region', error);
    }
  }
}
