import React from 'react';
import {StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import {SkypeIndicator} from 'react-native-indicators';
import {COLORS, RF} from '../../exporter';

const CustomLoading = ({visible}: {visible: boolean; bgColor?: string}) => {
  return (
    <>
      <Overlay isVisible={visible} overlayStyle={styles.container}>
        <SkypeIndicator color={COLORS.WHITE} size={RF(40)} />
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export default CustomLoading;
