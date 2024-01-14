import { BrowserRouter, Route, Routes } from "react-router-dom";
import WorkOrders from "./components/WorkOrders";
import { Nav } from "./Nav";
import {
  Image,
  MessageBar,
  MessageBarBody,
  MessageBarIntent,
  MessageBarTitle,
  ProgressBar,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  makeStyles,
  teamsDarkTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import {
  PlugDisconnected24Regular,
  Alert24Regular,
  Person24Regular,
  DarkTheme24Regular,
} from "@fluentui/react-icons";
// import { useAtom, useAtomValue } from "jotai";
// import { isInProgressAtom, messageAtom } from "./atoms/messageBarAtoms";
// import { themeAtom } from "./atoms/themeAtom";

const rowStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    "> *": {
      flexGrow: 1,
    },
  },
});

const verticalStackStyle = makeStyles({
  root: {
    height: "100%",
  },
});

const Logo = () => {
  return (
    <div style={{ width: 50 }}>
      <Image
        alt="Allan's avatar"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        height={50}
        width={50}
      />
    </div>
  );
};

const toolbarStyles = makeStyles({
  toolbar: {
    justifyContent: "space-between",
  },
});

interface IFarRightMenuProps {
  onMenuItemClick: (menuItem: string) => void;
}

const FarRightMenu = (props: IFarRightMenuProps) => {
  const farGroupStyles = toolbarStyles();
  return (
    <div>
      <Toolbar
        aria-label="with Separate Groups"
        // {...props}
        className={farGroupStyles.toolbar}
      >
        <ToolbarGroup role="presentation"></ToolbarGroup>
        <ToolbarGroup role="presentation">
          <ToolbarButton
            aria-label="Connection"
            icon={<PlugDisconnected24Regular />}
          />
          <ToolbarButton aria-label="Notifications" icon={<Alert24Regular />} />
          <ToolbarButton aria-label="Profile" icon={<Person24Regular />} />
          <ToolbarButton
            aria-label="Dark/Light mode"
            icon={<DarkTheme24Regular />}
            onClick={() =>
              props.onMenuItemClick && props.onMenuItemClick("DarkLightMode")
            }
          />
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
};

export interface IMessage {
  message: string;
  messageType: MessageBarIntent;
}

const MessageArea = () => {
  // const messageBar = useAtomValue(messageAtom);
  const messageBar: IMessage = {
    message: "Info",
    messageType: "info",
  };

  return messageBar.message ? (
    <MessageBar key={messageBar.messageType} intent={messageBar.messageType}>
      <MessageBarBody>
        <MessageBarTitle>{messageBar.messageType}</MessageBarTitle>
        {messageBar.message}
      </MessageBarBody>
    </MessageBar>
  ) : (
    <></>
  );
};

const App = () => {
  const rowClasses = rowStyles();
  const verticalStackClass = verticalStackStyle();
  // const [theme, setTheme] = useAtom(themeAtom);
  // const isInProgress = useAtomValue(isInProgressAtom);

  return (
    <>
      <BrowserRouter basename="/">
        <div className={rowClasses.root}>
          <Logo />
          <FarRightMenu
            onMenuItemClick={(menuItemClicked: string) => {
              // if (menuItemClicked === "DarkLightMode") {
              //   setTheme(
              //     theme === teamsDarkTheme ? teamsLightTheme : teamsDarkTheme
              //   );
              // }
            }}
          />
        </div>
        {/* <ProgressBar value={isInProgress ? undefined : 1} /> */}
        <div className={rowClasses.root}>
          <Nav />
          <div className={verticalStackClass.root}>
            <MessageArea />
            <Routes>
              <Route path="/workorders" element={<WorkOrders />} />
            </Routes>{" "}
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
