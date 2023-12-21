import React, { useEffect } from 'react';
import {
    View,
    Image,
    StatusBar,
} from 'react-native';
// import {splashBG, textLogo} from '../../assets';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { bellIconImg, splash } from '../../../assets/images';
import FastImage from 'react-native-fast-image';

const Splash = (props: any) => {
    const navigation = useNavigation();

    console.log(props, 'props');

    //redux

    // const {isLoggedIn} = useSelector(state => state.auth);

    useEffect(() => {
        // props.navigation.navigate('onboarding');
        setTimeout(() => {
            props.navigation.navigate('onboarding');
        }, 2000);
    }, []);

    const { main, bgImage } = styles;
    return (
        <View style={main}>
            <StatusBar hidden />
            <FastImage resizeMode={'cover'} style={bgImage} source={splash} />
        </View>
    );
};

export default Splash;
