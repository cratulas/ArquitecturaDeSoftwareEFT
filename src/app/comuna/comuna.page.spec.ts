import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComunaPage } from './comuna.page';

describe('ComunaPage', () => {
  let component: ComunaPage;
  let fixture: ComponentFixture<ComunaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
