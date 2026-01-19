import { useSignUp } from "@clerk/clerk-expo";
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
  const [confirmPassword, setConfirmPassword] = React.useState("");
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
    // TODO: Implementar registro con Google
    console.log("Google signup pressed");
  };

  const onApplePress = () => {
    // TODO: Implementar registro con Apple
    console.log("Apple signup pressed");
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 bg-violet-50">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-7xl mb-6">📧</Text>
          <Text className="text-2xl font-bold text-violet-800 mb-3">
            Verifica tu email
          </Text>
          <Text className="text-base text-slate-500 text-center leading-6">
            Enviamos un código de verificación a{"\n"}
            <Text className="text-violet-600 font-semibold">{emailAddress}</Text>
          </Text>

          <View className="w-full mt-8 mb-6">
            <TextInput
              className="bg-white rounded-2xl px-6 py-5 text-3xl font-bold text-violet-800 text-center border-2 border-violet-300 tracking-widest"
              value={code}
              placeholder="000000"
              placeholderTextColor="#94A3B8"
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          <Pressable
            className="bg-violet-600 py-5 px-12 rounded-xl items-center w-full shadow-lg shadow-violet-600/30 active:opacity-90 active:scale-[0.98]"
            onPress={onVerifyPress}
          >
            <Text className="text-white text-lg font-bold">Verificar</Text>
          </Pressable>

          <TouchableOpacity className="flex-row mt-6">
            <Text className="text-base text-slate-500">
              ¿No recibiste el código?{" "}
            </Text>
            <Text className="text-base font-bold text-violet-600">Reenviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-violet-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerClassName="flex-grow px-6 pt-12 pb-10"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-6xl mb-4">🚀</Text>
          <Text className="text-3xl font-bold text-violet-800 mb-2">
            Crear cuenta
          </Text>
          <Text className="text-base text-slate-500">
            Únete y comienza a aprender hoy
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
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor="#94A3B8"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          {/* Confirm Password */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-violet-800 ml-1">
              Confirmar contraseña
            </Text>
            <TextInput
              className="bg-white rounded-xl px-5 py-4 text-base text-slate-800"
              value={confirmPassword}
              placeholder="Repite tu contraseña"
              placeholderTextColor="#94A3B8"
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Register Button */}
          <Pressable
            className="bg-violet-600 py-5 rounded-xl items-center mt-2 shadow-lg shadow-violet-600/30 active:opacity-90 active:scale-[0.98]"
            onPress={onSignUpPress}
          >
            <Text className="text-white text-lg font-bold">Crear Cuenta</Text>
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center my-5">
            <View className="flex-1 h-px bg-slate-200" />
            <Text className="px-4 text-sm text-slate-500">
              o regístrate con
            </Text>
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

          {/* Terms */}
          <Text className="text-xs text-slate-500 text-center leading-5 mt-2">
            Al registrarte, aceptas nuestros{" "}
            <Text className="text-violet-600 font-semibold">
              Términos de Servicio
            </Text>{" "}
            y{" "}
            <Text className="text-violet-600 font-semibold">
              Política de Privacidad
            </Text>
          </Text>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-base text-slate-500">
            ¿Ya tienes una cuenta?{" "}
          </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="text-base font-bold text-violet-600">
                Inicia sesión
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
