import { getAccessToken, msalInstance } from "./authHelper";

const getAuthHeader = async (): Promise<Headers> => {
  const headers = new Headers();

  const accessToken = await getAccessToken(msalInstance);

  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  return headers;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const internalFetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  abortController: AbortController,
  body?: string,
  noJsonResponse?: boolean,
  retry?: number
): Promise<any> => {
  const headers = await getAuthHeader();

  const signal = abortController?.signal;
  const options = {
    method: method,
    headers: headers,
    timeout: 3000,
    body: body,
    signal: signal,
  };

  for (let attempt = 0; attempt < (retry ?? 1); attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return Promise.resolve(response).then(
          (response) => (noJsonResponse ? response : response.json()),
          (reason: any) => {
            const errorMessage: string = reason.errorMessage || "";
            if (errorMessage.includes("AADSTS50058")) {
              throw new Error(
                "Authentication token expired, please sign in again"
              );
            }
          }
        );
      } else {
        if (attempt === retry) {
          return Promise.reject(response);
        }
        console.log(`response:${response.status} in attempt: ${attempt}`);
        if (response.status === 403) {
          return Promise.reject({
            message: "You don't have permission for this action.",
          });
        }
        await sleep(500);
      }
    } catch (error) {
      if (!signal.aborted) {
        if (attempt === retry) {
          console.log(error);
          return Promise.reject(error);
        }
        console.log(`fail in attempt: ${attempt}`);
        await sleep(500);
      }
    }
  }
};
