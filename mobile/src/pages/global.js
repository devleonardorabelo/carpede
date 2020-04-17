import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 40,
        paddingTop: Constants.statusBarHeight + 20,
    },
    containerYBetween: {
        flex:1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight + 40,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    box: {
        paddingHorizontal: 40,
    },
    navigationButton: {
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        fontFamily: 'roboto',
        color: '#585858'
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'roboto-bold',
        color: '#585858'
    },
    title: {
        fontFamily: 'paytone',
        fontSize: 32,
        lineHeight: 36,
        marginBottom: 40,
        color: '#585858'
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
        alignItems: 'center'
    },
    buttonWhiteText: {
        fontFamily: 'roboto-bold',
        fontSize: 14,
        color: '#fff'
    },
    buttonBlackText: {
        fontFamily: 'roboto-bold',
        fontSize: 14,
        color: '#585858'
    },
    groupInput: {
        marginBottom: 20,
    },
    labelInput: {
        fontSize: 14,
        fontFamily: 'roboto-bold',
        color: '#585858',
        marginBottom: 10,
    },
    textInput: {
        height: 50,
        borderStyle: "solid",
        borderColor: '#e2e2e2',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 20,
        fontSize: 14,   
        fontFamily: 'roboto'   
    },
    textareaInput: {
        height: 100,
        textAlignVertical: 'top',
        borderStyle: "solid",
        borderColor: '#e2e2e2',
        borderRadius: 8,
        borderWidth: 1,
        padding: 20,
        fontSize: 14,   
        fontFamily: 'roboto'   
    },
    action: {
        flexDirection: 'row',
        backgroundColor: '#FFFCDB',
        height: 50,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    iconAction: {
        alignSelf: 'center',
        paddingRight: 10,
    },
    textAction: {
        fontSize: 14,
        fontFamily: 'roboto-bold',
        alignSelf: 'center',
        color: '#585858'
    },
    textAlert: {
        fontSize: 14,
        fontFamily: 'roboto-bold',
        alignSelf: 'center',
        color: '#FD8369',
        marginBottom: 10,
    },
    listProducts: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    listStores: {
        flexDirection: 'column',
    },
    card: {
        width: 200,
        backgroundColor: '#FFFCDB',
        borderRadius: 8,
        marginBottom: 30,
    },
    fullCard: {
        backgroundColor: '#FFFCDB',
        borderRadius: 8,
        padding: 20,
    },
    cardImage: {
        height: 140,
        maxWidth: '100%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardBody: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullImage: {
        maxWidth: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    alertError: {
        position: 'absolute',
        top: 0,
        backgroundColor: '#FF3A4F',
        width: '100%',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight + 20,
    },
    alertText: {
        color: '#fff',
        fontFamily: 'roboto-bold',
        fontSize: 14,
        padding: 10
    }


})