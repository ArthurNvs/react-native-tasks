//Stateless components are better as function components
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'

export default props => {

    const isDoneStyle = props.done != null ? { textDecorationLine: 'line-through'} : {}

    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(props.done)}
            </View>
            <View>
                <Text style={[isDoneStyle, styles.desc]}>{props.desc}</Text>
                <Text style={styles.date}>{props.estimate + ''}</Text>
            </View>
        </View>
    )
}

function getCheckView(done) {

    if(done != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#fff'/>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
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
        alignItems: 'center',
        justifyContent: 'center'

    },

    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },

    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#00b359',
        borderWidth: 1,
        borderColor: '#555',
        alignItems: 'center',
        justifyContent: 'center'
    },

    desc: {
        color: commonStyles.colors.mainText,
        fontSize: 17,
    },

    date: {
        color: commonStyles.colors.subText,
    }
})