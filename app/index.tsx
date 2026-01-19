import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

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
    <View className="flex-1 items-center justify-center bg-violet-50">
      {/* Logo */}
      <View className="w-28 h-28 rounded-3xl items-center justify-center bg-white shadow-xl shadow-violet-500/30 mb-5">
        <Text className="text-6xl">📚</Text>
      </View>

      {/* Nombre de la app */}
      <Text className="text-4xl font-bold text-violet-600 mb-10">LearnHub</Text>

      {/* Spinner */}
      <ActivityIndicator size="large" color="#7C3AED" className="mt-5" />
    </View>
  );
}
