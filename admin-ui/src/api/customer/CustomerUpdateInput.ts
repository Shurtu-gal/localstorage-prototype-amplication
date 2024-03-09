import { Decimal } from "decimal.js";
import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";
import { OrderUpdateManyWithoutCustomersInput } from "./OrderUpdateManyWithoutCustomersInput";

export type CustomerUpdateInput = {
  email?: string;
  firstName?: string | null;
  lastName?: string | null;
  isVip?: boolean | null;
  birthData?: Date | null;
  averageSale?: Decimal | null;
  favoriteNumber?: bigint | null;
  geoLocation?: string | null;
  comments?: string | null;
  favoriteColors?: Array<"red" | "green" | "purple" | "yellow">;
  customerType?: "platinum" | "gold" | "bronze" | "regular" | null;
  organization?: OrganizationWhereUniqueInput | null;
  vipOrganization?: OrganizationWhereUniqueInput | null;
  orders?: OrderUpdateManyWithoutCustomersInput;
};
