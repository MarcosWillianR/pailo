import { MaterialCommunityIcons } from '@expo/vector-icons';

export function getCategoryIconName(categoryId: number) {
  const availableCategories: { [key: number]: React.ComponentProps<typeof MaterialCommunityIcons>['name'] } = {
    1: 'cash-multiple',
    2: 'wallet',
    3: 'briefcase',
    4: 'chart-line',
    5: 'home-city',
    6: 'home',
    7: 'flash',
    8: 'bus',
    9: 'food',
    10: 'file-document-outline',
    11: 'shopping',
    12: 'heart-outline',
    13: 'movie-outline',
    14: 'school-outline',
  };
  return availableCategories[categoryId];
}
