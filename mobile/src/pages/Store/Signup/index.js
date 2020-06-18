import React, { useState, useContext } from 'react';
import { Text, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../global';
import api from '../../../services/api';
import { Header } from '../../../components/Header';
import AuthContext from '../../../contexts/auth';
import { Input, InputPassword } from '../../../components/Input';
import { Button, ButtonTransparent } from '../../../components/Button';
import { Avatar } from '../../../components/Item';

import { imagePicker, uploadImage } from '../../../utils/ImagePicker';

export default function Signup(){
    
    const navigation = useNavigation();
    const { sign } = useContext(AuthContext);

    const [ image, setImage ] = useState();
    const [ avatar, setAvatar ] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alert, setAlert ] = useState();
    const [ status, setStatus ] = useState();


    const getImage = async () => {
        let picker = await imagePicker();
        setImage({ uri: picker });
    }

    async function handleSignup() {

        setStatus('loading');

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

        if(data.error) {
            setStatus();
            setAlert(data.error);
            return;
        };

        await sign({
            avatar,
            name,
            whatsapp,
            email,
            token: data
        });

        return;

    }

    function navigateToSignin() {
        navigation.navigate('Signin');
    }

    return (<>
        <SafeAreaView style={styles.container}>
            <Header title={'nova conta'}/>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.column}>
                <Text style={[styles.title,{ marginBottom: 16 }]}>Criar uma conta</Text>
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
                    name={'name'}
                    placeholder={'Pizzaria do João'}
                    action={e => setName(e)}
                    focus={true}
                    maxLength={30}
                    error={alert}
                />
                <Input
                    title={'Whatsapp'}
                    name={'whatsapp'}
                    placeholder={'01234567890'}
                    action={e => setWhatsapp(e)}
                    keyboard={'numeric'}
                    maxLength={11}
                    error={alert}
                />
                <Input
                    title={'Email'}
                    name={'email'}
                    placeholder={'email@email.com'}
                    action={e => setEmail(e)}
                    maxLength={30}
                    capitalize={'none'}
                    error={alert}
                />
                <InputPassword
                    title={'Senha'}
                    name={'password'}
                    placeholder={'* * * * * * * *'}
                    action={e => setPassword(e)}
                    error={alert}
                />
                <Button action={handleSignup} title={'Começar agora!'} status={status}/>
                <ButtonTransparent action={navigateToSignin} title={'Já tenho uma conta'} icon={'login'} />    
            </ScrollView>           
        </SafeAreaView>
    </>)
}