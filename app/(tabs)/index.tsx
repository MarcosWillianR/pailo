import { Redirect } from 'expo-router';
import { useState } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { data } from '@/data/data';

import { useAuth } from '@/hooks/useAuth';

import { BalanceGraph } from '@/components/BalanceGraph';
import { Tabs } from '@/components/Tabs';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState('Dia');

  const CHART_HEIGHT = 400;
  const CHART_MARGIN = 20;
  const { width: CHART_WIDTH } = useWindowDimensions();

  if (!isAuthenticated) return <Redirect href="./welcome" />;

  return (
    <SafeAreaView className="flex-1 py-4 bg-screen">
      <Text className="title self-center mb-4">Seu saldo</Text>

      <Tabs tabs={['Dia', 'Semana', 'Mês']} onSelect={setSelectedTab} selectedTab={selectedTab} />

      <BalanceGraph data={data} chartHeight={CHART_HEIGHT} chartMargin={CHART_MARGIN} chartWidth={CHART_WIDTH} />
    </SafeAreaView>
  );
}
