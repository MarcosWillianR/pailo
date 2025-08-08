import splashBg from '@/assets/images/splash-bg.png';
import { BlurView } from 'expo-blur';
import { Image, ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoWhiteImg from '@/assets/images/logo-white.png';
import { SocialButton } from '@/components/SocialButton';
import { useAuth } from '@/hooks/useAuth';

export default function SplashScreen() {
  const { signIn } = useAuth();

  return (
    <>
      <ImageBackground source={splashBg} className="w-full h-full absolute" resizeMode="cover" />
      <BlurView intensity={30} tint="dark" className="absolute inset-0 z-10" />

      <SafeAreaView className="relative z-20 items-center mt-6">
        <Image source={logoWhiteImg} className="w-48 h-20 mb-4" />
      </SafeAreaView>

      <SafeAreaView className="flex-1 justify-end relative z-20 p-6">
        <Text className="text-white title">De volta ao controle</Text>

        <Text className="text-white paragraph">Sua jornada financeira continua</Text>

        <View className="mt-8 mb-2 gap-4">
          <SocialButton socialIcon="Apple" onPress={signIn}>
            Continuar com Apple
          </SocialButton>
          <SocialButton socialIcon="Google">Continuar com Google</SocialButton>
          <SocialButton socialIcon="Facebook">Continuar com Facebook</SocialButton>
        </View>
      </SafeAreaView>
    </>
  );
}
