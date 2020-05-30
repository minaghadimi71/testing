import {HeroesComponent} from "./heroes.component";
import {of} from "rxjs";

describe('HeroesComponent', () => {
  let heroesComponent: HeroesComponent;
  let HEROES;
  let mockHeroService;
  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Mina', strength: 22},
      {id: 2, name: 'Asal', strength: 20},
      {id: 3, name: 'Ali', strength: 1}
      ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    heroesComponent = new HeroesComponent(mockHeroService);
  })
  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      heroesComponent.heroes = HEROES;
      heroesComponent.delete(HEROES[2]);
      expect(heroesComponent.heroes.length).toEqual(2);
    })
    it('deleteHero should be called', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      heroesComponent.heroes = HEROES;
      heroesComponent.delete(HEROES[2]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })
  })
  describe('getHero',() => {
    it('should get heroes when getHeroes is called', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      heroesComponent.getHeroes();
      expect(heroesComponent.heroes).toEqual(HEROES);
    });
    it('getHeroes should be called when ngOnInit is called', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      heroesComponent.ngOnInit();
      expect(mockHeroService.getHeroes).toHaveBeenCalled();
    })
  })
  describe('addHero', () => {
    it('should be add hero when add is called', () => {
      heroesComponent.heroes = [];
      let hero = {id: 4, name: 'Ali Reza', strength: 25}
      mockHeroService.addHero.and.returnValue(of(hero));
      heroesComponent.add(hero.name);
      expect(heroesComponent.heroes).toEqual([hero]);
    });
    it('should be add hero when add is called', () => {
      heroesComponent.heroes = [];
      let hero = {id: 4, name: 'Ali Reza', strength: 25}
      mockHeroService.addHero.and.returnValue(of(hero));
      heroesComponent.add(hero.name);
      expect(mockHeroService.addHero).toHaveBeenCalled();
    });

  })
})
