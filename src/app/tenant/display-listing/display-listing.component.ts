import { NgClass } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AvatarComponent } from '../../layout/navbar/avatar/avatar.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Category } from '../../shared/Models/category-model';
import { Listing, DisplayPicture } from '../../shared/Models/core/listing-model';
import { TenantListingService } from '../../shared/Services/TenantListing.service';
import { CategoryService } from '../../shared/Services/category.service';
import { CountryService } from '../../shared/Services/country.service';
import { ToastService } from '../../shared/Services/toast.service';
import { BookDateComponent } from '../book-date/book-date.component';

@Component({
  selector: 'app-display-listing',
  standalone: true,
  imports: [
    NgClass,
    FaIconComponent,
    AvatarComponent,
    BookDateComponent
  ],
  templateUrl: './display-listing.component.html',
  styleUrl: './display-listing.component.scss'
})
export class DisplayListingComponent {

  tenantListingService = inject(TenantListingService);
  activatedRoute = inject(ActivatedRoute);
  toastService = inject(ToastService);
  categoryService = inject(CategoryService);
  countryService = inject(CountryService);

  listing: Listing | undefined;
  category: Category | undefined;
  currentPublicId = "";

  loading = true;


  constructor() {
    this.listenToFetchListing();
  }

  ngOnDestroy(): void {
    this.tenantListingService.resetGetOneByPublicId();
  }

  ngOnInit(): void {
    this.extractIdParamFromRouter();
  }

  private extractIdParamFromRouter() {
    this.activatedRoute.queryParams.pipe(
      map(params => params['id'])
    ).subscribe({
      next: publicId => this.fetchListing(publicId)
    })
  }

  private fetchListing(publicId: string) {
    this.loading = true;
    this.currentPublicId = publicId;
    this.tenantListingService.getOneByPublicId(publicId);
  }

  private listenToFetchListing() {
    effect(() => {
      const listingByPublicIdState = this.tenantListingService.getOneByPublicIdSig();
      if (listingByPublicIdState.status === "OK") {
        this.loading = false;
        this.listing = listingByPublicIdState.value;
        if (this.listing) {
          this.listing.pictures = this.putCoverPictureFirst(this.listing.pictures);
          this.category = this.categoryService.getCategoryByTechnicalName(this.listing.category);
          this.countryService.getCountryByCode(this.listing.location)
            .subscribe({
              next: country => {
                if (this.listing) {
                  this.listing.location = country.region + ", " + country.name.common;
                }
              }
            });
        }
      } else if (listingByPublicIdState.status === "ERROR") {
        this.loading = false;
        this.toastService.send({
          severity: "error", detail: "Error when fetching the listing",
        })
      }
    });
  }

  private putCoverPictureFirst(pictures: Array<DisplayPicture>) {
    const coverIndex = pictures.findIndex(picture => picture.isCover);
    if (coverIndex) {
      const cover = pictures[coverIndex];
      pictures.splice(coverIndex, 1);
      pictures.unshift(cover);
    }
    return pictures;
  }
}
