import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Pro-Tection",
  legalName: "PRO-TECTION SAS",
  tradeName: "neoassur",
  tagline: "Votre santé, notre engagement",
  email: "contact@pro-tection.fr",
  phone: "+33 1 87 66 56 10",
  phoneDisplay: "01 87 66 56 10",
  whatsapp: "33187665610",
  address: "49-51 rue de Ponthieu, 75008 Paris, France",
  founded: 2013,
  legalForm: "Société par actions simplifiée (SASU)",
  capital: "1 000 €",
  rcs: "798 662 797 R.C.S. Paris",
  siren: "798662797",
  rcsCity: "Paris",
  rcsNumber: "2014B00902",
  euid: "FR7501.798662797",
  naf: "6622Z",
  orias: "14001288",
  oriasCapacity: "Courtier d'assurance ou de réassurance (COA)",
  oriasSince: "14/06/2024",
  president: "Mohamed Amine Khiari dit Medeb",
};
