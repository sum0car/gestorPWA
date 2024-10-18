import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaCrudComponent } from './marca-crud.component';

describe('MarcaCrudComponent', () => {
  let component: MarcaCrudComponent;
  let fixture: ComponentFixture<MarcaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcaCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
