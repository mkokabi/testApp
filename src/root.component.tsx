import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { ResizableColumns as Example } from "./components/example";

export default function Root(props) {
  return (
    <section>
      {props.name} is mounted!
      <FluentProvider theme={webLightTheme}>
        <Example />
      </FluentProvider>
    </section>
  );
}
