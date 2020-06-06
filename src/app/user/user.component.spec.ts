import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UserComponent } from './user.component';
import {UserService} from "./user.service";
import {DataService} from "./data.service";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should use the user name from service', () => {
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.user.name);
  });
  it('should display the user name if user is log in', () => {
    component.isLogin = true;
    fixture.detectChanges();
    let compile = fixture.debugElement.nativeElement;
    expect(compile.querySelector('p').textContent).toContain(component.user.name);
  });
  it(`should not display user name if user is not log in`, () => {
    fixture.detectChanges();
    let compile = fixture.debugElement.nativeElement;
    expect(compile.querySelector('p').textContent).not.toContain(component.user.name);
    expect(compile.querySelector('p').textContent).toContain('please login');
  });
  it(`shouldn't fetch data successfully if not called asynchronously`, () => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'returnData')
      .and.returnValue( Promise.resolve('Data'));
    fixture.detectChanges();
    expect(component.data).toEqual(undefined);
  });
  it(`should fetch data successfully if called asynchronously`, async(() => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'returnData')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toEqual('Data');
    })
  }));
  it('should fetch data successfully if called asynchronously', fakeAsync(() => {
    let dataService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(dataService, 'returnData').and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(component.data).toEqual('Data');
  }))
});
