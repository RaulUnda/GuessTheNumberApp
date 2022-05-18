import {useState} from 'react'
import {StyleSheet, Text, View} from 'react-native';

import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App(){
/*
    //Promise
    const thisIsMyPromise = new Promise ((resolve, reject) => {

        setTimeout( () => {
            console.log('2 seconds later.....')
            resolve();
        },
        2000);
    })

    //console.log('thisIsMyPromise', thisIsMyPromise)
    thisIsMyPromise.then( () =>{
        console.log('I was resolved!!!!!!')
    }).catch(() => {

    } ).finally(() => {

    })
*/
    const [selectedNumber, setSelectedNumber] = useState(undefined);
    const [numberOfGuesses, setNumberOfGuesses] = useState(0)

    const gameOverHandler = (rounds) => {
        setNumberOfGuesses(rounds)
    }

    const startGameHandler = (number) => {
        setSelectedNumber(number);
    }

    const restartGame = () => {
        setNumberOfGuesses(0)
        setSelectedNumber(undefined)
    }
    let content = <StartGameScreen onStartGame={startGameHandler}/>

    if(selectedNumber && numberOfGuesses === 0) {
        content = <GameScreen selectedNumber={selectedNumber} OnGameOver={gameOverHandler}/>
    } else if (selectedNumber && numberOfGuesses > 0) {
        content = <GameOverScreen rounds={numberOfGuesses} number={selectedNumber} onGameRestart={restartGame}/>
    }

    return (
        <View style={styles.screen}>
            <Header title={"Guess the number"} />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
});