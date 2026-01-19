import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-violet-50">
      {/* Decoración superior */}
      <View className="absolute -top-28 -right-20 w-72 h-72 rounded-full bg-violet-600 opacity-15" />
      <View className="absolute top-12 -right-10 w-28 h-28 rounded-full bg-violet-400 opacity-20" />

      {/* Contenido principal */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Logo */}
        <View className="w-28 h-28 rounded-3xl items-center justify-center bg-white shadow-xl shadow-violet-500/30 mb-8">
          <Text className="text-6xl">🎓</Text>
        </View>

        {/* Título */}
        <Text className="text-4xl font-bold text-violet-600 mb-2">EduApp</Text>

        {/* Subtítulo */}
        <Text className="text-lg font-medium text-slate-500 mb-12">
          Tu plataforma de aprendizaje
        </Text>

        {/* Features */}
        <View className="flex-row justify-around w-full px-2">
          <View className="items-center gap-2">
            <View className="w-14 h-14 rounded-2xl items-center justify-center bg-violet-100">
              <Text className="text-2xl">📚</Text>
            </View>
            <Text className="text-xs font-semibold text-violet-800">
              +1000 cursos
            </Text>
          </View>

          <View className="items-center gap-2">
            <View className="w-14 h-14 rounded-2xl items-center justify-center bg-violet-100">
              <Text className="text-2xl">👨‍🏫</Text>
            </View>
            <Text className="text-xs font-semibold text-violet-800">
              Expertos
            </Text>
          </View>

          <View className="items-center gap-2">
            <View className="w-14 h-14 rounded-2xl items-center justify-center bg-violet-100">
              <Text className="text-2xl">📱</Text>
            </View>
            <Text className="text-xs font-semibold text-violet-800">
              100% móvil
            </Text>
          </View>
        </View>
      </View>

      {/* Botón de acción */}
      <View className="px-8 pb-14">
        <Pressable
          className="bg-violet-600 py-5 rounded-2xl items-center shadow-lg shadow-violet-600/40 active:opacity-90 active:scale-[0.98]"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-white text-xl font-bold">Comenzar</Text>
        </Pressable>
      </View>

      {/* Decoración inferior */}
      <View className="absolute -bottom-24 -left-14 w-52 h-52 rounded-full bg-violet-600 opacity-10" />
    </View>
  );
}
