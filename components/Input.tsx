import cn from 'clsx';
import { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { FormLabel } from './FormLabel';

interface InputProps extends TextInputProps {
  label: string;
  suffix?: React.ReactNode;
}

export function Input({ label, suffix, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <View className={cn('rounded-2xl p-1', isFocused ? 'bg-secondary-600/30' : 'bg-transparent')}>
        <View
          className={cn(
            'bg-neutral-0 overflow-hidden rounded-2xl border-[1px] flex-row items-center pl-3',
            isFocused ? 'border-secondary-600' : 'border-neutral-200',
          )}
        >
          {suffix && suffix}

          <TextInput
            className={cn('h-14 flex-1 color-primary-600 paragraph', suffix ? 'ml-3' : '')}
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
