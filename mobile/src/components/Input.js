import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../pages/global';

export function Input(props) {

    const err = () => {
        if(!props.error) return;
        if(props.error.input == props.name) return true;
    }

    return (
        <View style={styles.groupInput}>
            <View style={styles.labelInput}>
                <Text
                    style={[styles.labelText,{
                        color: err() ? '#FF0000' : '#333'
                    }]}>
                    {props.title}
                </Text>
            </View>
            <TextInput
                style={[styles.textInput,{
                    borderColor: err() ? '#FF0000' : '#E2E2E2',
                    borderWidth: err() ? 2 : 1,
                }]}
                placeholder={props.placeholder}
                onChangeText={props.action}
                defaultValue={props.default}
                autoFocus={props.focus || false}
                keyboardType={props.keyboard || 'default'}
                maxLength={props.maxLength || 20}
                autoCapitalize= { props.capitalize || 'sentences' }
            />
            {err() ?
                <Text style={styles.inputTextAlert}>{props.error.text}</Text>
                :
                null 
            } 
        </View>
    )
}

export function InputPassword(props) {

    const err = () => {
        if(!props.error) return;
        if(props.error.input == props.name) return true;
    }

    return (
        <View style={styles.groupInput}>
            <View style={styles.labelInput}>
                <Text
                    style={[styles.labelText,{
                        color: err()  ? '#FF0000' : '#333'
                    }]}>
                    {props.title}
                </Text>
            </View>
            <TextInput
                style={[styles.textInput,{
                    borderColor: err()  ? '#FF0000' : '#E2E2E2',
                    borderWidth: err()  ? 2 : 1,
                }]}
                onChangeText={props.action}
                secureTextEntry={true}
                password={true}
                placeholder={props.placeholder}
                maxLength={20}                 
            />
            {err() ?
                <Text style={styles.inputTextAlert}>{props.error.text}</Text>
                :
                null 
            } 
        </View>
    )
}

export function TextArea(props) {
    return (
        <View style={styles.groupInput}>
            <View style={styles.labelInput}>
                <Text style={styles.labelText}>{props.title}</Text>
            </View>
            <TextInput
                multiline={true}
                numberOfLines={10}
                style={styles.textareaInput}
                defaultValue={props.default}
                onChangeText={props.action}
                placeholder={props.placeholder}
                maxLength={100}
            />
        </View>
    )
}