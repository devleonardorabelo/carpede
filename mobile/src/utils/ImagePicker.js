import * as ImagePicker from 'expo-image-picker';
import { API_DOMAIN } from '../constants/api';

export const imagePicker = async () => {
        
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) return;
    let result = await ImagePicker.launchImageLibraryAsync();
    if(result.cancelled) return;
    if(result.type !== 'image') return
    return result.uri;

};

export const cameraPicker = async () => {
        
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) return;
    let result = await ImagePicker.launchCameraAsync();
    if(result.cancelled) return;
    return result.uri;

};

export const uploadImage = async (file) => {

    const body = new FormData();

    body.append('fileData', {
        uri : file.uri,
        type: "image/jpg",
        name: "image.jpg",
    });

    const config = {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'multipart/form-data',
        },
        body: body,
    };
    
    let response = await fetch(`${API_DOMAIN}/upload`, config);
    
    let data = await response.json();

    return data.file;

}