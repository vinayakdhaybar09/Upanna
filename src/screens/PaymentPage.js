import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { navbtn, hr80 } from '../globals/Style'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { firebase } from '../../Firebase/FirebaseConfig'





const PaymentPage = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const data = route.params?.finaldata

    const [checked, setChecked] = useState('cash on delivery');

    const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState('')



    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                // console.log(user);
                if (user) {
                    // navigation.navigate('home');
                    setUserloggeduid(user.uid);
                } else {
                    // No user is signed in.
                    console.log('no user');
                }
            });
        }
        checklogin();
    }, [])


    useEffect(() => {
        const getuserdata = async () => {
            const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
            // console.log(docRef);
            const doc = await docRef.get()
            if (!doc.empty) {
                doc.forEach((doc) => {
                    setUserdata(doc.data())
                })
            }
            else {
                // navigation.navigate('login')
            }
        }

        getuserdata()

    }, [userloggeduid])


    const confirmOrder = async () => {
        const docRef = firebase.firestore().collection('UserOrders').doc(firebase.auth().currentUser.uid)
        const data1 = {
            username: userdata.name,
            phoneno: userdata.phone,
            optionalno: data.optionalno,
            address: data.address,
            foodname: data.foodname,
            foodcategory: data.foodcategory,
            deliverytime: data.deliverytime,
            startdate: data.startdate,
            enddate: data.enddate,
            monthlyweekly: data.monthlyweekly,
            totalpeople: data.totalpeople,
            imageurl: data.image,
            payment: checked
        }

        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    orders: firebase.firestore.FieldValue.arrayUnion(data1)
                })
                navigation.navigate('ordersuccessfullpage')
            } else {
                docRef.set({
                    orders: [data1]
                })
                navigation.navigate('ordersuccessfullpage')
            }
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor:'#fff' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <View style={navbtn}>
                    <Ionicons name="arrow-back-outline" size={35} color="black" />
                </View>
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.flex}>
                    <Image source={{ uri: data.image }} style={styles.image} />
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={styles.foodName} >{data.foodname}</Text>
                        <Text>{data.monthlyweekly}</Text>
                        <Text>Starting from :  {data.startdate}</Text>
                    </View>
                </View>
                <View style={hr80} />
                <View style={{ paddingHorizontal: 20 }}>
                    <Text>Payment options</Text>
                    <View style={styles.cashpayment}>
                        <View style={styles.timeSlotBox} >
                            <RadioButton
                                value="cash on delivery"
                                status={checked === 'cash on delivery' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('cash on delivery')}
                                color={'green'}
                            />
                            <Text style={styles.optionText}>Cash / UPI on delivery</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.subscribeBtn} onPress={() => confirmOrder()}  >
                <Text style={styles.btntxt}>Done</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PaymentPage

const styles = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        padding: 10,
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth:1,
        borderStyle:'dashed',
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10,
        marginRight: 10
    },
    foodName: {
        fontSize: 18
    },
    timeSlotBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    cashpayment: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'green',
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#fff'
    },
    optionText: {
        fontWeight: '600',
        color: 'gray'
    },
    subscribeBtn: {
        width: '100%',
        backgroundColor: 'white'
    },
    btntxt: {
        backgroundColor: 'green',
        color: 'white',
        paddingVertical: 10,
        fontSize: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        textAlign: 'center',
        marginVertical: 10
    },
})