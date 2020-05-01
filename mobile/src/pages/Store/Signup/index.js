import React, { useState } from 'react';
import { Text, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../global';
import api from '../../../services/api';
import Header from '../../../components/Header';
import Alert from '../../../components/Alert'; 
import { Input, InputPassword } from '../../../components/Input';
import { Button, ButtonTransparent } from '../../../components/Button';
import { Avatar } from '../../../components/Item';

import { imagePicker, uploadImage } from '../../../utils/ImagePicker';

export default function Signup(){
    
    const navigation = useNavigation();

    const [ image, setImage ] = useState();
    const [ avatar, setAvatar ] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);
    const [ alert, setAlert ] = useState('');
    const [ done, setDone ] = useState(false);


    const getImage = async () => {
        let picker = await imagePicker();
        setImage({ uri: picker });
    }

    async function handleSignup() {

        setDone(true);

        if(image) {
            let fileName = await uploadImage(image);
            setAvatar(fileName);
        }

        const { data } = await api.post('signup', {
            avatar,
            name,
            whatsapp,
            email,
            password
        });

        if(data.error !== undefined) {
            setDone(false);
            setAlert(data.error);
            setAlertShow(true);

            return setTimeout(() => {
                setAlertShow(false);
            }, 3000)

        };

        const store = data;
        await saveUser(store);

    }

    async function saveUser(store) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('@Carpede:storeToken', store);
        setDone(false);
        return navigation.navigate('StorePanel');
    }

    function navigateToSignin() {
        navigation.navigate('StoreSignin');
    }

    return (<>
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Criar uma conta</Text>
                <Avatar
                    image={image}
                    title={name}
                    subtitle={whatsapp}
                    icon={'image'}
                    action={getImage}
                    transparent={image}
                    isChangeable
                />
                <Input
                    title={'Nome da Loja'}
                    placeholder={'Pizzaria do João'}
                    action={e => setName(e)}
                    focus={true}
                    maxLength={30}
                />
                <Input
                    title={'Whatsapp'}
                    placeholder={'01234567890'}
                    action={e => setWhatsapp(e)}
                    keyboard={'numeric'}
                    maxLength={11}
                />
                <Input
                    title={'Email'}
                    placeholder={'email@email.com'}
                    action={e => setEmail(e)}
                    maxLength={30}
                    capitalize={'none'}
                />
                <InputPassword
                    title={'Senha'}
                    placeholder={'* * * * * * * *'}
                    action={e => setPassword(e)}
                />
                <Button action={handleSignup} title={'Começar agora!'} done={done}/>
                <ButtonTransparent action={navigateToSignin} title={'Já tenho uma conta'} icon={'log-in'} />    
            </ScrollView>           
        </SafeAreaView>
        <Alert show={alertShow} alert={alert}/>
    </>)
}