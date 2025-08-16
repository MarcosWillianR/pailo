import { MaterialCommunityIcons } from '@expo/vector-icons';
import cn from 'clsx';
import { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { FormLabel } from './FormLabel';

interface InputProps extends TextInputProps {
  label: string;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  inputContainerClassName?: string;
}

export function Input({ label, iconName, inputContainerClassName, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={inputContainerClassName}>
      <FormLabel>{label}</FormLabel>
      <View className={cn('rounded-2xl p-1', isFocused ? 'bg-secondary-600/30' : 'bg-transparent')}>
        <View
          className={cn(
            'bg-neutral-0 overflow-hidden rounded-2xl border-[1px] flex-row items-center pl-3',
            isFocused ? 'border-secondary-600' : 'border-neutral-200',
          )}
        >
          {iconName && <MaterialCommunityIcons name={iconName} size={20} color={isFocused ? '#65D4E1' : '#9AA6BC'} />}

          <TextInput
            placeholder={label}
            {...rest}
            className={cn('h-14 flex-1 color-primary-600 paragraph', iconName ? 'ml-3' : '')}
            placeholderTextColor="#9AA6BC"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>
    </View>
  );
}
