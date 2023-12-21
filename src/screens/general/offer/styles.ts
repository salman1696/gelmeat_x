import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    header: {
        color: '#9D2731',
        fontSize: 20,
        marginHorizontal: 8,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '500'

    },
    header_yellow: {
        color: '#FFBB0D',
        fontSize: 28,

        marginHorizontal: 8,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '500'

    },
    header_white: {
        color: '#FFBB0D',
        fontSize: 36,
        marginHorizontal: 8,
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontWeight: '500'

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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalView: {
        width: '100%',
        height: '100%',
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
