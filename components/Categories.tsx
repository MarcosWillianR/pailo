import { MaterialCommunityIcons } from '@expo/vector-icons';
import cn from 'clsx';
import { Text, TouchableOpacity, View } from 'react-native';

import { Type } from '@/types';

import { getCategoryIconName } from '@/lib/getCategoryIconName';
import { FormLabel } from './FormLabel';

interface CategoryItem {
  id: number;
  name: string;
  type: Type;
}

interface CategoriesProps {
  selectedType: Type;
  selectedCategoryId: number | null;
  showLabel?: boolean;
  onSelect: (categoryId: number) => void;
}

const CATEGORIES: CategoryItem[] = [
  { id: 1, name: 'Salário', type: 'income' },
  { id: 2, name: 'Trabalho extra', type: 'income' },
  { id: 3, name: 'Investimentos', type: 'income' },
  { id: 4, name: 'Aluguéis recebidos', type: 'income' },
  { id: 5, name: 'Moradia', type: 'outcome' },
  { id: 6, name: 'Contas domésticas', type: 'outcome' },
  { id: 7, name: 'Transporte', type: 'outcome' },
  { id: 8, name: 'Alimentação', type: 'outcome' },
  { id: 9, name: 'Assinatura', type: 'outcome' },
  { id: 10, name: 'Compras pessoais', type: 'outcome' },
  { id: 11, name: 'Saúde', type: 'outcome' },
  { id: 12, name: 'Lazer', type: 'outcome' },
  { id: 13, name: 'Educação', type: 'outcome' },
];

export function Categories({ selectedType, showLabel, selectedCategoryId, onSelect }: CategoriesProps) {
  return (
    <View>
      {showLabel && <FormLabel>Categoria</FormLabel>}

      <View className="flex-row flex-wrap gap-4">
        {CATEGORIES.filter((c) => c.type === selectedType).map((category, idx) => {
          const isSelected = selectedCategoryId === null ? idx === 0 : selectedCategoryId === category.id;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onSelect(category.id)}
              key={category.id}
              className={cn(
                'flex-row items-center overflow-hidden rounded-2xl border-[1px] h-14 px-4',
                isSelected ? 'bg-primary-600 border-primary-800' : 'bg-neutral-0 border-neutral-200',
              )}
            >
              <MaterialCommunityIcons
                name={getCategoryIconName(category.id)}
                size={20}
                className="mr-2"
                color={isSelected ? '#FFFFFF' : '#000000'}
              />
              <Text className={cn('paragraph', isSelected ? 'text-neutral-0' : 'text-neutral-1000')}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
