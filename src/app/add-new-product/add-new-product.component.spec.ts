import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AddNewProductComponent } from './add-new-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddNewProductComponent', () => {
  let component: AddNewProductComponent;
  let fixture: ComponentFixture<AddNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
      declarations: [ AddNewProductComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
