import { getChaptersByCourseId, getCourseBySlug } from "@/api/sanity";
import { ChapterProps } from "@/types/chapter";
import { CourseProps } from "@/types/course";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function ChapterCard({ chapter, onPress, index }: { chapter: ChapterProps; onPress: () => void; index: number }) {
  return (
    <Pressable
      className="bg-white rounded-xl p-4 border border-gray-200 active:bg-gray-50"
      onPress={onPress}
    >
      <View className="flex-row items-start gap-3">
        <View className="w-8 h-8 bg-violet-100 rounded-full items-center justify-center flex-shrink-0">
          <Text className="text-violet-600 text-sm font-semibold">{index + 1}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900 mb-1">
            {chapter.titulo}
          </Text>
          {chapter.descripcion && (
            <Text className="text-sm text-gray-500 mb-2" numberOfLines={2}>
              {chapter.descripcion}
            </Text>
          )}
          <View className="flex-row items-center gap-2">
            <Ionicons name="play-circle-outline" size={16} color="#7C3AED" />
            <Text className="text-xs text-violet-600 font-medium">Ver video</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </Pressable>
  );
}

export default function CourseDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<CourseProps | null>(null);
  const [chapters, setChapters] = useState<ChapterProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userIsSubscribed, setUserIsSubscribed] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchCourseData();
    }
  }, [slug]);

  const fetchCourseData = async () => {
    try {
      setIsLoading(true);
      const courseData = await getCourseBySlug(slug);
      if (courseData) {
        setCourse(courseData);
        const chaptersData = await getChaptersByCourseId(courseData._id);
        setChapters(chaptersData);
      } else {
        Alert.alert("Error", "No se encontró el curso");
        router.back();
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      Alert.alert("Error", "Error al cargar el curso");
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  const handleChapterPress = (chapter: ChapterProps) => {
    console.log("Chapter pressed:", chapter.titulo);
    // TODO: Implementar navegación al video del capítulo
  };

  const handleEnrollPress = () => {
    if (course?.tipo === 'gratis') {
      console.log("Enrolling in free course");
      // TODO: Implementar inscripción al curso gratis
      Alert.alert("¡Éxito!", "Te has inscrito al curso gratis");
    } else {
      console.log("Premium course - checking subscription");
      // TODO: Verificar suscripción del usuario
      Alert.alert("Suscripción requerida", "Este curso requiere una suscripción premium");
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text className="text-gray-500 mt-4">Cargando curso...</Text>
      </View>
    );
  }

  if (!course) {
    return null;
  }

  const canAccessCourse = course.tipo === 'gratis' || userIsSubscribed;

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View className="relative h-64 bg-gray-200">
          {course.thumbnail && (
            <Image
              source={{ uri: course.thumbnail.asset.url }}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
          {/* Back Button */}
          <TouchableOpacity
            className="absolute top-14 left-4 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          {/* Type Badge */}
          <View className="absolute top-14 right-4">
            {course.tipo === 'gratis' ? (
              <View className="bg-green-500 px-4 py-2 rounded-full">
                <Text className="text-white text-sm font-semibold">Gratis</Text>
              </View>
            ) : (
              <View className="bg-violet-600 px-4 py-2 rounded-full">
                <Text className="text-white text-sm font-semibold">Premium</Text>
              </View>
            )}
          </View>
        </View>

        {/* Course Info */}
        <View className="px-6 py-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">{course.titulo}</Text>
          {course.descripcion && (
            <Text className="text-base text-gray-600 mb-4">{course.descripcion}</Text>
          )}

          {/* Course Stats */}
          <View className="flex-row gap-6 mb-6">
            {course.duracion && (
              <View className="flex-row items-center gap-2">
                <Ionicons name="time-outline" size={20} color="#7C3AED" />
                <Text className="text-sm text-gray-600">{course.duracion}</Text>
              </View>
            )}
            {course.capitulos && (
              <View className="flex-row items-center gap-2">
                <Ionicons name="list-outline" size={20} color="#7C3AED" />
                <Text className="text-sm text-gray-600">{course.capitulos.length} capítulos</Text>
              </View>
            )}
          </View>

          {/* Lock Notice for Premium Courses */}
          {!canAccessCourse && (
            <View className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-6">
              <View className="flex-row items-center gap-3">
                <Ionicons name="lock-closed" size={24} color="#7C3AED" />
                <View className="flex-1">
                  <Text className="text-base font-semibold text-violet-900">
                    Contenido exclusivo
                  </Text>
                  <Text className="text-sm text-violet-700">
                    Este curso requiere una suscripción premium
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Enroll Button */}
          {!userIsSubscribed && (
            <Pressable
              className={`py-4 rounded-xl items-center mb-6 ${
                course.tipo === 'gratis' ? 'bg-violet-600 active:bg-violet-700' : 'bg-violet-600 opacity-80'
              }`}
              onPress={handleEnrollPress}
            >
              <Text className="text-white text-base font-semibold">
                {course.tipo === 'gratis' ? 'Inscribirme gratis' : 'Suscribirse ahora'}
              </Text>
            </Pressable>
          )}

          {/* Chapters */}
          {chapters.length > 0 && (
            <View>
              <Text className="text-lg font-semibold text-gray-900 mb-4">Capítulos</Text>
              <View className="gap-3">
                {chapters.map((chapter, index) => (
                  <ChapterCard
                    key={chapter._id}
                    chapter={chapter}
                    index={index}
                    onPress={() => handleChapterPress(chapter)}
                  />
                ))}
              </View>
            </View>
          )}

          {chapters.length === 0 && (
            <View className="flex-1 items-center justify-center py-12">
              <Ionicons name="list-outline" size={64} color="#D1D5DB" />
              <Text className="text-lg font-semibold text-gray-700 mt-4">
                No hay capítulos disponibles
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}