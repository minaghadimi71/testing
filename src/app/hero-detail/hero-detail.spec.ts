import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroService} from "../hero.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";

describe('HeroDetailComponent', ()=>{
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockLocation;
  let mockHeroService;
  let mockActivatedRoute;
  beforeEach(() => {
    mockLocation = jasmine.createSpyObj(['back']);
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockActivatedRoute = {snapshot: {paramMap: {get : () => {return '3'}}}}
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'mina', strength: 2}));
  });
  it('should render hero name in h2 tag', ()=> {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('MINA');
  })
})
