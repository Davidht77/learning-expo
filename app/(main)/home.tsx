import SettingsMenuTailwind from "@/components/ui/settings-modal";
import { getCourses } from "@/lib/sanity";
import { CourseProps } from "@/types/course";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function CourseCard({ course, onPress }: { course: CourseProps; onPress: () => void }) {
  return (
    <Pressable
      className="bg-white rounded-xl overflow-hidden border border-gray-200 active:bg-gray-50"
      onPress={onPress}
    >
      <View className="h-40 bg-gray-200 relative">
        {course.thumbnail && (
          <Image
            source={{ uri: course.thumbnail.asset.url }}
            className="w-full h-full"
            resizeMode="cover"
          />
        )}
        <View className="absolute top-2 right-2 px-2 py-1 rounded-full">
          {course.tipo === 'gratis' ? (
            <View className="bg-green-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-semibold">Gratis</Text>
            </View>
          ) : (
            <View className="bg-violet-600 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-semibold">Premium</Text>
            </View>
          )}
        </View>
      </View>
      <View className="p-4">
        <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={1}>
          {course.titulo}
        </Text>
        {course.descripcion && (
          <Text className="text-sm text-gray-500 mb-2" numberOfLines={2}>
            {course.descripcion}
          </Text>
        )}
        <View className="flex-row items-center gap-2">
          <Ionicons name="time-outline" size={14} color="#6B7280" />
          {course.duracion && (
            <Text className="text-xs text-gray-500">{course.duracion}</Text>
          )}
          {course.capitulos && (
            <>
              <Ionicons name="list-outline" size={14} color="#6B7280" />
              <Text className="text-xs text-gray-500">{course.capitulos.length} capítulos</Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseProps[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
          (course.descripcion &&
            course.descripcion.toLowerCase().includes(searchText.toLowerCase()))
      );
      setFilteredCourses(filtered);
    }
  }, [searchText, courses]);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoursePress = (course: CourseProps) => {
    router.push(`/(main)/course-details?slug=${course.slug.current}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-14 pb-4 bg-white">
        <View className="flex-row items-center justify-between mb-4">
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

        {/* Search Bar */}
        <View className="relative">
          <Ionicons
            name="search"
            size={20}
            color="#9CA3AF"
            className="absolute left-4 top-1/2 -translate-y-1/2"
          />
          <TextInput
            className="bg-gray-100 rounded-xl px-12 py-3 text-base text-gray-900"
            placeholder="Buscar cursos..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setSearchText("")}
            >
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerClassName="px-6 pb-10 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#7C3AED" />
            <Text className="text-gray-500 mt-4">Cargando cursos...</Text>
          </View>
        ) : filteredCourses.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="book-outline" size={64} color="#D1D5DB" />
            <Text className="text-lg font-semibold text-gray-700 mt-4">
              {searchText.length > 0 ? "No se encontraron cursos" : "No hay cursos disponibles"}
            </Text>
          </View>
        ) : (
          <>
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              {searchText.length > 0 ? `Resultados (${filteredCourses.length})` : "Todos los cursos"}
            </Text>

            <View className="gap-4">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onPress={() => handleCoursePress(course)}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {showSettings && (
        <SettingsMenuTailwind onClose={() => setShowSettings(false)} />
      )}
    </View>
  );
}