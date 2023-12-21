import { StyleSheet, Dimensions, Platform } from 'react-native';
import { RF } from '../../../shared/exporter';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        // backgroundColor:'red',
        alignSelf: 'center',
        // opacity: 0.8,
    },

});

export default styles;
