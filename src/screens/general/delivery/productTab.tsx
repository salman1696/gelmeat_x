/** @format */

import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';


export const TabBar = (props: any) => {
  const { state, descriptors, navigation, nav, data } = props;
  const [menuClick, setMenuClick] = useState(false);
  const { rItems, cartItems } = useSelector((state: any) => state.root.user);
  const scrollRef = React.useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTo({ x: state.index * 220, y: 0, animated: true })
  })


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
          <Image
            style={[
              {
                borderRadius: RF(50),
                borderWidth: RF(1),
                borderColor: "#ffffff",
                marginRight: RF(6),
              },
              { width: RF(focused ? 34 : 30), height: RF(focused ? 33 : 29) },
            ]}
            source={{
              uri: rItems?.filter((item: any) => item.title === name)[0]?.img_url,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              paddingHorizontal: 6,
              paddingEnd: 10,
              textAlign: 'center',
              fontFamily: "Outfit",
              fontWeight: "600",
              color: focused ? '#FFF' : '#6d6d6d',
            }}>
            {name}
          </Text>
        </TouchableOpacity>
        {/* {focused && (
          <View
            style={{
              position: 'absolute',
              bottom: -1,
              width: 49,
              height: 4,
              backgroundColor: '#353535',
            }}></View>
        )} */}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={list => scrollRef.current = list} showsVerticalScrollIndicator={false}
        horizontal={true} showsHorizontalScrollIndicator={false}>
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
    height: 70,
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
    flexDirection: 'row',
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#9D2731',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: RF(5),
  },
  inactiveStyle: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    alignItems: 'center',
    marginHorizontal: 3,
  },
});
