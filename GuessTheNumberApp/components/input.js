import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const Input = (props) => {
    return <TextInput 
    {...props}
    style={[styles.input, props.style]} />
}

const styles = StyleSheet.create({
    input: {
        heigth: 30,
        borderBottomColor: 'gray',
        marginVertical: 10,
        borderBottomWidth: 1,
   }
});

export default Input