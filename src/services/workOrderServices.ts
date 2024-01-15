import { internalFetch } from "./fetchHelper";
import { IPagedCollection, IWorkOrder } from "./interfaces";

export const getWorkOrders = async (
  abortController: AbortController,
  pageSize: number,
  pageNo: number
): Promise<IPagedCollection<IWorkOrder>> => {
  return internalFetch(
    `${process.env.REACT_APP_BACKEND_API_URL}/p/workOrders?pageSize=${pageSize}&pageNo=${pageNo}&code=${process.env.REACT_APP_BACKEND_API_KEY}`,
    "GET",
    abortController
  );
};
