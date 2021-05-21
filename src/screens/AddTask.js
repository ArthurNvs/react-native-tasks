import React, { Component } from 'react'
import { 
    Modal, 
    StyleSheet, 
    View, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Text, 
    Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import commonStyles from '../commonStyles'

const initialState = { desc: '', date: new Date() }

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    getDateTimePicker = () => {
        //Platform.OS === 'ios' ?
        return <DateTimePicker 
                    value={this.state.date}
                    onChange={(_, date) => this.setState({ date: date })}
                    mode='date' />
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
                    {this.getDateTimePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15
    },
    input: {
        height: 40,
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
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    }
})