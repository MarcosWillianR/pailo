import { AuthProvider } from '@/hooks/useAuth';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './global.css';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
