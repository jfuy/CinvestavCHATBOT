import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { ChatbotService } from './chatbot.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from 'src/app/models/User.model';

describe('ChatbotService', () => {
  let component: ChatbotService;
  let fixture: ComponentFixture<ChatbotService>;
  // let service:ChatbotService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    // let user:User = new User("alex",12,"luis_pesar@hotmail.com","not","alumno","1", true);
    // localStorage.setItem("user", JSON.stringify(user))

    // this.service = TestBed.get(ChatbotService);
    // service.user= new User("alex",12,"luis_pesar@hotmail.com","not","alumno","1", true)
  });
 
  it('should be created', () => {
    const service: ChatbotService = TestBed.get(ChatbotService);
    service.user= new User("alex",12,"luis_pesar@hotmail.com","not","alumno","1", true)
    expect(service).toBeTruthy();
  });
});
