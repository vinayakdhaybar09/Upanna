import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { navbtn, hr80 } from '../globals/Style'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../Firebase/FirebaseConfig'



const OrderHistory = () => {
    const navigation = useNavigation()
    const [orderData, setOrderData] = useState(null)


    const getOrdersData = async () => {
        const docRef = firebase.firestore().collection('UserOrders').doc(firebase.auth().currentUser.uid)

        docRef.get().then((doc) => {
            if (doc.exists) {
                const data = JSON.stringify(doc.data())
                // console.log(data);
                setOrderData(data)

            } else {
                console.log('no such documents');
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getOrdersData()
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.normalFlex}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <View style={navbtn}>
                        <Ionicons name="arrow-back-outline" size={35} color="black" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.title}>History</Text>
                <View></View>
            </View>

            {/* <View style={[hr80, { marginVertical: 5 }]} /> */}

            {orderData == null || JSON.parse(orderData).orders.length == 0 ?
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>You cart is empty</Text>
                    <TouchableOpacity>
                        <Text style={styles.gotohomeBtn}>Order Now</Text>
                    </TouchableOpacity>
                </View>
                :
                JSON.parse(orderData).orders.map((item, index) => {
                    return (
                        <View style={styles.historyBox} key={index}>
                            <View style={{ justifyContent: 'space-between', paddingVertical: 10 }}>
                                <Text style={styles.text}>{item.foodname}</Text>
                                <Text style={styles.text}>{item.foodcategory}</Text>
                                <Text style={styles.text}>{item.startdate} - {item.enddate}</Text>
                            </View>
                            <View style={styles.imagestyle}>
                                <Image source={{ uri:item.imageurl }} />
                            </View>
                        </View>
                    )
                })

            }

        </View>
    )
}

export default OrderHistory

const styles = StyleSheet.create({
    normalFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        // color:'gray'
        marginLeft: 10
    },
    historyBox: {
        marginHorizontal: 20,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom:20,
        backgroundColor:'#fff'
    },
    text: {
        color: 'gray',
        fontWeight: '600'
    },
    imagestyle: {
        height: 100,
        width: 75,
        backgroundColor: 'gray',
        borderRadius: 10
    }
})