import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

export class Game extends Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    };
    state = {
        selectedIds: [],
    };

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount})
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    shuffledRandomNumbers = shuffle(this.randomNumbers);

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({ 
            selectedIds: [...prevState.selectedIds, numberIndex]
        }));
    };
    gameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        if(sumSelected < this.target){
            return 'JOGANDO';
        }
        if(sumSelected === this.target){
            return 'VENCEU';
        }
        if(sumSelected > this.target){
            return 'PERDEU';
        }
    }
    render() {
        const gameStatus = this.gameStatus();
        return (
            <View style={styles.container}>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
                    {this.target}
                </Text>
                <View style={styles.randomContainer}>
                    {this.shuffledRandomNumbers.map((randomNumber, index) => (
                        <RandomNumber 
                            key={index} 
                            id={index}
                            number={randomNumber}
                            isDisabled={
                                this.isNumberSelected(index) || gameStatus !== 'JOGANDO'
                            }
                            onPress={this.selectNumber}
                        />
                    ))}
                </View>
                <View style={styles.btnContain}>
                    <TouchableOpacity onPress={this.props.onPlayAgain}>
                        <Text style={styles.btn}>Jogar</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.textBig, styles[`STATUS_${gameStatus}`]]}>{gameStatus}</Text>
                <Text style={styles.text}>A some tem que ser igual ao valor acima.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b3ffff',
        paddingTop: 100,
    },

    target: {
        fontSize: 50,
        backgroundColor: 'orange',
        marginHorizontal: 50,
        textAlign: 'center',
        borderRadius: 10,
        color: 'white',
    },

    randomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 50,
        flex: 1,
    },

    random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 30,
        marginVertical: 40,
        fontSize: 35,
        textAlign: 'center',
    },

    text: {
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#ffa500',
        color: 'white',
        margin: 1,
    },

    textBig: {
        fontSize: 30,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#ffa500',
        color: 'white',
        paddingBottom: 15,
        paddingTop: 15,
        margin: 1,
    },

    STATUS_JOGANDO: {
        backgroundColor: 'orange',
    },

    STATUS_VENCEU: {
        backgroundColor: '#00ff00',
    },

    STATUS_PERDEU: {
        backgroundColor: '#ff0000',
    },

    btn: {
        fontSize: 50,
        backgroundColor: 'green',
        marginHorizontal: 80,
        textAlign: 'center',
        borderRadius: 10,
        color: 'white',
        elevation: 8,
        paddingBottom: 10,
    },

    btnContain: {
        flex: 0.25,
    }

  });

export default Game
