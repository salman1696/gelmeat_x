import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    header: {
        color: '#000000',
        fontSize: 20,
        marginHorizontal: 6,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '500'

    },

    header1: {
        color: '#9D2731',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '500'
    },

    branch_heading: {
        color: '#000',
        marginLeft: 15,
        fontSize: 21,
        textAlign: 'left',
        fontFamily: 'Outfit',
        fontWeight: '600'
    },
    see_text: {
        color: '#972729',
        marginLeft: 15,
        fontSize: 15,
        marginHorizontal: 15,
        textAlign: 'left',
        fontFamily: 'Outfit',
        fontWeight: '400'
    },

    sub_total: {
        color: '#05112640',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '500'
    },

    toatl_price_text: {
        color: '#9B0328',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '500'
    },
    header_yellow: {
        color: '#000',
        fontSize: 18,
        marginVertical: 8,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '600'

    },
    header_white: {
        color: '#000',
        fontSize: 12,
        marginTop: 2,
        marginHorizontal: 2,
        paddingEnd: 80,
        textAlign: 'left',
        fontFamily: 'Outfit',
        fontWeight: '300'
    },
    red_text: {
        color: '#A90D26',
        fontSize: 13,
        marginTop: 2,
        marginVertical: 5,
        marginHorizontal: 2,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '300'
    },
    price_text: {
        color: '#000',
        fontSize: 16,
        marginTop: 2,
        textAlign: 'center',
        fontFamily: 'Outfit-Bold',
        fontWeight: '800'
    },
    sub_price_text: {
        color: '#051126',
        fontSize: 18,
        marginTop: 2,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '800'
    },
    swipe_text: {
        color: '#000',
        fontSize: 11,
        marginBottom: 10,
        marginHorizontal: 8,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '400'

    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    image: {
        flex: 1,
        padding: 95,
        marginBottom: 12,
        justifyContent: 'center',
    },
    centeredView: {
        width: '100%',
        height: '30%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalView: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#000',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default styles;
