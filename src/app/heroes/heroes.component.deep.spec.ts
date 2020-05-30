import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {HeroComponent} from "../hero/hero.component";
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {Directive, Input, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParam: any;
  navigateTo: any = null;

  onClick() {
    this.navigateTo = this.linkParam
  }
}

describe('HeroesComponent(deep)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES;
  let MockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Mina', strength: 22},
      {id: 2, name: 'Asal', strength: 20},
      {id: 3, name: 'Ali', strength: 1}
    ];
    MockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{
        provide: HeroService, useValue: MockHeroService
      }],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  })
  it('should render each hero as heroComponent', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toEqual(3);
    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });
  it('should adding hero render as hero as heroComponent', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    let hero = {id: 4, name: 'Minajan', strength: 23};
    MockHeroService.addHero.and.returnValue(of(hero));
    fixture.componentInstance.add(hero.name);
    fixture.detectChanges();
    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toEqual(4);
  });
  it('should add a new hero to hero list when the add button is clicked', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mina';
    MockHeroService.addHero.and.returnValue(of({id: 4, name: name, strength: 4}));
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0]
    input.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const textHero = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(textHero).toContain(name);


  });
  it(`should called heroService.deleteHero
  when the Hero component's delete button is called`, () => {
    spyOn(fixture.componentInstance, 'delete');
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponent[0].query(By.css('button.delete.asl')).triggerEventHandler('click', {
      stopPropagation: () => {
      }
    });
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should called delete when the Hero component's delete emit `, () => {
    spyOn(fixture.componentInstance, 'delete');
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>heroComponent[0].componentInstance).delete.emit(undefined);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });
  it(`should called delete when the Hero component's delete emit`, () => {
    spyOn(fixture.componentInstance, 'delete');
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponent[0].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })

  it(`should add hero to view when the Hero component's add button is called`, () => {
    spyOn(fixture.componentInstance, 'addToView');
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponent[0].query(By.css('button.delete.add')).triggerEventHandler('click', {});
    expect(fixture.componentInstance.addToView).toHaveBeenCalledWith(HEROES[0]);
  });
  it(`should add hero to view when the Hero component's add button is called -2`, () => {
    spyOn(fixture.componentInstance, 'addToView');
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponent[0].triggerEventHandler('add', HEROES[0]);
    expect(fixture.componentInstance.addToView).toHaveBeenCalledWith(HEROES[0]);
  });
  it('should add hero to viewHeroes when addToView is called', () => {
    let hero = {id: 4, name: 'Minajan', strength: 23};
    fixture.componentInstance.addToView(hero);
    expect(fixture.componentInstance.viewHeroes).toEqual([hero]);
  });
  it('should have the correct route for the first hero', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));
    let routerLink = heroComponent[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);
    heroComponent[0].query(By.css('a')).triggerEventHandler('click', null);
    expect(routerLink.navigateTo).toBe('/detail/1')
  });
})
