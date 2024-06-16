/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LandlordListingService } from './landlord-listing.service';

describe('Service: LandlordListing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandlordListingService]
    });
  });

  it('should ...', inject([LandlordListingService], (service: LandlordListingService) => {
    expect(service).toBeTruthy();
  }));
});
