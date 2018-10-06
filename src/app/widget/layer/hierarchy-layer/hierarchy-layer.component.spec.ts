import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyLayerComponent } from './hierarchy-layer.component';

describe('HierarchyLayerComponent', () => {
  let component: HierarchyLayerComponent;
  let fixture: ComponentFixture<HierarchyLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
