import { useSignIn } from "@clerk/clerk-expo";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignInPress = async () => {
    if (!emailAddress.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (!isLoaded) return;

    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(main)/home");
      } else {
        Alert.alert("Error", "No se pudo completar el inicio de sesión.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.message || err?.message || "Error al iniciar sesión";
      Alert.alert("Error", message);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const onGooglePress = () => {
    console.log("Google login pressed");
  };

  const onApplePress = () => {
    console.log("Apple login pressed");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View className="flex-row items-center justify-center px-4 pt-14 pb-4">
        <Text className="text-lg font-semibold text-violet-600">Iniciar sesión</Text>
      </View>

      <ScrollView
        contentContainerClassName="flex-grow px-6 pb-10"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Formulario */}
        <View className="gap-5 mt-4">
          {/* Email */}
          <View className="gap-2">
            <Text className="text-sm font-medium text-violet-600">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
              autoCapitalize="none"
              keyboardType="email-address"
              value={emailAddress}
              placeholder="tu@email.com"
              placeholderTextColor="#9CA3AF"
              onChangeText={setEmailAddress}
            />
          </View>

          {/* Password */}
          <View className="gap-2">
            <Text className="text-sm font-medium text-violet-600">Contraseña</Text>
            <View className="relative">
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base pr-12"
                value={password}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                className="absolute right-4 top-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text className="text-sm text-violet-600 font-medium">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Pressable
            className={`bg-violet-600 py-4 rounded-lg items-center active:opacity-90 ${isLoading ? "opacity-70" : ""}`}
            onPress={onSignInPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-base font-semibold">
                Iniciar sesión
              </Text>
            )}
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center my-2">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="px-4 text-sm text-gray-400">o</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Buttons */}
          <View className="gap-3">
            <Pressable
              className="flex-row items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 bg-black active:opacity-80"
              onPress={onApplePress}
            >
              <Ionicons name="logo-apple" size={20} color="#fff" />
              <Text className="text-base font-medium text-white">
                Continuar con Apple
              </Text>
            </Pressable>

            <Pressable
              className="flex-row items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 bg-red-600 active:bg-red-50"
              onPress={onGooglePress}
            >
              <AntDesign name="google" size={18} color="white"/>
              <Text className="text-base font-medium text-white">
                Continuar con Google
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-auto pt-8">
          <Text className="text-xs text-gray-400 text-center leading-5">
            Al continuar, aceptas nuestros{" "}
            <Text className="text-violet-600 underline">Términos de Uso</Text> y{" "}
            <Text className="text-violet-600 underline">
              Política de Privacidad
            </Text>
          </Text>

          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-sm text-gray-500">
              ¿No tienes una cuenta?{" "}
            </Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity>
                <Text className="text-sm font-semibold text-violet-600">
                  Regístrate
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
