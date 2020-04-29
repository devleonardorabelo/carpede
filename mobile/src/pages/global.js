import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import Constants from 'expo-constants'

const widthDP = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: widthDP('8%'),
        paddingTop: Constants.statusBarHeight + 20,
    },
    navigationButton: {
        marginBottom: 20,
    },
    store: {
        flexDirection: 'row',
        marginBottom: 40
    },
    storeAvatar: {
        backgroundColor: '#ccc',
        width: widthDP('20%'),
        height: widthDP('20%'),
        borderRadius: 100,
    },
    textWrap: {
        flex: 1,
        flexWrap: 'wrap',
        alignSelf: 'center',
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: widthDP('7%'),
        color: '#444',
        marginBottom: 20,
    },
    grayTitle: {
        color: '#666',
        fontSize: widthDP('4.5%'),
        fontFamily: 'montserrat-medium'
    },
    subtitle: {
        fontSize: widthDP('5%'),
        marginBottom: 20,
        fontFamily: 'montserrat-bold',
        color: '#171c29'
    },
    text: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-medium',
        color: '#666'
    },
    textHide: {
        height: widthDP('5%'),
        backgroundColor: '#F6F6F6',
        borderRadius: 8
    },
    titleHide: {
        height: widthDP('8%'),
        flexGrow: 1,
        marginTop: widthDP('2%'),
        marginBottom: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 8
    },
    groupInput: {
        marginBottom: 20,
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
        height: 50,
        paddingVertical: 40
    },
    iconAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    arrowAction: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    textAction: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-semi-bold',
        color: '#333',
    },
    subtitleTextAction: {
        fontFamily: 'montserrat-light',
        fontSize: widthDP('4%'),
        marginTop: -2,
        color: '#666'
    },
    labelInput: {
        flexDirection: 'row'
    },
    labelText: {
        fontSize: widthDP('4%'),
        fontFamily: 'montserrat-semi-bold',
        color: '#333',
        marginLeft: 10,
        marginBottom: -10,
        zIndex: 9,
        paddingHorizontal: 6,
        backgroundColor: '#fff',
    },
    iconInput: {
        paddingHorizontal:15,
        paddingTop: 16
    },
    textInput: {
        height: 50,
        fontSize: widthDP('4%'),   
        fontFamily: 'montserrat-medium',
        flexGrow: 1,
        borderColor: '#e2e2e2',
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 16,
        color: '#666'
    },
    textareaInput: {
        height: 100,
        textAlignVertical: 'top',
        borderColor: '#e2e2e2',
        borderRadius: 8,
        borderWidth: 1,
        padding: 16,
        fontSize: widthDP('4%'),  
        fontFamily: 'montserrat-medium',
        color: '#666'   
    },
    button: {
        height: 50,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF5216',
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F2F2F2',
    },
    cardImage: {
        width: widthDP('25%'),
        height: '100%',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    cardBody: {
        flexDirection: 'column',
        padding: 16,
        flexGrow: 1,
    },
    cardTitle: {
        color: '#666',
        fontFamily: 'montserrat-medium',
        fontSize: widthDP('4%'),
    },
    price: {
        color: '#333',
        fontFamily: 'montserrat-semi-bold',
        fontSize: widthDP('4%'),
        marginTop: 5,
    },
    fullImage: {
        width: widthDP('100%'),
        height: widthDP('84%'),
    },
    uploadImage: {
        width: widthDP('100%'),
    },
    buttonFloat: {
        backgroundColor: '#FF5216',
        width: 64,
        height: 64,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    groupFloatButton: {
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 24
    },
    boxFloatButton: {
        position: 'absolute',
        justifyContent: 'center',
        width: widthDP('20%'),
        height: widthDP('20%'),
        alignItems: 'center'
    },
    alert: {
        position: 'absolute',
        top: 0,
        width: '100%',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight + 20,
    },


















    illustration: {
        backgroundColor: '#fff',
        marginBottom: 60,
        maxHeight: '40%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    buttonOrange: {
        height: 50,
        backgroundColor: '#FD8369',
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonGreen: {
        height: 50,
        backgroundColor: '#6FCF97',
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonWhatsapp: {
        backgroundColor: '#6FCF97',
        width: 48,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonPhone: {
        backgroundColor: '#74D5DE',
        width: 48,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTransparent: {
        height: 50,
        backgroundColor: 'transparent',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonWhiteText: {
        fontFamily: 'montserrat-semi-bold',
        fontSize: 14,
        color: '#fff'
    },
    buttonBlackText: {
        fontFamily: 'montserrat-semi-bold',
        fontSize: 14,
        color: '#585858'
    },
    textAlert: {
        fontSize: 14,
        fontFamily: 'montserrat-semi-bold',
        alignSelf: 'center',
        color: '#FD8369',
        marginBottom: 10,
    },
    listProducts: {
        marginBottom: 20,
    },
    listStores: {
        flexDirection: 'column',
    },
    alertText: {
        color: '#fff',
        fontFamily: 'montserrat-semi-bold',
        fontSize: 14,
        padding: 10
    }


})