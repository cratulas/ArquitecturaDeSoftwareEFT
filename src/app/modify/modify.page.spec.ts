import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyPage } from './modify.page';

describe('ModifyPage', () => {
  let component: ModifyPage;
  let fixture: ComponentFixture<ModifyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
