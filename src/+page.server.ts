import { companies } from "./data/Companies";

export function load() {
  return {
    companylist: companies,
  };
}
