import { Feather } from "@expo/vector-icons";
import { Image, Pressable, PressableProps, Text } from "react-native";

interface SocialButtonProps extends PressableProps {
  socialIcon: "Apple" | "Google" | "Facebook";
  children: string;
}

export function SocialButton({
  children,
  socialIcon,
  ...rest
}: SocialButtonProps) {
  const icon = {
    Apple: require("@/assets/images/apple.png"),
    Google: require("@/assets/images/google.png"),
    Facebook: require("@/assets/images/facebook.png"),
  };

  return (
    <Pressable
      className="h-14 border-[1px] rounded-2xl p-4 flex-row items-center bg-neutral-0 active:bg-neutral-100 border-neutral-200"
      {...rest}
    >
      <Image source={icon[socialIcon]} className="w-8 h-8" />
      <Text className="ml-2 text-neutral-1000">{children}</Text>
      <Feather
        name="chevron-right"
        size={24}
        color="black"
        className="ml-auto color-neutral-1000"
      />
    </Pressable>
  );
}
