import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View, 
    TouchableOpacity,
    Alert
} from 'react-native'
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'
import { server, showError, showSuccess } from '../common'

const initialState = {
    name: '',
    email: 'cs@med.com',
    password: '123',
    confirmPassword: '',
    stageNew: false,
}

export default class Auth extends Component {

    state = { ...initialState }

    signinOrsignup =  () => {
        if(this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try{
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSuccess('Usuário cadastrado!')
            this.setState({ ...initialState })
        } catch(e) {
            showError(e)
        }
    }

    signin = async () => {
        try{
            const res = await axios.post(`${server}/signin`, 
            {
                email: this.state.email,
                password: this.state.password,
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch(e) {
            showError(e)
        }
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 3)

        if(this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 2)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        //checa se todos os campos são válidos através das diretrizes acima
        const validForm = validations.reduce((t, a) => t && a)

        return (
            <LinearGradient 
                colors={[commonStyles.colors.mainA, commonStyles.colors.mainB, '#B2D8FF']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={styles.background} >
                <Text style={styles.title}>iList</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Cadastrar novo usuário' : 'Informe os dados cadastrados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput
                        icon='user'
                        placeholder='Nome' 
                        value={this.state.name}
                        style={styles.input}
                        onChangeText={name => this.setState({ name: name })} />
                    }
                    <AuthInput
                        icon='at'
                        placeholder='Email' 
                        value={this.state.email.toLowerCase()}
                        style={styles.input}
                        onChangeText={email => this.setState({ email: email })} />
                    <AuthInput
                        icon='lock' 
                        placeholder='Senha' 
                        value={this.state.password}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password: password })} />
                    {this.state.stageNew &&
                        <AuthInput
                        icon='asterisk'
                        placeholder='Confirmar senha' 
                        value={this.state.confirmPassword}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={confirmPassword => this.setState({ confirmPassword: confirmPassword })} />
                    }
                    <TouchableOpacity onPress={this.signinOrsignup} disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: commonStyles.colors.mainA}]}>
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
        //padding: Platform.OS == 'ios' ? 13 : 10
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