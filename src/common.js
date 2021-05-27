import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000'

function showError(err) {
    Alert.alert('Vixe! Algo de errado não está certo...', `Erro: ${err}`)
}

function showSuccess(msg) {
    Alert.alert('Deu bom!', msg)
}

export { server, showError, showSuccess }