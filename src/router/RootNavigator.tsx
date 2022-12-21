import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import Hello from "../views/Hello";

export type RootStackParamList = {
  Hello: RootStackScreenProps<"Hello">;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        component={Hello}
        name={"Hello"}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}
