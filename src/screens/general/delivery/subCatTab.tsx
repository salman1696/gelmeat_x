/** @format */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  Alert,
  GestureResponderEvent,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { RF } from '../../../shared/exporter';


export const SubCatTabBar = (props: any) => {
  const { state, descriptors, navigation, nav } = props;
  const [menuClick, setMenuClick] = useState(false);

  let tabIconColor = 'grey';
  let selectedTabIconColor = 'orange';

  const _renderItem = (name: any, onPress: ((event: GestureResponderEvent) => void) | undefined, focused: boolean) => {
    // alert(nav);
    return (
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 4,
          height: 50,
        }}>

        <TouchableOpacity
          style={focused ? styles.foucedStyles : styles.inactiveStyle}
          onPress={onPress}>

          <Text
            style={{
              fontSize: 18,
              paddingHorizontal: 6,
              paddingEnd: 10,
              textAlign: 'center',
              fontFamily: "Outfit",
              fontWeight: "600",
              color: focused ? '#9B0328' : '#6d6d6d',
            }}>
            {name}
          </Text>
        </TouchableOpacity>
        {focused && (
          <View style={{
            marginTop: 2,
            position: 'absolute',
            bottom: 0,
          }}>
            <View
              style={{
                marginTop: 5,
                width: 49,
                height: 3,
                backgroundColor: '#9B0328',
              }}>

            </View>
            <Icon name='chevron-down' type='material-community' size={15} color={'#9B0328'} />

          </View>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {state.routes.map((route: { name: string; key: string | number; }, index: any) => {
          // console.log(route.name, 'route');
          const { options } = descriptors[route.key];
          // console.log(options, 'route');
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            _renderItem(label, onPress, isFocused)
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    // backgroundColor: theme.colors.purpleColor,
    flexDirection: 'row',
    borderColor: '#eee',
    elevation: 5,
    padding: 5,
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(1),
  },
  foucedStyles: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: RF(5),
  },
  inactiveStyle: {
    borderRadius: 25,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 3,
  },
});
