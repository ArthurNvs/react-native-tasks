//Stateless components are better as function components
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>

            </View>
            <View>
                <Text style={styles.task}>{props.desc}</Text>
                <Text style={styles.task}>{props.estimate + ''}</Text>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },

    checkContainer: {
        width: '20%',

    }
})