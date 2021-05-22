//Stateless components are better as function components
import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'

export default props => {

    const isDoneStyle = props.done != null ? { textDecorationLine: 'line-through'} : {}

    const date = props.done ? props.done : props.estimate
    const dateFormat = moment(date).locale('pt-br').format('dddd[,] D [de] MMMM [de] YYYY')

    const callDelete = () => props.onDelete && props.onDelete(props.id)

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
                onPress={callDelete}>
                <Icon name='trash' size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <TouchableOpacity style={styles.left}>
                <Icon name='trash' size={20} color='#FFF' style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </TouchableOpacity>
        )
    }
    
    return (
        <Swipeable 
            renderRightActions={getRightContent} 
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={callDelete}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.onToggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.done)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[isDoneStyle, styles.desc]}>{props.desc}</Text>
                    <Text style={styles.date}>{dateFormat}</Text>
                </View>
            </View>
        </Swipeable>
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
        backgroundColor: '#FFF',
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
    },

    right: {
        backgroundColor: commonStyles.colors.delete,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    left: {
        flex: 1,
        backgroundColor: commonStyles.colors.delete,
        flexDirection: 'row',
        alignItems: 'center',
    },

    excludeText: {
        color: '#FFF',
        fontSize:20,
        margin:10,
    },

    excludeIcon: {
        marginLeft: 10
    }
})