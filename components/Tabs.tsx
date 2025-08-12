import cn from 'clsx';
import { Text, TouchableOpacity, View } from 'react-native';

interface TabsProps {
  tabs: string[];
  onSelect: (tabName: string) => void;
  selectedTab: string;
}

export function Tabs({ onSelect, tabs, selectedTab }: TabsProps) {
  return (
    <View className="flex-row bg-neutral-100 p-2 mx-6 rounded-2xl">
      {tabs.map((tabName) => {
        const isSelected = selectedTab === tabName;
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            className={cn(
              'flex-1 h-14 bg-neutral-0 rounded-2xl items-center justify-center',
              isSelected ? 'bg-neutral-0' : 'bg-neutral-100',
            )}
            key={tabName}
            onPress={() => onSelect(tabName)}
          >
            <Text className={cn('tabname', isSelected ? 'text-neutral-1000' : 'text-neutral-600')}>{tabName}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
