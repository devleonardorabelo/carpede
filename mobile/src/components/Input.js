import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../pages/global';

export function Input(props) {
    return (
        <View style={styles.groupInput}>
            <View style={styles.labelInput}>
                <Text style={styles.labelText}>{props.title}</Text>
            </View>
            <TextInput
                style={styles.textInput}
                placeholder={props.placeholder}
                onChangeText={props.action}
                defaultValue={props.default}
                autoFocus={props.focus || false}
                keyboardType={props.keyboard || 'default'}
                maxLength={props.maxLength || 20}
                autoCapitalize= { props.capitalize || 'sentences' }
            />
        </View>
    )
}

export function InputPassword(props) {
    return (
        <View style={styles.groupInput}>
            <View style={styles.labelInput}>
                <Text style={styles.labelText}>{props.title}</Text>
            </View>
            <TextInput
                style={styles.textInput} 
                onChangeText={props.action}
                secureTextEntry={true}
                password={true}
                placeholder={props.placeholder}
                maxLength={20}                   
            />  
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