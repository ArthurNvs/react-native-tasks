import React from 'react'
import { 
    ScrollView, 
    View, 
    Text, 
    StyleSheet, 
    Platform 
} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'

export default props => {

    return(
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>iList</Text>
                <Gravatar 
                    style={styles.avatar}
                    options={{
                        email: props.navigation.getParam('email'),
                        secure: true
                    }} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {props.navigation.getParam('name')}
                    </Text>
                    <Text style={styles.email}>
                        {props.navigation.getParam('email')}
                    </Text>
                </View>
            </View>
            <DrawerItems { ...props } />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        marginTop: Platform.OS === 'ios' ? 60 : 30,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginBottom: 3,
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 14,
        color: commonStyles.colors.subText,
        marginBottom: 3,
    }
})