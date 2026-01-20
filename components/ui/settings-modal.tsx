import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Modal,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SettingsMenuProps {
  onClose: () => void;
}

export default function SettingsMenuTailwind({ onClose }: SettingsMenuProps) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleOption = (option: string) => {
    console.log(`Seleccionaste: ${option}`);
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/welcome");
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay: Fondo semi-transparente que detecta clicks afuera */}
      <TouchableOpacity 
        className="flex-1 bg-black/10 relative" 
        activeOpacity={1} 
        onPress={onClose}
      >
        {/* MENU CONTAINER (El cuadro blanco)
           - absolute: Para flotar
           - top-14 right-5: Posición exacta debajo del engranaje
           - w-56: Ancho fijo
           - bg-white rounded-xl shadow-lg: Estilo de tarjeta
        */}
        <View className="absolute top-16 right-5 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
          
          {/* Opción 1: Profile */}
          <TouchableOpacity 
            className="flex-row items-center px-4 py-3 active:bg-gray-50"
            onPress={() => handleOption('Profile')}
          >
            <Icon name="person-outline" size={20} color="#4B5563" /> 
            {/* text-gray-700 = #374151 */}
            <Text className="ml-3 text-base font-medium text-gray-700">Profile</Text>
          </TouchableOpacity>

          {/* Opción 2: Manage Billing */}
          <TouchableOpacity 
            className="flex-row items-center px-4 py-3 active:bg-gray-50"
            onPress={() => handleOption('Billing')}
          >
            <Icon name="wallet-outline" size={20} color="#4B5563" />
            <Text className="ml-3 text-base font-medium text-gray-700">Manage Billing</Text>
          </TouchableOpacity>

          {/* Opción 3: Logout (Rojo) */}
          <TouchableOpacity 
            className="flex-row items-center px-4 py-3 active:bg-red-50"
            onPress={handleSignOut}
          >
            {/* text-red-600 y icono rojo */}
            <Icon name="log-out-outline" size={20} color="#DC2626" />
            <Text className="ml-3 text-base font-medium text-red-600">Logout</Text>
          </TouchableOpacity>

        </View>
      </TouchableOpacity>
    </Modal>
  );
}