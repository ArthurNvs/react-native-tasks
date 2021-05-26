import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import commonStyles from '../commonStyles'

export default class Auth extends Component {
    render() {
        return (
            <LinearGradient 
                colors={[commonStyles.colors.primary, 'white', commonStyles.colors.primary]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.background} >
                <Text></Text>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        color: commonStyles.colors.secondary,
        fontSize: 65,
        marginBottom:  10,
    }
})