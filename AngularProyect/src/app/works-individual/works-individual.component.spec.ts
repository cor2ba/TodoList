import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksIndividualComponent } from './works-individual.component';

describe('WorksIndividualComponent', () => {
  let component: WorksIndividualComponent;
  let fixture: ComponentFixture<WorksIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorksIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
