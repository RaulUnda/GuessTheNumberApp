import React from "react"
import { Button, StyleSheet, Text, View} from 'react-native'
import card from '../components/Card';
import {NumberContainer} from '../components/NumberContainer';


function GameOverScreen({rouns, onGameRestart}) {
    return (
        <View style={styles.screen}>
            <card>
                <Text style={styles.title}>The game is over</Text>
                <Text style={styles.subtitle}>The number was: </Text>
                    <NumberContainer>{number}</NumberContainer>
                <Text style={styles.subtitle}>Took me: {rounds} rounds </Text>
                <Button title="Play Again? " onPress={onGameRestart}></Button>
            </card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    subtitle: {
        flex: 1,
        marginBottom: 10,
    },
});

export default GameOverScreen;