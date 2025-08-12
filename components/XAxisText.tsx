import { Text, useFont } from '@shopify/react-native-skia';

interface XAxisTextProps {
  x: number;
  y: number;
  text: string;
}

export function XAxisText({ text, x, y }: XAxisTextProps) {
  const font = useFont(require('@/assets/fonts/HindSiliguri-SemiBold.ttf'));

  if (!font) {
    return null;
  }

  const fontSize = font.measureText(text);

  return <Text text={text} color="#667899" font={font} x={x - fontSize.width / 2} y={y} />;
}
