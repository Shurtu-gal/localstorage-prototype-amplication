import { Decimal } from "decimal.js";
import { Organization } from "../organization/Organization";
import { Order } from "../order/Order";

export type Customer = {
  id: bigint;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isVip: boolean | null;
  birthData: Date | null;
  averageSale: Decimal | null;
  favoriteNumber: bigint | null;
  geoLocation: string | null;
  comments: string | null;
  favoriteColors?: Array<"red" | "green" | "purple" | "yellow">;
  customerType?: "platinum" | "gold" | "bronze" | "regular" | null;
  organization?: Organization | null;
  vipOrganization?: Organization | null;
  orders?: Array<Order>;
};
