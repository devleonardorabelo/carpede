import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import Constants from 'expo-constants'

const widthDP = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};

export default StyleSheet.create({
    
    //STRUCTURE
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: widthDP('8%'),
        paddingTop: Constants.statusBarHeight + 20,
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
    listProducts: {
        marginBottom: 20,
    },
    listStores: {
        flexDirection: 'column',
    },
    //NAVITEM
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
    //CARD
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
    //IMAGE
    fullImage: {
        width: widthDP('100%'),
        height: widthDP('84%'),
    },
    uploadImage: {
        width: widthDP('100%'),
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
    //TEXTS AND TITLES
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
    textWrap: {
        flex: 1,
        flexWrap: 'wrap',
        alignSelf: 'center',
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
    //BUTTONS
    button: {
        height: 50,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF5216',
    },
        buttonWhiteText: {
            fontFamily: 'montserrat-semi-bold',
            fontSize: 14,
            color: '#fff'
        },
    buttonTransparent: {
        height: 50,
        backgroundColor: 'transparent',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
        buttonBlackText: {
            fontFamily: 'montserrat-semi-bold',
            fontSize: 14,
            color: '#585858'
        },
    navigationButton: {
        marginBottom: 20,
    },
    buttonFloat: {
        backgroundColor: '#FF5216',
        width: 64,
        height: 64,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //INPUTS
    groupInput: {
        marginBottom: 20,
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
    inputTextAlert: {
        fontFamily: 'montserrat-light',
        fontSize: widthDP('4%'),
        color: '#FF0000' 
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
    //MORE
    alert: {
        padding: 20,
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 2,
        backgroundColor: '#FFEEEE',
        borderColor: '#FFD1D1'
    },
    alertTitle: {
        fontFamily: 'montserrat-bold',
        fontSize: widthDP('4%'),
        color: '#533737' 
    },
    alertText: {
        fontFamily: 'montserrat-light',
        fontSize: widthDP('4%'),
        color: '#270000' 
    },
    illustration: {
        backgroundColor: '#fff',
        marginBottom: 60,
        maxHeight: '40%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
})