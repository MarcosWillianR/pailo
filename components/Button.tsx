import cn from "clsx";
import { Pressable, PressableProps, Text } from "react-native";

interface ButtonProps extends PressableProps {
  children: string;
  type?: "primary" | "secondary";
}

export function Button({ children, type = "primary" }: ButtonProps) {
  return (
    <Pressable
      className={cn(
        "h-14 w-full rounded-xl items-center justify-center",
        type === "primary"
          ? "bg-primary-600 active:bg-primary-800"
          : "bg-secondary-600 active:bg-secondary-800"
      )}
    >
      <Text className="text-white paragraph-semibold">{children}</Text>
    </Pressable>
  );
}
