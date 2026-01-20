import GoogleSignInButton from "@/components/ui/sign-in-google";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import * as React from "react";
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

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignUpPress = async () => {

    if (!firstName.trim() || !lastName.trim() || !emailAddress.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (!isLoaded) return;

    setIsLoading(true);
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      const message = err?.errors?.[0]?.message || err?.message || "Error al registrarse";
      Alert.alert("Error", message);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(main)/home");
      } else {
        Alert.alert("Error", "La verificación del código falló. Por favor, inténtalo de nuevo.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.message || err?.message || "Error al verificar el código";
      Alert.alert("Error", message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onGooglePress = () => {
    console.log("Google signup pressed");
  };

  const onApplePress = () => {
    console.log("Apple signup pressed");
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-center px-4 pt-14 pb-4">
          <TouchableOpacity
            className="absolute left-4 top-14"
            onPress={() => setPendingVerification(false)}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-violet-600">Verificar email</Text>
        </View>

        <View className="flex-1 px-6 pt-8">
          <Text className="text-sm text-gray-500 text-center mb-6">
            Enviamos un código de verificación a{"\n"}
            <Text className="font-semibold text-gray-700">{emailAddress}</Text>
          </Text>

          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-4 text-2xl text-center font-semibold tracking-widest"
            value={code}
            placeholder="000000"
            placeholderTextColor="#9CA3AF"
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />

          <Pressable
            className="bg-violet-600 py-4 rounded-lg items-center mt-6 active:opacity-90"
            onPress={onVerifyPress}
          >
            <Text className="text-white text-base font-semibold">Verificar</Text>
          </Pressable>

          <TouchableOpacity className="mt-4">
            <Text className="text-sm text-center text-violet-600 font-medium">
              Reenviar código
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View className="flex-row items-center justify-center px-4 pt-14 pb-4">
        <TouchableOpacity
          className="absolute left-4 top-14"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-violet-600">Crear cuenta</Text>
      </View>

      <ScrollView
        contentContainerClassName="flex-grow px-6 pb-10"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Formulario */}
        <View className="gap-5 mt-4">
          {/* Nombre y Apellido */}
          <View className="flex-row gap-3">
            <View className="flex-1 gap-2">
              <Text className="text-sm font-medium text-violet-600">Nombre</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                value={firstName}
                placeholder="Juan"
                placeholderTextColor="#9CA3AF"
                onChangeText={setFirstName}
              />
            </View>
            <View className="flex-1 gap-2">
              <Text className="text-sm font-medium text-violet-600">Apellido</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                value={lastName}
                placeholder="Pérez"
                placeholderTextColor="#9CA3AF"
                onChangeText={setLastName}
              />
            </View>
          </View>

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
                placeholder="Mínimo 8 caracteres"
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

          {/* Register Button */}
          <Pressable
            className={`bg-violet-600 py-4 rounded-lg items-center active:opacity-90 ${isLoading ? "opacity-70" : ""}`}
            onPress={onSignUpPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-base font-semibold">
                Crear cuenta
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

            <GoogleSignInButton />
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
              ¿Ya tienes una cuenta?{" "}
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text className="text-sm font-semibold text-violet-600">
                  Inicia sesión
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}