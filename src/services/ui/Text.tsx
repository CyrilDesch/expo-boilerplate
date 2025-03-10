import { Text as ThemedText, TextProps } from "./Themed";

export function Text(props: TextProps) {
  return (
    <ThemedText
      {...props}
      style={[props.style, { fontFamily: "space-mono" }]}
    />
  );
}
