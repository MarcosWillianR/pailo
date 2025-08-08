import splashBg from "@/assets/images/splash-bg.png";
import { Button } from "@/components/Button";
import cn from "clsx";
import { BlurView } from "expo-blur";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  return (
    <>
      <ImageBackground
        source={splashBg}
        className="w-full h-full absolute"
        resizeMode="cover"
      />
      <BlurView intensity={20} tint="dark" className="absolute inset-0 z-10" />

      <SafeAreaView className="flex-1 justify-end relative z-20 p-6">
        <Text className="text-white title">De volta ao controle</Text>

        <Text className="text-white paragraph">
          Sua jornada financeira continua
        </Text>

        <View className="mt-8 mb-2">
          <Button type="secondary">Começar agora</Button>
        </View>

        <Pressable className="p-2 flex-row gap-2 items-baseline justify-center">
          {({ pressed }) => (
            <>
              <Text className="text-white paragraph">Já tem uma conta?</Text>
              <Text
                className={cn(
                  "text-secondary-600 paragraph-semibold",
                  pressed ? "text-secondary-800" : ""
                )}
              >
                Entrar
              </Text>
            </>
          )}
        </Pressable>
      </SafeAreaView>
    </>
  );
}
