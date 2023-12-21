import React, { ReactChild } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../exporter';

interface Props {
  children: ReactChild;
  noPaddingTop: any;
  noPaddingBottom: any;
}

const Wrapper = ({ children, noPaddingTop, noPaddingBottom }: Partial<Props>) => {
  const insets = useSafeAreaInsets();
  const paddingTop = noPaddingTop ? 0 : insets.top;
  const paddingBottom = noPaddingBottom ? 0 : insets.bottom;
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View
        style={[
          styles.container,
          {
            // paddingTop,
            // paddingBottom,
          },
        ]}>
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default Wrapper;
