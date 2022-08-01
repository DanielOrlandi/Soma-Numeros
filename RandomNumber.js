import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';

export class RandomNumber extends Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
    };
    handlePress = () => {
        if(this.props.isDisabled) { return; }
        this.props.onPress(this.props.id);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={
                    [
                        styles.random, 
                        this.props.isDisabled && styles.disabled
                    ]}>
                        {this.props.number}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#00bfff',
        width: 100,
        marginHorizontal: 30,
        marginVertical: 40,
        fontSize: 35,
        textAlign: 'center',
        elevation: 8,
        borderRadius: 10,
        color: 'white',
    },

    disabled: {
        opacity: 0.3,
    }
})

export default RandomNumber