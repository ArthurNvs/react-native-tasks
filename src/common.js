import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000'

function showError(err) {
    if(err.response &&  err.response.data) {
        Alert.alert('Atenção!', `${err.response.data}`)
    } else {
        Alert.alert('Algo de errado não está certo...', `${err.response.status}`)
    }
}

function showSuccess(msg) {
    Alert.alert('Deu bom!', msg)
}

export { server, showError, showSuccess }