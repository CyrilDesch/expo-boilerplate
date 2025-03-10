import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useLoadFonts from "./services/ui/useLoadFonts";
import ThemedNavigation from "./services/routing/components/ThemedNavigation";
import RootNavigator from "./router/RootNavigator";

export default function App() {
  const isLoadingComplete = useLoadFonts();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemedNavigation>
          <RootNavigator />
        </ThemedNavigation>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
