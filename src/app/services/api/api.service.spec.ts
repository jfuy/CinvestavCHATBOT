import { TestBed ,async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from './api.service';


describe('APIService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
      ],
    }).compileComponents();
  }));

  beforeEach(() => TestBed.configureTestingModule({}));
  

  it('should be created', () => {
    const service: APIService = TestBed.get(APIService);
    expect(service).toBeTruthy();
  });
});
