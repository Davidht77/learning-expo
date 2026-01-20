import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

// Mantener el splash screen visible mientras carga
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function MainLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Ocultar splash screen cuando el layout está listo
    SplashScreen.hideAsync();
  }, []);

  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(main)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  if (!publishableKey) {
    console.error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY");
    // Aún así renderizar para no bloquear la app
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey!}>
      <ClerkLoaded>
        <MainLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
