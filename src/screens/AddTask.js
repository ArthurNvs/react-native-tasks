import React, { Component } from 'react'
import { 
    Modal, 
    StyleSheet, 
    View, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Text, 
    Platform, 
    Button} from 'react-native'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import commonStyles from '../commonStyles'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        // if (this.props.onSave) {
        //     this.props.onSave(newTask)
        // }

        //check if props.onSave has been sent and send newTask with current state
        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...initialState})
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker
                            value={this.state.date}
                            is24Hour={true}
                            display= 'default'
                            onChange={(_, date) => this.setState({ date: date, showDatePicker: false })}
                            mode='date'
                            locale='pt-br' />

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM  [de] YYYY')

        if(Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    render() {
        return (
            <Modal 
                transparent={true} 
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text  style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} 
                        placeholder='Descreva a tarefa...'
                        onChangeText={desc => this.setState({ desc: desc })}
                        value={this.state.desc} />
                            <View style={{marginLeft: 110}}>{this.getDatePicker()}</View>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        fontSize: 21,
        fontWeight: 'bold',
        backgroundColor: '#737373',
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15
    },
    input: {
        height: 40,
        fontSize: 19,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        fontWeight: '500',
        margin: 20,
        marginRight: 30,
        fontSize: 17,
        color: '#737373',
    },
    date: {
        fontSize: 20,
        marginLeft: 15,
    }
})