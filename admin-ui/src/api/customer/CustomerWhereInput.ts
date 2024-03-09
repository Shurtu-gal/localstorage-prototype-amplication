import { BigIntFilter } from "../../util/BigIntFilter";
import { DateTimeFilter } from "../../util/DateTimeFilter";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { DecimalNullableFilter } from "../../util/DecimalNullableFilter";
import { BigIntNullableFilter } from "../../util/BigIntNullableFilter";
import { OrganizationWhereUniqueInput } from "../organization/OrganizationWhereUniqueInput";
import { OrderListRelationFilter } from "../order/OrderListRelationFilter";

export type CustomerWhereInput = {
  id?: BigIntFilter;
  createdAt?: DateTimeFilter;
  updatedAt?: DateTimeFilter;
  email?: StringFilter;
  firstName?: StringNullableFilter;
  lastName?: StringNullableFilter;
  isVip?: BooleanNullableFilter;
  birthData?: DateTimeNullableFilter;
  averageSale?: DecimalNullableFilter;
  favoriteNumber?: BigIntNullableFilter;
  geoLocation?: StringNullableFilter;
  comments?: StringNullableFilter;
  customerType?: "platinum" | "gold" | "bronze" | "regular";
  organization?: OrganizationWhereUniqueInput;
  vipOrganization?: OrganizationWhereUniqueInput;
  orders?: OrderListRelationFilter;
};
