import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { ResizableColumns as Example } from "./components/example";
import WorkOrders from "./components/WorkOrders";
import App from "./App";

export default function Root(props) {
  return (
    <section>
      {props.name} is mounted!
      <FluentProvider theme={webLightTheme}>
        {/* <Example /> */}
        {/* <WorkOrders /> */}
        <App />
      </FluentProvider>
    </section>
  );
}
