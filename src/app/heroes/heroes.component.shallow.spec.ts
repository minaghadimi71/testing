import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {Component, Input, NO_ERRORS_SCHEMA} from "@angular/core";
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";

describe('HeroesComponent(Shallow)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let MockHeroService;
  let HEROES;
  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
class FakeHeroComponent{
    @Input() hero;
  }
  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Mina', strength: 22},
      {id: 2, name: 'Asal', strength: 20},
      {id: 3, name: 'Ali', strength: 1}
    ];
    MockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{
        provide: HeroService, useValue: MockHeroService
      }],
      // schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  })
  it('should set heroes correctly from the service', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toEqual(3);
  })
  it('should remove the indicated hero from the heroes list', () => {
    MockHeroService.deleteHero.and.returnValue(of(true));
    fixture.componentInstance.heroes = HEROES;
    fixture.componentInstance.delete(HEROES[2]);
    expect(fixture.componentInstance.heroes.length).toEqual(2);
  })
  it('should create a li for each hero', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
  })
})
