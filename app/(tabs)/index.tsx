import { Redirect } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';

import { BalanceGraph } from '@/components/BalanceGraph';
import { Tabs } from '@/components/Tabs';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState('Dia');

  if (!isAuthenticated) return <Redirect href="./welcome" />;

  return (
    <SafeAreaView className="flex-1 py-4 bg-screen">
      <Text className="title self-center mb-4">Seu saldo</Text>

      <Tabs tabs={['Dia', 'Semana', 'Mês']} onSelect={setSelectedTab} selectedTab={selectedTab} />

      <BalanceGraph />
    </SafeAreaView>
  );
}
