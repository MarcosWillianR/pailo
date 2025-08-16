import { MaterialCommunityIcons } from '@expo/vector-icons';

export function getCategoryIconName(categoryId: number) {
  const availableCategories: { [key: number]: React.ComponentProps<typeof MaterialCommunityIcons>['name'] } = {
    1: 'cash-multiple',
    2: 'briefcase',
    3: 'chart-line',
    4: 'home-city',
    5: 'home',
    6: 'flash',
    7: 'bus',
    8: 'food',
    9: 'file-document-outline',
    10: 'shopping',
    11: 'heart-outline',
    12: 'movie-outline',
    13: 'school-outline',
  };
  return availableCategories[categoryId];
}
