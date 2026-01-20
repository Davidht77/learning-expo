import SettingsMenuTailwind from "@/components/ui/settings-modal";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-14 pb-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Image source={{ uri: user?.imageUrl }} className="w-12 h-12 rounded-full" />
            <View>
              <Text className="text-sm text-gray-500">Bienvenido,</Text>
              <Text className="text-xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setShowSettings(true)}
            className="p-2"
          >
            <Ionicons name="settings-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerClassName="px-6 pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Acciones rápidas
        </Text>

        <View className="gap-3">
          <Pressable
            className="flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl active:bg-gray-100"
            onPress={() => router.push("/(main)/courses")}
          >
            <View className="w-12 h-12 bg-violet-100 rounded-full items-center justify-center">
              <Ionicons name="book-outline" size={24} color="#7C3AED" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900">
                Mis Cursos
              </Text>
              <Text className="text-sm text-gray-500">
                Ver todos tus cursos
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>

          <Pressable
            className="flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl active:bg-gray-100"
          >
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
              <Ionicons name="settings-outline" size={24} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900">
                Configuración
              </Text>
              <Text className="text-sm text-gray-500">
                Ajustes de tu cuenta
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>
        </View>
      </ScrollView>

      {showSettings && (
        <SettingsMenuTailwind onClose={() => setShowSettings(false)} />
      )}
    </View>
  );
}