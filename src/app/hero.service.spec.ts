import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HeroService} from "./hero.service";
import {MessageService} from "./message.service";

describe('HeroService', () => {
  let MockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;
  beforeEach(() => {
    MockMessageService = jasmine.createSpyObj(['add'])
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HeroService,
        {provide: MessageService, useValue: MockMessageService}
      ]
    })
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  })
  describe('getHero', () => {
    it('should call get with the correct URL', () => {
      service.getHero(5).subscribe();
      let req = httpTestingController.expectOne('api/heroes/5');
      req.flush({id:5, name: 'Super', strength: 10});
      httpTestingController.verify();
    })
  })
})
