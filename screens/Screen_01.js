import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Screen_01 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../Data2/tmdticon.png')} style={styles.image} />
            <Text style={styles.title}>E-Commercial Market</Text>
            <Text style={styles.subtitle}>Empowering your digital marketplace</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen_02')}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen_03')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#55acee',
        paddingVertical: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Screen_01;
