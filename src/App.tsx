import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useColorScheme from "./utils/useColorScheme";
import useLoadFonts from "./utils/useLoadFonts";
import Navigation from "./router";

export default function App() {
  const isLoadingComplete = useLoadFonts();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
