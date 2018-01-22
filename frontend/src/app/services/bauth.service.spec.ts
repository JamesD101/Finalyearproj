import { TestBed, inject } from '@angular/core/testing';

import { BauthService } from './bauth.service';

describe('BauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BauthService]
    });
  });

  it('should be created', inject([BauthService], (service: BauthService) => {
    expect(service).toBeTruthy();
  }));
});
