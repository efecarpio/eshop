/* eslint-disable require-jsdoc */
import { IPaginateRequest } from "src/product/api/requests";
import { SelectQueryBuilder } from "typeorm";

const PER_PAGE = 20;
const CACHE_SG = 30*1000;

export async function paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    { query, baseUrl }: IPaginateRequest,
): Promise<{
  data: T[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  links: {};
}> {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || PER_PAGE);

  const count = await queryBuilder.cache(CACHE_SG).getCount();
  const totalPage = Math.floor(count / limit);
  const prevPage = page === 1 ? 1 : page - 1;
  const nextPage = page === totalPage ? page : page + 1;
  const offset = page > 1 ? (page - 1) * limit : 0;

  // limit - take, offset - skip
  const data = await queryBuilder
      .clone()
      .skip(offset)
      .take(limit)
      .cache(CACHE_SG)
      .getMany();

  // eslint-disable-next-line no-shadow
  const getUrlForPage = (page: any) =>
    `${baseUrl}?${new URLSearchParams({ ...query, page })}`;

  const response = { data: data, links: {} };
  response.links = {
    first: getUrlForPage(1),
    last: getUrlForPage(totalPage),
    prev: getUrlForPage(prevPage),
    next: getUrlForPage(nextPage),
  };

  return response;
}
