import cn from 'clsx';
import { Key } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FormLabel } from './FormLabel';

interface RadioItem<T> {
  value: T;
  label: string;
}

interface RadioGroupProps<T> {
  radios: RadioItem<T>[];
  onPress: (value: T) => void;
  selected: T;
  label: string;
}

export function RadioGroup<T>({ selected, onPress, radios, label }: RadioGroupProps<T>) {
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <View className="flex-row flex-wrap justify-between items-center gap-4">
        {radios.map(({ label, value }) => (
          <TouchableOpacity
            key={value as Key}
            onPress={() => onPress(value)}
            activeOpacity={0.8}
            className="min-w-[48%] flex-row items-center gap-4 bg-neutral-0 overflow-hidden rounded-2xl border-[1px] border-neutral-200 h-14 px-4"
          >
            <View
              className={cn(
                'w-7 h-7 bg-neutral-0 rounded-full',
                selected === value ? 'border-primary-600 border-[7px]' : 'border-[2px] border-neutral-200',
              )}
            />
            <Text className="paragraph">{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
