import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { hr80 } from '../globals/Style'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../Firebase/FirebaseConfig'




const SkipMeal = () => {
    const navigation = useNavigation()

    const [orderData, setOrderData] = useState(null)
    const [letstOrder, setLetstOrder] = useState('')
    // console.log(orderData);



    const getOrdersData = async () => {
        const docRef = firebase.firestore().collection('UserOrders').doc(firebase.auth().currentUser.uid)

        await docRef.get().then((doc) => {
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

        const letestdata = orderData != null ? JSON.parse(orderData).orders[JSON.parse(orderData).orders.length - 1] : 'its null'
        setLetstOrder(letestdata);


    }

    useEffect(() => {
        getOrdersData()
    }, [])








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
            {orderData == null || JSON.parse(orderData).orders.length == 0 ?
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>You cart is empty</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('mealpage')}>
                        <Text style={styles.gotohomeBtn}>Order Now</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.orderBox}>
                    <View style={styles.flex}>
                        <View style={{ justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text style={styles.foodName} >{letstOrder.foodname}</Text>
                            <Text style={styles.color}>Type : {letstOrder.foodcategory}</Text>
                            <Text style={styles.color}>Start date : {letstOrder.startdate}</Text>
                            <Text style={styles.color}>End date : {letstOrder.enddate}</Text>
                        </View>
                        <View style={styles.imagecontainer}>
                            <Image source={{ uri: letstOrder.imageurl }} style={styles.image} />
                        </View>
                    </View>

                    <View style={styles.normalflex}>
                        <Text style={styles.color}>Delivery time :</Text>
                        <Text style={styles.color}>{letstOrder.deliverytime}</Text>
                    </View>

                    <View style={styles.normalflex}>
                        <View>
                            <Text style={{ fontSize: 20 }}>09 Oct</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.skipBtnStyle}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                //     )}
                // />
            }
        </View>
    )
}

export default SkipMeal

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
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'gray'
    },
    gotohomeBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#000',
        borderRadius: 10,
        marginTop: 10,
        color: '#fff'
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imagecontainer: {
        height: 175,
        width: 125,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        // marginRight: 10
    },
    foodName: {
        fontSize: 18,
        fontWeight: '600',
    },
    color: {
        color: 'gray',
        fontWeight: '600'
    },
    skipBtnStyle: {
        fontSize: 20,
        backgroundColor: 'green',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        color: '#fff'
    },
    orderBox: {
        backgroundColor: '#eee',
        padding: 15,
        margin: 20,
        borderRadius: 10
    }
})