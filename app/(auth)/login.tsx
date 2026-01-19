import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React from "react";
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

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onGooglePress = () => {
    // TODO: Implementar login con Google
    console.log("Google login pressed");
  };

  const onApplePress = () => {
    // TODO: Implementar login con Apple
    console.log("Apple login pressed");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-violet-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerClassName="flex-grow px-6 pt-14 pb-10"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-6xl mb-4">👋</Text>
          <Text className="text-3xl font-bold text-violet-800 mb-2">
            ¡Hola de nuevo!
          </Text>
          <Text className="text-base text-slate-500">
            Inicia sesión para continuar
          </Text>
        </View>

        {/* Formulario */}
        <View className="gap-4">
          {/* Email */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-violet-800 ml-1">
              Correo electrónico
            </Text>
            <TextInput
              className="bg-white rounded-xl px-5 py-4 text-base text-slate-800"
              autoCapitalize="none"
              keyboardType="email-address"
              value={emailAddress}
              placeholder="tu@email.com"
              placeholderTextColor="#94A3B8"
              onChangeText={setEmailAddress}
            />
          </View>

          {/* Password */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-violet-800 ml-1">
              Contraseña
            </Text>
            <TextInput
              className="bg-white rounded-xl px-5 py-4 text-base text-slate-800"
              value={password}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="self-end">
            <Text className="text-sm text-violet-600 font-semibold">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Pressable
            className="bg-violet-600 py-5 rounded-xl items-center mt-2 shadow-lg shadow-violet-600/30 active:opacity-90 active:scale-[0.98]"
            onPress={onSignInPress}
          >
            <Text className="text-white text-lg font-bold">Iniciar Sesión</Text>
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-slate-200" />
            <Text className="px-4 text-sm text-slate-500">o continúa con</Text>
            <View className="flex-1 h-px bg-slate-200" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row gap-3">
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white py-4 rounded-xl border border-slate-200 active:bg-slate-50"
              onPress={onGooglePress}
            >
              <Text className="text-xl font-bold text-red-500">G</Text>
              <Text className="text-base font-semibold text-slate-800">
                Google
              </Text>
            </Pressable>

            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-black py-4 rounded-xl active:opacity-90"
              onPress={onApplePress}
            >
              <Text className="text-xl text-white"></Text>
              <Text className="text-base font-semibold text-white">Apple</Text>
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-base text-slate-500">
            ¿No tienes una cuenta?{" "}
          </Text>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity>
              <Text className="text-base font-bold text-violet-600">
                Regístrate
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
