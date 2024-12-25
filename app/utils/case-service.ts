type FilterProps = {
  searchText: string;
};

type PaginationProps = {
  itemsPerPage: number;
  page: number;
};

type SortProps = {
  field: string;
  order: string;
};

type GetCaseListProps = {
  filter: FilterProps;
  pagination: PaginationProps;
  sortParameters: SortProps;
};

type CaseItem = {
  caseId: string;
  case: string;
  reference: string;
  type: string;
  subType: string;
  caseStatus: string;
  eta: string;
  description: string;
  reason: string;
};

type CaseListResponse = { results: CaseItem[] };

export async function getCaseList({
  token,
  props,
}: {
  token: string;
  props: GetCaseListProps;
}): Promise<CaseListResponse> {
  let req = await fetch('https://devtoken.neoma.co.uk/Case/GetCaseList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(props),
  });

  let data = await req.json();
  return data satisfies CaseListResponse;
}
