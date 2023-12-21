import React from 'react';
import {StyleSheet} from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import {COLORS, RF} from '../../exporter';

const {AQUA_MARINE, WHITE, TOWER_GRAY} = COLORS;

const CustomSwitch = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: any;
}) => {
  return (
    <SwitchToggle
      switchOn={value}
      onPress={onValueChange}
      circleColorOff={WHITE}
      circleColorOn={WHITE}
      backgroundColorOn={AQUA_MARINE}
      backgroundColorOff={TOWER_GRAY}
      containerStyle={styles.toggleContainer}
      circleStyle={styles.toggleCircle}
    />
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: RF(45),
    height: RF(25),
    borderRadius: 20,
    padding: RF(6),
    borderWidth: 2,
    paddingLeft: RF(4),
    borderColor: WHITE,
  },
  toggleCircle: {
    height: RF(15),
    width: RF(15),
    borderRadius: 30,
  },
});

export default CustomSwitch;
