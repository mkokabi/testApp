export interface IPagedCollection<itemType> {
  isLastPage: boolean;
  items: itemType[];
  pageCount: number;
  pageNo: number;
  pageSize: number;
  rowsCount: number;
}

export interface IWorkOrder {
  id: number;
  issueId: number;
  code: string;
  description: string;
  status: string;
  statusId: number;
  statusDescription: string;
  createdAt: string;
  zoneId?: number;
  assetId?: number;
}
