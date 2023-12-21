import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import FastImage, {ResizeMode, Source} from 'react-native-fast-image';
import {COLORS, RF} from '../../exporter';

const CustomAvatar = ({
  source,
  size = 15,
  resizeMode = 'cover',
  containerStyle,
  onPress,
  pressable,
}: {
  source: number | Source | any;
  size?: number;
  resizeMode?: ResizeMode;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  pressable?: boolean;
}) => {
  return (
    <Pressable disabled={!pressable} onPress={onPress}>
      <View
        style={[
          styles.container,
          {width: RF(size), height: RF(size), borderRadius: RF(size) / 2},
          containerStyle,
        ]}>
        {/* <FastImage
          source={source ? {uri: source} : userIcon}
          style={source ? styles.img : styles.placeholder}
          resizeMode={resizeMode}
        /> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '35%',
    height: '35%',
  },
  container: {
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.SILVER,
  },
});

export default CustomAvatar;
