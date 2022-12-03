import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
    return (
        <View style={styles.container} >
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.title} >upanna</Text>
                <Text style={styles.tag}>Food &#8226; Love &#8226; Quality</Text>
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 30,
        color: 'red',
        fontWeight: '800',
        letterSpacing: 1,
    },
    tag: {
        marginTop: 10,
        fontWeight: '450',
        letterSpacing: 0.5
    },
})