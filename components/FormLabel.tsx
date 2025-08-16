import { Text } from 'react-native';

interface FormLabelProps {
  children: string;
}

export function FormLabel({ children }: FormLabelProps) {
  return <Text className="form-label p-1">{children}</Text>;
}
