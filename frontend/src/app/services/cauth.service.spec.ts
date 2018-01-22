import { TestBed, inject } from '@angular/core/testing';

import { CauthService } from './cauth.service';

describe('CauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CauthService]
    });
  });

  it('should be created', inject([CauthService], (service: CauthService) => {
    expect(service).toBeTruthy();
  }));
});
