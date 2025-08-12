import { Canvas, SkFont, Text } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

interface AnimatedTextProps {
  font: SkFont;
  selectedValue: SharedValue<number>;
}

export function AnimatedText({ font, selectedValue }: AnimatedTextProps) {
  const { width } = useWindowDimensions();
  const MARGIN_VERTICAL = 10;

  const animatedText = useDerivedValue(() => {
    return new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(selectedValue.value);
  });

  const fontSize = font.measureText('0');

  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(animatedText.value);
    return width / 2 - _fontSize.width / 2;
  });

  return (
    <Canvas style={{ height: fontSize.height + MARGIN_VERTICAL }}>
      <Text font={font} text={animatedText} color="#000000" x={textX} y={fontSize.height + MARGIN_VERTICAL / 2} />
    </Canvas>
  );
}
