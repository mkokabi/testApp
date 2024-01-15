import {
  IPublicClientApplication,
  PublicClientApplication,
} from "@azure/msal-browser";
import { protectedResources, msalConfig } from "../authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

export async function getAccessToken(
  instance: IPublicClientApplication
): Promise<string> {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const request = {
    ...protectedResources.assetApi,
    account: account,
  };
  const response = await instance.acquireTokenSilent(request);
  return response.accessToken;
}

export const getAuthHeader = async (): Promise<Headers> => {
  const headers = new Headers();

  const accessToken = await getAccessToken(msalInstance);

  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  return headers;
};
