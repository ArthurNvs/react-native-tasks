import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import commonStyles from '../commonStyles'

export default class Auth extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false,
    }

    signinOrsignup =  () => {
        if(this.state.stageNew) {
            Alert.alert('Cadastrar Usuário', 'Cadastro realizado com sucesso!')
        } else {
            Alert.alert('Login', 'Login bem sucedido!')
        }
    }

    render() {
        return (
            <LinearGradient 
                colors={['#7663FF', '#E0AEF7', '#B2D8FF']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={styles.background} >
                <Text style={styles.title}>myList</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Cadastrar novo usuário' : 'Informe os dados cadastrados'}
                    </Text>
                    {this.state.stageNew &&
                        <TextInput 
                        placeholder='Nome' 
                        value={this.state.name}
                        style={styles.input}
                        onChangeText={name => this.setState({ name: name })} />
                    }
                    <TextInput 
                        placeholder='Email' 
                        value={this.state.email}
                        style={styles.input}
                        onChangeText={email => this.setState({ email: email })} />
                    <TextInput 
                        placeholder='Senha' 
                        value={this.state.password}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password: password })} />
                    {this.state.stageNew &&
                        <TextInput 
                        placeholder='Confirmar senha' 
                        value={this.state.confirmPassword}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={confirmPassword => this.setState({ confirmPassword: confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrsignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Cadastrar' : 'Login'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={{padding: 10}}
                    onPress={ () => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possuo um cadastro' : 'Não possui cadastro?'}
                    </Text>
                </TouchableOpacity>
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
        fontSize: 60,
        marginBottom:  10,
        fontFamily: commonStyles.fontFamily,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#EBE9FF',
        padding: Platform.OS == 'ios' ? 13 : 10
    },
    formContainer: {
        borderRadius: 5,
        backgroundColor: '#rgba(106, 90, 205, 0.1)',
        padding: 20,
        width: '90%'
    },
    button:{
        backgroundColor: '#50B441',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText:{
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 14
    }
})