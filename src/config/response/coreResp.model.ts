export interface coreResponse {
  rc: string;
  rd: string;
  data: any;
}

export interface currencyResponse {
  currency: currencyDetails;
}

interface currencyDetails {
  currency_code: string;
  pratnum: string;
  prate: string;
  desc: string;
}
