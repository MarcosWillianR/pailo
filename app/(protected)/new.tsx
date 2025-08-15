import cn from 'clsx';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { RadioGroup } from '@/components/RadioGroup';
import { normalizeCurrency, normalizeDate } from '@/lib/masks';
import { Feather } from '@expo/vector-icons';

type Type = 'income' | 'outcome';
type Recurrency = 'single' | 'monthly';

type TransactionTypeData = {
  onPress: () => void;
  label: string;
  isSelected: boolean;
};

function TransactionType({ onPress, label, isSelected }: TransactionTypeData) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={cn(
        'flex-row gap-2 justify-center flex-1 p-4 rounded-2xl items-center',
        isSelected ? 'bg-neutral-0' : 'bg-neutral-100',
      )}
    >
      <Feather name="trending-up" size={24} color={isSelected ? '#000000' : '#667899'} />
      <Text className={cn('paragraph-semibold', isSelected ? 'text-neutral-1000' : 'text-neutral-600')}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function New() {
  const [type, setType] = useState<Type>('income');

  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recurrency, setRecurrency] = useState<Recurrency>('single');

  const saveTransaction = async () => {
    console.log({ date, value, description, type });
  };

  return (
    <SafeAreaView edges={['bottom']} className="p-4 flex-1">
      <ScrollView contentContainerClassName="gap-4">
        <View className="flex-row items-center justify-between bg-neutral-100 p-2 rounded-2xl">
          <TransactionType label="Entrada" onPress={() => setType('income')} isSelected={type === 'income'} />
          <TransactionType label="Saída" onPress={() => setType('outcome')} isSelected={type === 'outcome'} />
        </View>

        <Input
          label="Valor"
          suffix={<Feather name="dollar-sign" size={22} color="#9AA6BC" />}
          value={value}
          onChangeText={(v) => setValue(normalizeCurrency(v))}
          keyboardType="numeric"
        />

        <Input
          label="Data"
          suffix={<Feather name="calendar" size={22} color="#9AA6BC" />}
          value={date}
          onChangeText={(v) => setDate(normalizeDate(v))}
          keyboardType="numeric"
        />

        <Input
          label="Descrição"
          suffix={<Feather name="type" size={22} color="#9AA6BC" />}
          value={description}
          onChangeText={(v) => setDescription(v)}
        />

        <View>
          <Text className="paragraph p-1">Recorrência</Text>

          <RadioGroup
            radios={[
              { label: 'Única vez', value: 'single' },
              { label: 'Mensal', value: 'monthly' },
            ]}
            onPress={(v: Recurrency) => setRecurrency(v)}
            selected={recurrency}
          />
        </View>
      </ScrollView>

      <Button onPress={saveTransaction}>Salvar</Button>
    </SafeAreaView>
  );
}
