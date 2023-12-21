import React, {useState} from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
// import {info, menu} from '../../../assets/icons';
// import {logo} from '../../../assets/images';
import {COLORS, GST, navigate, RF, ROUTES} from '../../exporter';
// import Profile from '../profile';

interface Props {
  onLeftBtnPress?: () => void;
  onRightBtnPress?: () => void;
  hideLeftBtn?: boolean;
  hideLogo?: boolean;
  hideRightBtn?: boolean;
}

const Header = ({
  onLeftBtnPress,
  hideLeftBtn,
  hideLogo,
  hideRightBtn,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* <HeaderItem
        icon={info}
        onPress={onLeftBtnPress}
        iconStyle={styles.info}
        hide={hideLeftBtn}
        alignment={'flex-start'}
      /> */}
      {/* <HeaderItem
        icon={logo}
        disabled
        iconStyle={styles.logo}
        hide={hideLogo}
        alignment={'center'}
      /> */}
      {/* <HeaderItem
        icon={menu}
        onPress={() => navigate(ROUTES.PROFILE)}
        iconStyle={styles.menu}
        hide={hideRightBtn}
        alignment={'flex-end'}
      /> */}
    </View>
  );
};

const HeaderItem = ({
  icon,
  onPress,
  disabled,
  iconStyle,
  hide,
  alignment

}: {
  icon: any;
  onPress?: () => void;
  disabled?: boolean;
  iconStyle?: any;
  hide?: boolean;
  alignment: 'flex-start' | 'center' | 'flex-end'
}) => (
  <Pressable style={[styles.flex, {alignItems: alignment}]} disabled={disabled || hide} onPress={onPress}>
    {!hide && (
      <FastImage
        source={icon}
        style={iconStyle}
        resizeMode={'contain'}
        tintColor={COLORS.WHITE}
      />
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...GST.px5,
    ...GST.mt3,
    ...GST.mb4,
    height: RF(25),
  },
  logo: {
    width: RF(100),
    height: '100%',
  },
  info: {
    width: RF(30),
    height: '100%',
  },
  menu: {
    width: RF(30),
    height: '100%',
  },
});

export default Header;
