import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

// Colores principales de la app
const COLORS = {
  primary: "#7C3AED",
  white: "#FFFFFF",
  background: "#F5F3FF",
};

export default function SplashScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    const timer = setTimeout(() => {
      if (!isSignedIn) {
        router.replace("/(auth)/welcome");
      } else {
        router.replace("/(main)/home");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn]);

  return (
    <ThemedView style={styles.container} lightColor={COLORS.background}>
      {/* Logo */}
      <ThemedView style={styles.logoContainer} lightColor={COLORS.white}>
        <ThemedText style={styles.logoEmoji}>📚</ThemedText>
      </ThemedView>

      {/* Nombre de la app */}
      <ThemedText style={styles.title} lightColor={COLORS.primary}>
        LearnHub
      </ThemedText>

      {/* Spinner */}
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={styles.spinner}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
  },
  spinner: {
    marginTop: 20,
  },
});
