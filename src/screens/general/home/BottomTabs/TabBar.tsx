/** @format */

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import {hasNotch} from 'react-native-device-info';
import { Icon } from 'react-native-elements';
import { cart_b, cart_b_f, g_b, g_b_f, home_b, home_b_f, offer1, order_b, order_b_f, user_b, user_b_f } from '../../../../assets/images';

import { useTranslation } from 'react-i18next';


export const TabBar = (props: any) => {
  const { state, descriptors, navigation, nav } = props;


  let tabIconColor = 'grey';
  let selectedTabIconColor = 'orange';
  const IconStyle = {
    Home: {
      icon: home_b,
      iconfilled: home_b_f,
      family: 'material-community',
      key: 'Home',
    },
    Orders: {
      icon: order_b,
      iconfilled: order_b_f,
      family: 'font-awesome',
      key: 'explore',
    },
    'My Courses': {
      icon: g_b_f,
      iconfilled: g_b_f,
      family: 'font-awesome',
      key: 'Courses',
    },
    Cart: {
      icon: cart_b,
      iconfilled: cart_b_f,
      family: 'feather',
      key: 'Calender',
    },
    'My Account': {
      icon: user_b,
      iconfilled: user_b_f,
      family: 'feather',
      key: 'Account',
    },
  };

  const _renderItem = (index: string, name: string, onPress: any, focused: any) => {


    const { t, i18n } = useTranslation();

    let _icon = IconStyle[name];


    // alert(nav);
    return (
      <View key={index} style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={focused ? styles.foucedStyles : styles.inactiveStyle}
          onPress={onPress}>
          {name !== 'My Courses' ? (
            <Image
              source={focused ? _icon.iconfilled : _icon.icon}
              resizeMode={'contain'}
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? '#9B0328' : '#353535',
              }}
            />
          ) : (
            <View style={{
              backgroundColor: '#fff', padding: 10
              , borderRadius: 60
              , paddingTop: Platform.OS === 'ios' ? 26 : 16,
            }}>
              <LinearGradient
                start={{ x: 0.5, y: 0.1 }}
                colors={['#CA2323', '#9B0328']}
                locations={[0.2, 1, 0.5]}
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.44,
                  shadowRadius: 10.32,
                  elevation: Platform.OS === 'android' ? Number.MAX_SAFE_INTEGER : undefined,
                  padding: 12,

                  bottom: Platform.OS === 'ios' ? 20 : 16,
                  borderWidth: Platform.OS === 'ios' ? 1 : 0,
                  borderTopWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: "#F3F3F3",
                  borderRadius: 37,
                }}>
                <Image
                  source={focused ? _icon.iconfilled : _icon.icon}
                  resizeMode={'contain'}
                  style={{
                    height: name === 'My Courses' ? 36 : 20,
                    width: name === 'My Courses' ? 36 : 20,
                  }}
                />
              </LinearGradient>
            </View>
          )
          }
          <Text
            style={{
              fontSize: 11,
              marginTop: 10,
              bottom: name === 'My Courses' ? 28 : 8,
              textAlign: 'center',
              // backgroundColor: name === 'My Courses' ? '#ffffff99' : 'null',
              fontFamily: 'Outfit',
              color: focused ? '#9B0328' : '#353535',
            }}>
            {/* {name === 'My Courses' || 'بيت' ? '' : t(name)} */}
            {t(name) !== 'My Courses' ? t(name) : ''}

          </Text>
        </TouchableOpacity >
        {/* {focused && (
          <View
            style={{
              position: 'absolute',
              bottom: name === 'My Courses' ? 14 : -7,
              width: 17,
              height: 5,
              backgroundColor: 'red',
            }}></View>
        )} */}
      </View >
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;
        // const icon = options.tabBarIcon(
        //   <MaterialCommunityIcons name="home" color={colors.p1} size={12} />,
        // );
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          route.name === 'Courses' && navigation.toggleDrawer();

          if (!isFocused && !event.defaultPrevented) {
            route.name !== 'Courses' && navigation.navigate(route.name);
          }
        };

        return _renderItem(index, label, onPress, isFocused);
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 100 : 75,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    // backgroundColor: theme.colors.themeColor,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#eee',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-start',
    elevation: Platform.OS === 'android' ? Number.MAX_SAFE_INTEGER : undefined,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  foucedStyles: {
    // marginTop: 10,
    alignItems: 'center',
    // marginHorizontal: 5,
    width: Platform.OS === 'ios' ? 69 : 69,
  },
  inactiveStyle: {
    alignItems: 'center',
    // marginHorizontal: 5,
    // padding: 3,
    width: Platform.OS === 'ios' ? 69 : 69,
  },
});
