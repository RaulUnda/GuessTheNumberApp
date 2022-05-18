import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {Card} from './components/Card';
import colors from './constants/colors';
import input from './components/input';
import NumberContainer from "../components/NumberContainer";
import { globalIndexes as limit } from '../constants/constants';
import { useFetchPokemon } from '../hooks/useFetchPokemon';

function StartGameScreen({onStartGame}){
    
    const {enteredValue, setEnteredValue} = useState('');
    const {confirmed, setConfirmed} = useState(false);
    const {selectedNumber, setSelectedNumber} = useState(undefined);
    const [name, setName] = useState(undefined);
    const [img, setImage] = useState(undefined);

    const numberInputHandler = input => {
        setEnteredValue(input.replace(/[^0-9]/g, ''))
    }
    
    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }
    
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= limit.MIN_INDEX || chosenNumber > limit.MAX_INDEX) return

        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        setPokemon('');
        setImage('');
    }

    const setPokemon = async () => {
        const [name, img] = await useFetchPokemon(enteredValue);
        setName(name)
        setImage(img)
    }

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = (
        <Card styles={styles.selectedContainer}>
            <Text>You Selected: </Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title='Ready to start the game?' onPress ={ () => onStartGame(selectedNumber)} />
            <View>
                <Text source={img}/>
                {img}
                <View>
                    <Text>{name}</Text>
                </View>
            </View>
        </Card>
        )
    }

    return (
        <View style={styles.screen} >
            <Card>
                <Text style={styles.title}>Select a Number</Text>
                <Input
                    style={styles.input}
                    blurOnSubmit //Android
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue} 
                />
                <View style={styles.buttonContainer} >
                    <View style={styles.button}>
                       <Button style={styles.button} 
                            title="Reset"
                            colors={Colors.secondary}
                            onPress ={resetInputHandler}/>
                    </View>
                    <View style={styles.button}>
                        <Button style={styles.button} 
                            title="Confirm"
                            colors={Colors.primary}
                            onPress ={confirmInputHandler}/>
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
    )
}

const styles = StyleSheet.create({
    selectedContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: .26,
        shadowRadius: 6,
        backgroundColor: 'white',
        elevation: 5, //Only Android
        padding: 20,
        borderRadius: 10
    },
    button: {
        width: 100,
    },
    buttonContainer:{
        flexDirection: 'row',
        flex: 1
    },
    input:{
        width: 50,
        textAlign: 'center'
    },
    backgroundContainer:{
        flex: 0,
    }
});

export default StartGameScreen