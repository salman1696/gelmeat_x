import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {COLORS, GST, RF} from '../../exporter';
import CustomText from '../customText';

const {WHITE, SEA_BLUE, PURPLE} = COLORS;

const PrimaryBtn = ({
  title,
  onPress,
  disabled,
  containerStyle,
  titleColor = WHITE,
  titleSize = 14,
  bgColor = PURPLE,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle | any;
  titleColor?: string;
  titleSize?: number;
  bgColor?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.primaryBtn,
        {backgroundColor: bgColor, opacity: disabled ? 0.7 : 1},
        containerStyle,
      ]}
      disabled={disabled}>
      <CustomText medium size={titleSize} color={titleColor}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryBtn: {
    borderRadius: RF(20),
    backgroundColor: SEA_BLUE,
    height: RF(40),
    alignItems: 'center',
    justifyContent: 'center',
    ...GST.mb5,
    ...GST.mx3,
    ...GST.px5,
  },
});

export default PrimaryBtn;
