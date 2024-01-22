import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkFavComponent } from './artwork-fav.component';

describe('ArtworkFavComponent', () => {
  let component: ArtworkFavComponent;
  let fixture: ComponentFixture<ArtworkFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtworkFavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtworkFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
