import { LinearGradient, Path, Skia } from '@shopify/react-native-skia';
import { SharedValue } from 'react-native-reanimated';

interface GradientProps {
  chartHeight: number;
  chartWidth: number;
  chartMargin: number;
  curvedLine: string;
  animationGradient: SharedValue<{ x: number; y: number }>;
}

export function Gradient({ chartHeight, chartMargin, chartWidth, curvedLine, animationGradient }: GradientProps) {
  const getGradient = (chartLine: string, width: number, height: number) => {
    const gradientAreaSplit = Skia.Path.MakeFromSVGString(chartLine);

    if (gradientAreaSplit) {
      gradientAreaSplit
        .lineTo(width - chartMargin, height)
        .lineTo(chartMargin, height)
        .lineTo(chartMargin, gradientAreaSplit.getPoint(0).y);
    }

    return gradientAreaSplit;
  };

  return (
    <Path path={getGradient(curvedLine!, chartWidth, chartHeight)!} color="pink">
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={animationGradient}
        colors={['rgba(101,212,225,0.3)', 'rgba(101,212,225,0)']}
      />
    </Path>
  );
}
