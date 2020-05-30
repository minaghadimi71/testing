import {HeroComponent} from "./hero.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('HeroComponent (shallow test)', () => {
  let fixture: ComponentFixture<HeroComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroComponent);
  })
  it('should have the correct hero', () => {
    fixture.componentInstance.hero = {id: 4, name: 'mina', strength: 20};
    expect(fixture.componentInstance.hero.name).toEqual('mina');
  })
  it('should render the hero name in an anchor tag ', ()=> {
    fixture.componentInstance.hero = {id: 4, name: 'mina', strength: 20};
    fixture.detectChanges();
    const deA = fixture.debugElement.query(By.css('a'));
    expect(deA.nativeElement.textContent).toContain('mina');
    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('mina');
  })
  it('should render the jan in an anchor tag ', ()=> {
    fixture.componentInstance.hero = {id: 4, name: 'mina', strength: 20};
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('jan');
  })
})
