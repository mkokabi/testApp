import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { ResizableColumns as Example } from "./components/example";
import WorkOrders from "./components/WorkOrders";

export default function Root(props) {
  return (
    <section>
      {props.name} is mounted!
      <FluentProvider theme={webLightTheme}>
        {/* <Example /> */}
        <WorkOrders />
      </FluentProvider>
    </section>
  );
}
