import { Feather } from '@expo/vector-icons';
import cn from 'clsx';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Recurrency, Type } from '@/types';

import { Button } from '@/components/Button';
import { Categories } from '@/components/Categories';
import { Input } from '@/components/Input';
import { RadioGroup } from '@/components/RadioGroup';
import { normalizeCurrency, normalizeDate } from '@/lib/masks';

type TransactionTypeData = {
  onPress: () => void;
  label: string;
  isSelected: boolean;
  type: Type;
};

function TransactionType({ onPress, label, isSelected, type }: TransactionTypeData) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={cn(
        'flex-row gap-4 justify-center flex-1 p-4 rounded-2xl items-center',
        isSelected ? 'bg-neutral-0' : 'bg-neutral-100',
      )}
    >
      <Text className={cn('paragraph-semibold', isSelected ? 'text-neutral-1000' : 'text-neutral-600')}>{label}</Text>
      <Feather
        name={type === 'income' ? 'trending-up' : 'trending-down'}
        size={24}
        color={isSelected ? '#000000' : '#667899'}
      />
    </TouchableOpacity>
  );
}

export default function New() {
  const [type, setType] = useState<Type>('income');

  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recurrency, setRecurrency] = useState<Recurrency>('single');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const saveTransaction = async () => {
    console.log({ date, value, description, type });
  };

  return (
    <SafeAreaView edges={['bottom']} className="p-4 flex-1">
      <ScrollView contentContainerClassName="pb-[120px] gap-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between bg-neutral-100 p-2 rounded-2xl">
          <TransactionType
            label="Entrada"
            onPress={() => setType('income')}
            isSelected={type === 'income'}
            type="income"
          />
          <TransactionType
            label="Saída"
            onPress={() => setType('outcome')}
            isSelected={type === 'outcome'}
            type="outcome"
          />
        </View>

        <Input
          label="Nome"
          placeholder="Salário, Mercado, Remédio febre..."
          iconName="cursor-text"
          value={description}
          onChangeText={(v) => setDescription(v)}
        />

        <View className="flex-row gap-4">
          <Input
            inputContainerClassName="flex-1"
            label="Valor"
            iconName="currency-usd"
            value={value}
            onChangeText={(v) => setValue(normalizeCurrency(v))}
            keyboardType="numeric"
          />

          <Input
            inputContainerClassName="flex-1"
            label="Data"
            placeholder="dd/mm/aaaa"
            iconName="calendar"
            value={date}
            onChangeText={(v) => setDate(normalizeDate(v))}
            keyboardType="numeric"
          />
        </View>

        <Input
          label="Descrição"
          placeholder="Compra de frutas no mercado..."
          iconName="cursor-text"
          value={description}
          onChangeText={(v) => setDescription(v)}
        />

        <RadioGroup
          label="Recorrência"
          radios={[
            { label: 'Única vez', value: 'single' },
            { label: 'Mensal', value: 'monthly' },
            { label: 'Anual', value: 'yearly' },
          ]}
          onPress={(v: Recurrency) => setRecurrency(v)}
          selected={recurrency}
        />

        {recurrency !== 'single' && (
          <View className="flex-row gap-4">
            <Input
              inputContainerClassName="flex-1"
              label="Data de inicio"
              iconName="calendar"
              value={startDate}
              onChangeText={(v) => setStartDate(normalizeDate(v))}
              keyboardType="numeric"
            />

            <Input
              inputContainerClassName="flex-1"
              label="Data de fim"
              iconName="calendar"
              value={endDate}
              onChangeText={(v) => setEndDate(normalizeDate(v))}
              keyboardType="numeric"
            />
          </View>
        )}

        <Categories
          showLabel
          selectedType={type}
          selectedCategoryId={selectedCategoryId}
          onSelect={(categoryId) => setSelectedCategoryId(categoryId)}
        />
      </ScrollView>

      <Button onPress={saveTransaction}>Salvar</Button>
    </SafeAreaView>
  );
}
