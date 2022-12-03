import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { hr80 } from '../globals/Style'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../Firebase/FirebaseConfig'




const Orders = () => {
    const navigation = useNavigation()

    const [orderData, setOrderData] = useState(null)
    const [letstOrder, setLetstOrder] = useState('')
    // console.log(orderData);



    // const getOrdersData = async () => {
    //     const docRef = firebase.firestore().collection('UserOrders').doc(firebase.auth().currentUser.uid)

    //     await docRef.get().then((doc) => {
    //         if (doc.exists) {
    //             const data = JSON.stringify(doc.data())
    //             // console.log(data);
    //             setOrderData(data)

    //         } else {
    //             console.log('no such documents');
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //     })

    //     const letestdata = orderData != null ? JSON.parse(orderData).orders[JSON.parse(orderData).orders.length - 1] : 'its null'
    //     setLetstOrder(letestdata);


    // }

    // useEffect(() => {
    //     getOrdersData()
    // }, [])








    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={[styles.normalflex, { marginHorizontal: 20 }]}>
                <Text style={styles.title}>Orders</Text>
                <TouchableOpacity onPress={() => navigation.navigate('orderhistory')} >
                    <MaterialIcons name="history" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={hr80} />

            <View style={styles.infoText}>
                <Text style={styles.instruction}>you can skip afternoon tiffin before 7:00 AM</Text>
                <Text style={styles.instruction}>you can skip evening tiffin before 5:00 PM</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('skipmeal')}>
                    <Text style={styles.skipmealbtn}>Skip Today's meal</Text>
                </TouchableOpacity>
            </View>
            <View style={hr80} />

        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    normalflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center'
    },
    infoText: {
        borderWidth: 1,
        marginHorizontal: 30,
        marginVertical: 15,
        padding: 10,
        borderRadius: 10,
        borderColor: 'green'
    },
    instruction: {
        textAlign: 'center',
        fontSize: 12,
        color: 'red'
    },
    skipmealbtn: {
        padding: 15,
        textAlign: 'center',
        backgroundColor: 'green',
        marginHorizontal: 30,
        borderWidth: 1,
        borderRadius: 10,
        fontWeight: '600',
        color: 'white'
    }

})