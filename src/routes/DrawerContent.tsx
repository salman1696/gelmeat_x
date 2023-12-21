/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import { ListItem, Divider, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/routers';
import { ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { setUser } from '../shared/exporter';

const DrawerContent = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const { t } =
  //redux
  const dispatch = useDispatch();

  const onPress = (item) => {
    switch (item) {
      case 'Recurring':
        navigation.navigate('RecurringScreen');
        break;
      case 'My Profile':
        navigation.navigate('PreferenceScreen');
        break;
      case 'Setting Screen':
        navigation.navigate('SettingNewScreen');
        break;
      case 'Send Feedback':
        navigation.navigate('SendFeedBackScreen');
        break;
      // case 'Setting':
      //   props.navigation.navigate('Setting');
      //   break;
      case 'Support':
        navigation.navigate('ContactSupportScreen');
        // alert("Hello")
        break;
      case 'FAQ':
        navigation.navigate('FAQScreen');
        // alert("Hello")
        break;
      case 'Logout':

        dispatch(setUser(null))
        navigation.navigate('onboarding');

        break;
      default:
        return;
    }
  };



  return (
    <View style={styles.main}>
      {/* <ImageBackground style={styles.drawerBg} source={}> */}
      <SafeAreaView style={{ width: 80, top: 12 }}>
        <View style={styles.body}>
          {/* <Item
      icon={
       <Icon name={"home"} type={"ant-design"} size={18} color={colors.p2} />
      }
      title={"Home"}
      onPress={() => onPress("Home")}
     /> */}
          <Item
            icon={<Icon
              name={'md-options'}
              type={'ionicon'}
              size={18}
              color={"#fff"} />}
            title={'Recurring options'}
            onPress={() => onPress('Recurring')} isLoading={undefined} />
          <Item
            title={'Preferences'}
            icon={<Icon
              name={'user'}
              type={'ant-design'}
              size={18}
              color={"#fff"} />}
            onPress={() => onPress('My Profile')} isLoading={undefined} />

          <Item
            icon={<Icon
              name={'setting'}
              type={'ant-design'}
              size={18}
              color={"#fff"} />}
            title={'Settings'}
            onPress={() => onPress('Setting Screen')} isLoading={undefined} />

          <Item
            title={'Send Feedback'}
            icon={<Icon
              name={'message-text-outline'}
              type={'material-community'}
              size={18}
              color={"#fff"} />}
            onPress={() => onPress('Send Feedback')} isLoading={undefined} />
          <Item
            title={'FAQ'}
            icon={<Icon
              name={'questioncircleo'}
              type={'ant-design'}
              size={18}
              color={"#fff"} />}
            onPress={() => onPress('FAQ')} isLoading={undefined} />
          <Item
            title={'Contact support'}
            icon={<Icon
              name={'headphones'}
              type={'feather'}
              size={18}
              color={"#fff"} />}
            onPress={() => onPress('Support')} isLoading={undefined}          // isLoading={isLoading}
          />
          <Item
            title={'Log out'}
            icon={
              <Icon
                name={'poweroff'}
                type={'ant-design'}
                size={18}
                color={"#fff"}
              />
            }
            isLoading={loading}
            onPress={() => onPress('Logout')}
          // isLoading={isLoading}t
          />
        </View>
      </SafeAreaView>
      {/* </ImageBackground> */}
    </View >
  );
};

const Item = ({ title, icon, onPress, isLoading }) => (
  <TouchableOpacity onPress={onPress}>
    <ListItem
      underlayColor={'transparent'}
      activeOpacity={0.2}
      containerStyle={{ backgroundColor: 'transparent', padding: 14 }}>
      {icon}
      <ListItem.Content>
        <ListItem.Title
          style={{
            color: "#fff",
            fontSize: 15,
            fontFamily: 'Outfit',
          }}>
          {title}
        </ListItem.Title>
      </ListItem.Content>
      {isLoading ? <ActivityIndicator /> : <ListItem.Chevron />}
    </ListItem>
    <View
      style={{
        // opacity: '40%',
        backgroundColor: '#65B4CE75',
        width: '100%',
        height: 0.3,
      }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'red',
  },
  drawerBg: {
    width: '95%',
    height: '100%',
    tintColor: '#707070',
  },
  containerStyle: {
    backgroundColor: 'transparent',
  },
  body: {
    top: 20,
    backgroundColor: "red",
  },
});

export default DrawerContent;
