import React, { Component } from 'react'
import { 
    Text, 
    ImageBackground, 
    StyleSheet, 
    View, 
    FlatList, 
    TouchableOpacity,
    Platform, 
    Button,
    Alert } from 'react-native'

//import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'

import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '../components/Task'
import LinearGradient from 'react-native-linear-gradient'
import AddTask from './AddTask'


export default class TaskList extends Component {

    state = {
        showDoneTasks: true,

        showAddTask:  true,

        visibleTasks: [],

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

    componentDidMount = () => {
        this.filterTasks()
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () =>  {
        let visibleTasks = null
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.done === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks: visibleTasks })
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === taskId) {
                task.done = task.done ? null : new Date()
            }
        })

        this.setState({ tasks: tasks }, this.filterTasks)
    }

    addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Hmm..', 'Faltou inserir a descriçao da sua tarefa')
            return
        }

        const tasks = [...this.state.tasks]
        
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimate: newTask.date,
            done: null
        })

        this.setState({ tasks: tasks, showAddTask: false }, this.filterTasks)
    }

    render() {
        const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <AddTask 
                    isVisible={this.state.showAddTask} 
                    onCancel={() => this.setState({ showAddTask: false} )}
                    onSave={this.addTask} />
                    <LinearGradient 
                        colors={[commonStyles.colors.primary, commonStyles.colors.today, commonStyles.colors.primary]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.background}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon 
                                    name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                    size={20} 
                                    color={commonStyles.colors.secondary} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
                            <Text style={styles.subtitle}>{today}</Text>
                        </View>
                    </LinearGradient>
                    <View style={styles.taskList}>
                    <FlatList 
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} />
                    </View>
                    <TouchableOpacity 
                        style={styles.addButton}
                        activeOpacity={0.5}
                        onPress={() => this.setState({ showAddTask:  true })} >
                        <Icon name='plus' size={20} color={commonStyles.colors.secondary} />
                    </TouchableOpacity>
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
    },

    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-start',
        marginTop: Platform.OS === 'ios' ? 60 : 30,
    },

    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
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