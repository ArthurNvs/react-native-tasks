import React, { Component } from 'react'
import { Text, ImageBackground, StyleSheet, View, FlatList } from 'react-native'

//import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '../components/Task'
import LinearGradient from 'react-native-linear-gradient'


export default class TaskList extends Component {

    state = {
        tasks: [{
            id: Math.random(),
            desc: 'Comprar Livro React',
            estimate: new Date(),
            done: new Date(),
        },
        {
            id: Math.random(),
            desc: 'Fazer joguinho novo',
            estimate: new Date(),
            done: null,
        }]
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <LinearGradient 
                    colors={[commonStyles.colors.primary, '#00ccff', commonStyles.colors.primary]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </LinearGradient>
                <View style={styles.taskList}>
                <FlatList 
                    data={this.state.tasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Task {...item} />} />
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
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 30
    },
    
    title: {
        color: commonStyles.colors.secondary,
        fontSize: 65,
        marginLeft: 20,
        marginBottom: 10
    },
    
    subtitle: {
        color: commonStyles.colors.secondary,
        fontSize: 25,
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