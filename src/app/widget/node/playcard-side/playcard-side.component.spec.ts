import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaycardSideComponent } from './playcard-side.component';

describe('PlaycardSideComponent', () => {
  let component: PlaycardSideComponent;
  let fixture: ComponentFixture<PlaycardSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaycardSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaycardSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
