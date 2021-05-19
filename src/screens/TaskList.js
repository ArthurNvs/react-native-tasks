import React, { Component } from 'react'
import { Text, ImageBackground, StyleSheet, View } from 'react-native'

//import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '../components/Task'
import LinearGradient from 'react-native-linear-gradient'


export default class TaskList extends Component {
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <LinearGradient 
                    colors={['#0099ff', '#00ccff', '#00ccff']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </LinearGradient>
                <View style={styles.taskList}>
                <Task desc='Aprender React' estimate={new Date()} done={new Date()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    
    background: {
        flex: 3,
    },
    
    taskList: {
        flex: 7,
    },
    
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    
    title: {
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    
    subtitle: {
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    }
})

//If you want to use image as background 


// <View style={styles.container}>
//     <ImageBackground 
//         source={todayImage} 
//         style={styles.background}>
//         <View style={styles.titleBar}>
//             <Text style={styles.title}>Hoje</Text>
//             <Text style={styles.subtitle}>{today}</Text>
//         </View>
//     </ImageBackground>
//     <View style={styles.taskList}>
//         <Task desc='Aprender React' estimate={new Date()} done={new Date()} />
//         <Task desc='Ler sobre Arq30' estimate={new Date()} done={null} />
//     </View>
// </View>