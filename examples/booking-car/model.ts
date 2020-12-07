export interface GeoCodingResult {
  position: {lat: string; lng: string};
  formattedAddress: string;
  feature: string | null;
  streetNumber: string | null;
  streetName: string | null;
  postalCode: string | null;
  locality: string | null;
  country: string;
  countryCode: string;
  adminArea: string | null;
  subAdminArea: string | null;
  subLocality: string | null;
}
