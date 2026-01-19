import { useSignUp } from "@clerk/clerk-expo";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import {
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

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
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
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
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
          <Text className="text-lg font-semibold">Verificar email</Text>
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
            className="bg-gray-900 py-4 rounded-lg items-center mt-6 active:opacity-90"
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
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Crear cuenta</Text>
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
            <Text className="text-sm font-medium text-gray-700">Email</Text>
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
            <Text className="text-sm font-medium text-gray-700">Contraseña</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
              value={password}
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          {/* Register Button */}
          <Pressable
            className="bg-gray-900 py-4 rounded-lg items-center active:opacity-90"
            onPress={onSignUpPress}
          >
            <Text className="text-white text-base font-semibold">
              Crear cuenta
            </Text>
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
              className="flex-row items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 active:bg-gray-50"
              onPress={onApplePress}
            >
              <Ionicons name="logo-apple" size={20} color="#000" />
              <Text className="text-base font-medium">
                Continuar con Apple
              </Text>
            </Pressable>

            <Pressable
              className="flex-row items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 active:bg-gray-50"
              onPress={onGooglePress}
            >
              <AntDesign name="google" size={18} color="#4285F4" />
              <Text className="text-base font-medium">
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
