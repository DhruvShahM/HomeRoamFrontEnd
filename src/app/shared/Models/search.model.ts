import { BookedDatesDTOFromServer } from "./booking-model";
import { NewListingInfo } from "./core/listing-model";


export interface Search {
  location: string,
  dates: BookedDatesDTOFromServer,
  infos: NewListingInfo
}
