// src/RouteNames.ts
export enum RouteNames {
  PhonesList = "PhonesList",
  Phone = "Phone",
  Favorites = "Favorites",
}

export type RouteTypeList = {
  PhonesList: undefined;
  Phone: { phoneId: string };
  Favorites: undefined;
};
