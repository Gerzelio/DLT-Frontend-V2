import { stringify } from "qs";
import { select } from "./crud";

export async function query(payload?: any) {
  let url: string;
  if (payload.profile) {
    url = "/api/beneficiary-intervention?".concat(stringify(payload));
  } else {
    url = "/api/beneficiary-intervention/byBeneficiaryId/" + payload;
  }

  const res = await select(url);
  return res;
}

export async function interventionCountQuery() {
  const url = "/api/beneficiary-intervention/countByBeneficiary";

  const res = await select(url);
  return res;
}

export async function pagedQueryByBeneficiariesIds(
  pageIndex?: any,
  pageSize?: any,
  ids?: number[]
) {
  const url = `/api/beneficiary-intervention/byBeneficiariesIds?pageIndex=${pageIndex}&pageSize=${pageSize}&params=${ids}`;
  const res = await select(url);
  return res;
}
