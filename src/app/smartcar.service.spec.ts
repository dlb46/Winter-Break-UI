import { TestBed, inject } from '@angular/core/testing';

import { EndpointService } from './services/endpoint.service';

describe('SmartcarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndpointService]
    });
  });

  it('should be created', inject([EndpointService], (service: EndpointService) => {
    expect(service).toBeTruthy();
  }));
});
