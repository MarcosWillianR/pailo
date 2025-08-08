import cn from "clsx";
import { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
}

export function Input({ label, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="gap-1">
      <Text className="text-neutral-800 paragraph">{label}</Text>
      <View
        className={cn(
          "rounded-2xl p-1",
          isFocused ? "bg-secondary-600/30" : "bg-transparent"
        )}
      >
        <View
          className={cn(
            "bg-neutral-0 rounded-2xl border-[1px]",
            isFocused ? "border-secondary-600" : "border-neutral-200"
          )}
        >
          <TextInput
            className="h-14 rounded-2xl p-4 color-primary-600 paragraph"
            placeholder={label}
            placeholderTextColor="#9AA6BC"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
        </View>
      </View>
    </View>
  );
}
