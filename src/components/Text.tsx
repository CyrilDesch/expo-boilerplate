import { Text as RNText, TextProps } from "./Themed";

export function Text(props: TextProps) {
  return (
    <RNText {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}
