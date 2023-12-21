import React from 'react';
import { Text, TextProps } from 'react-native';
import { COLORS, FONTS, RF } from '../../exporter';

const { BOLD, MEDIUM, LIGHT, REGULAR } = FONTS;

interface Props extends TextProps {
  bold: boolean;
  size: number;
  capital: boolean;
  color: any;
  onPress: () => void;
  medium: boolean;
  light: boolean;
  italic: boolean;
  weight: any
}

const CustomText = (props: Partial<Props>) => {
  const {
    size = 12,
    color = COLORS.BLACK,
    style,
    numberOfLines = 0,
    capital = false,
    onPress,
    bold,
    medium,
    italic,
    light, weight
  } = props;
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: bold
            ? 'Outfit-Bold'
            : medium
              ? MEDIUM
              : light
                ? LIGHT
                : REGULAR,
          fontSize: RF(size),
          color,
          fontWeight: weight,
          textTransform: capital ? 'uppercase' : 'none',
        },
        style,
      ]}>
      {props.children}
    </Text>
  );
};

export default CustomText;
