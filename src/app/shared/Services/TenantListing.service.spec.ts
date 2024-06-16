/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TenantListingService } from './TenantListing.service';

describe('Service: TenantListing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantListingService]
    });
  });

  it('should ...', inject([TenantListingService], (service: TenantListingService) => {
    expect(service).toBeTruthy();
  }));
});
