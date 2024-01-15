import {
  Button,
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";
import { ResizableColumns as Example } from "./components/example";
import WorkOrders from "./components/WorkOrders";
import App from "./App";
import { MsalProvider } from "@azure/msal-react";
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
} from "@azure/msal-browser";
import { appRoles, loginRequest } from "./authConfig";
import { useState } from "react";
import { msalInstance } from "./services/authHelper";

export default function Root(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  msalInstance.initialize().then(() => {
    const accounts = msalInstance.getAllAccounts();

    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
      setIsAuthenticated(true);
      const account = accounts[0];
      msalInstance.setActiveAccount(account);
      checkAuthorization(account);
    }

    msalInstance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        msalInstance.setActiveAccount(account);
        setIsAuthenticated(true);
        checkAuthorization(account);
      }
    });
  });

  const handleSignIn = () => {
    msalInstance.loginRedirect(loginRequest).catch((e: any) => {
      console.error(e);
    });
  };

  const handleSignOut = () => {
    msalInstance.logoutRedirect();
  };

  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuthorization = (currentAccount: AccountInfo) => {
    if (
      currentAccount?.idTokenClaims &&
      currentAccount.idTokenClaims["roles"]
    ) {
      const intersection = [appRoles.Admin, appRoles.Viewer].filter(
        (role: any) => currentAccount.idTokenClaims["roles"].includes(role)
      );

      if (intersection.length > 0) {
        setIsAuthorized(true);
      }
    }
  };

  return (
    <MsalProvider instance={msalInstance}>
      <section>
        {props.name} is mounted!
        <FluentProvider theme={webLightTheme}>
          <Button appearance="primary" onClick={() => handleSignIn()}>
            Organization Sign In
          </Button>
          {/* <Example /> */}
          {/* <WorkOrders /> */}
          <App />
        </FluentProvider>
      </section>
    </MsalProvider>
  );
}
