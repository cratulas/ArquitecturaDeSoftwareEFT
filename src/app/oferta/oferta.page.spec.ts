import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfertaPage } from './oferta.page';

describe('OfertaPage', () => {
  let component: OfertaPage;
  let fixture: ComponentFixture<OfertaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
