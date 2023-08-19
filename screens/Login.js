import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './Login.styles';
import mainStyles from './main.styles';

const LoginScreen = ({ navigation }) => {
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
    })

    async function login() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('Login');
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={mainStyles.title}>Login</Text>

            {!!value.error && <View><Text style={mainStyles.error}>{value.error}</Text></View>}

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='E-mail'
                    style={mainStyles.input}
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    autoCapitalize="none"
                />
                
                <TextInput
                    placeholder='Password'
                    style={mainStyles.input}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <TouchableOpacity style={mainStyles.button} onPress={login}>
                    <Text style={mainStyles.buttonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 20,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     controls: {
//         flex: 1,
//     },

//     control: {
//         marginTop: 10
//     },

//     error: {
//         marginTop: 10,
//         padding: 10,
//         color: '#fff',
//         backgroundColor: '#D54826FF',
//     }
// });

export default LoginScreen;
