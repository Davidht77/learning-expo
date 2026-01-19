import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Colores principales de la app (mismos que index.tsx)
const COLORS = {
  primary: "#7C3AED", // Morado principal
  primaryDark: "#5B21B6", // Morado oscuro
  primaryLight: "#A78BFA", // Morado claro
  white: "#FFFFFF",
  background: "#F5F3FF", // Fondo lavanda suave
};

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <ThemedView style={styles.container} lightColor={COLORS.background}>
      {/* Decoración superior */}
      <ThemedView style={styles.decorationTop} lightColor={COLORS.primary} />

      {/* Contenido principal */}
      <ThemedView style={styles.content} lightColor="transparent">
        {/* Logo/Icono */}
        <ThemedView style={styles.logoContainer} lightColor={COLORS.white}>
          <ThemedText style={styles.logoEmoji}>🎓</ThemedText>
        </ThemedView>

        {/* Título */}
        <ThemedText style={styles.title} lightColor={COLORS.primary}>
          ¡Bienvenido!
        </ThemedText>

        {/* Subtítulo */}
        <ThemedText style={styles.subtitle} lightColor={COLORS.primaryDark}>
          Comienza tu viaje de aprendizaje
        </ThemedText>

        {/* Descripción */}
        <ThemedText style={styles.description}>
          Accede a miles de cursos impartidos por expertos. Aprende a tu ritmo,
          donde y cuando quieras.
        </ThemedText>

        {/* Ilustración/Features */}
        <ThemedView
          style={styles.illustrationContainer}
          lightColor="transparent"
        >
          <ThemedView style={styles.illustrationItem} lightColor="transparent">
            <ThemedView
              style={styles.illustrationIcon}
              lightColor={COLORS.primaryLight}
            >
              <ThemedText style={styles.illustrationEmoji}>📱</ThemedText>
            </ThemedView>
            <ThemedText style={styles.illustrationText}>
              Aprende en cualquier dispositivo
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.illustrationItem} lightColor="transparent">
            <ThemedView
              style={styles.illustrationIcon}
              lightColor={COLORS.primaryLight}
            >
              <ThemedText style={styles.illustrationEmoji}>⏰</ThemedText>
            </ThemedView>
            <ThemedText style={styles.illustrationText}>
              A tu propio ritmo
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.illustrationItem} lightColor="transparent">
            <ThemedView
              style={styles.illustrationIcon}
              lightColor={COLORS.primaryLight}
            >
              <ThemedText style={styles.illustrationEmoji}>🌟</ThemedText>
            </ThemedView>
            <ThemedText style={styles.illustrationText}>
              Contenido de calidad
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Botones de acción */}
      <ThemedView style={styles.buttonContainer} lightColor="transparent">
        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogin}
        >
          <ThemedText style={styles.loginButtonText}>Iniciar Sesión</ThemedText>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.registerButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/(auth)/signup")}
        >
          <ThemedText style={styles.registerButtonText}>
            Crear Cuenta
          </ThemedText>
        </Pressable>

        <ThemedText style={styles.termsText}>
          Al continuar, aceptas nuestros{" "}
          <ThemedText style={styles.linkText}>Términos de Servicio</ThemedText>{" "}
          y{" "}
          <ThemedText style={styles.linkText}>
            Política de Privacidad
          </ThemedText>
        </ThemedText>
      </ThemedView>

      {/* Decoración inferior */}
      <ThemedView
        style={styles.decorationBottom}
        lightColor={COLORS.primaryLight}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  decorationTop: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.3,
  },
  decorationBottom: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.4,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 24,
  },
  logoEmoji: {
    fontSize: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: "#64748B",
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  illustrationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  illustrationItem: {
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  illustrationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationEmoji: {
    fontSize: 22,
  },
  illustrationText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#475569",
    textAlign: "center",
    paddingHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    gap: 12,
  },
  loginButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#7C3AED",
  },
  registerButtonText: {
    color: "#7C3AED",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  termsText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },
  linkText: {
    color: "#7C3AED",
    fontWeight: "500",
  },
});
