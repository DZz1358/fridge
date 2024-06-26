import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseProductsComponent } from './showcase-products.component';

describe('ShowcaseProductsComponent', () => {
  let component: ShowcaseProductsComponent;
  let fixture: ComponentFixture<ShowcaseProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowcaseProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
