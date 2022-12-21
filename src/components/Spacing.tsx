import React from "react";
import { View } from "react-native";

const Spacing = ({
  childrens,
  height = 1,
}: {
  childrens?: React.ReactNode;
  height?: number;
}) => <View style={{ margin: height }}>{childrens}</View>;

export default Spacing;
