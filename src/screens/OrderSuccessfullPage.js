import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderSuccessfullPage = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Image
                style={{ height: 100, width: 100, alignSelf: 'center', marginBottom: 10 }}
                source={{ uri: 'https://media.giphy.com/media/VTveILWavi2FEiQpOT/giphy.gif' }}
            />
            <View style={{ alignItems: 'center' }} >
                <Text style={{ fontSize: 20, fontWeight: '600', borderBottomWidth: 1, padding: 5 }} >Thankyou for Order</Text>
                <Text style={{ fontSize: 20, fontWeight: '600', alignSelf: 'center', marginTop: '30%' }} >You order is successfully placed</Text>
            </View>

            <Image
                style={{ height: 300, width: 300, alignSelf: 'center', marginBottom: 10 }}
                source={{ uri: 'https://media.giphy.com/media/EtJXlnBL4LbT7tkGai/giphy.gif' }}
            />

            <TouchableOpacity
                style={{ backgroundColor: 'black', padding: 10, width: '70%', borderRadius: 15, alignItems: 'center' }}
                onPress={() => navigation.navigate('mealpage')}
            >
                <Text style={{ color: '#fff', fontSize: 20 }} >Done</Text>
            </TouchableOpacity>

        </View>
    )
}

export default OrderSuccessfullPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    }
})