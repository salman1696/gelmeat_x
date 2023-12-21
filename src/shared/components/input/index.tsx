import React, {forwardRef} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS, FONTS, GST, RF} from '../../exporter';
import CustomText from '../customText';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';

const {COBALT, BLACK, GRAY, LIGHT_GRAY, SILVER} = COLORS;

interface InputProp extends TextInputProps {
  containerStyle: ViewStyle;
  leftIcon?: any;
  rightIcon?: any;
  error: any;
  showPassword: boolean;
  toggleShowPassword: () => void;
  iconColor: string;
}

const Input = forwardRef((props: Partial<InputProp>, ref: any) => {
  const {
    leftIcon,
    rightIcon,
    error,
    containerStyle,
    showPassword,
    value,
    toggleShowPassword,
    iconColor,
    textContentType,
    multiline,
    editable = true,
  } = props;

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.subContainer,
          containerStyle,
          multiline && styles.flexStart,
        ]}>
        {!!leftIcon && (
          <FastImage
            source={leftIcon}
            style={[styles.leftIcon, {borderColor: iconColor}]}
            resizeMode={'contain'}
            tintColor={COBALT}
          />
        )}
        <TextInput
          ref={ref}
          pointerEvents={editable ? 'auto' : 'none'}
          {...props}
          style={[styles.input, multiline && styles.multiline]}
          placeholderTextColor={LIGHT_GRAY}
        />
        {!!value && textContentType === 'password' && (
          <Pressable onPress={toggleShowPassword}>
            <FontAwesomeIcon
              name={showPassword ? 'eye' : 'eye-slash'}
              color={GRAY}
              size={RF(15)}
            />
          </Pressable>
        )}
      </View>
      {!!error && <CustomText style={GST.ERROR}>{error}</CustomText>}
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    ...GST.mb6,
  },
  title: {
    ...GST.mb1,
  },
  input: {
    flex: 1,
    paddingRight: RF(14),
    fontFamily: FONTS.ROMAN,
    color: BLACK,
    fontSize: RF(14),
    ...GST.py1,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: RF(50),
    ...GST.px5,
    backgroundColor: SILVER,
  },
  multiline: {
    height: RF(80),
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  leftIcon: {
    width: RF(18),
    height: RF(18),
    ...GST.mr3,
  },
});

export default Input;
