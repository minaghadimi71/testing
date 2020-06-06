import {TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('appComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
  })
  it('should create the app', () => {
    const component = TestBed.createComponent(AppComponent);
    let app = component.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })
  it(`title should equal to 'Tour of Heroes'`, () => {
   const component = TestBed.createComponent(AppComponent);
   let app = component.debugElement.componentInstance;
   expect(app.title).toEqual('Tour of Heroes');
  })
  it('h1 should be contain title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent)
      .toEqual('Tour of Heroes');
  });
  it('title should be write from component', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    app.title = 'Mina';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent)
      .toEqual('Mina');
  })
})
