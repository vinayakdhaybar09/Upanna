import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { navbtn, hr80 } from '../globals/Style'
import { RadioButton } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { firebase } from '../../Firebase/FirebaseConfig'



const PlaceOrder = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const data = route.params?.data

    const [people, setPeople] = useState('1')
    const [checked, setChecked] = useState('Monthly');
    const [finaltotal, setFinaltotal] = useState('')

    const increaseQuantity = () => {
        setPeople((parseInt(people) + 1).toString())
    }

    const decreaseQuantity = () => {
        if (parseInt(people) > 1) {
            setPeople((parseInt(people) - 1).toString())
        }

    }

    useEffect(() => {
        setFinaltotal(data.offerPrice * people)
    }, [increaseQuantity, decreaseQuantity])



    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <View style={navbtn}>
                        <Ionicons name="arrow-back-outline" size={35} color="black" />
                    </View>
                </TouchableOpacity>
                <View style={styles.flex}>
                    <Image source={{ uri: data.foodImageUrl }} style={styles.image} />
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={styles.foodName} >{data.foodName}</Text>
                        <Text>{people} people  |  {checked}</Text>
                        <Text></Text>
                    </View>
                </View>
                <View style={hr80} />
                {
                    data.foodCategory == 'meal' &&
                    <View>
                        <Text style={styles.peopleText}>Number of people : {people}</Text>
                        <View style={styles.incdecout}>
                            <Text onPress={() => decreaseQuantity()} style={styles.incdecbtn}>-</Text>
                            <Text style={styles.peopleincdec}>{people}</Text>
                            <Text onPress={() => increaseQuantity()} style={styles.incdecbtn}>+</Text>
                        </View>
                    </View>
                }
                <View style={hr80} />

                <Text style={styles.peopleText}>Subscription type</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                    <View style={styles.flexmonthweek}>
                        <RadioButton
                            value="Monthly"
                            status={checked === 'Monthly' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Monthly')}
                            color={'red'}

                        />
                        <Text>Monthly (28 D)</Text>
                    </View>
                    <View style={styles.flexmonthweek}>
                        <RadioButton
                            value="Weekly"
                            status={checked === 'Weekly' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Weekly')}
                            color={'red'}
                        />
                        <Text>Weekly ( 7 D )</Text>
                    </View>
                </View>

                <View style={hr80} />

                <View style={{ paddingHorizontal: 20 }}>
                    <View style={styles.orderContainer}>
                        <Text style={styles.peopleText}>OrderInfo</Text>

                        <View style={styles.orderPriceStyle}>
                            <Text style={styles.priceTitle}>Item Total</Text>
                            <Text style={{ fontSize: 13, color: 'black' }}>{data.offerPrice*people}/-</Text>

                        </View>

                        <View style={styles.orderPriceStyle}>
                            <Text style={styles.priceTitle}>Price Discount</Text>
                            <Text style={{ fontSize: 13, color: 'green' }}>-{((data.normalPrice) - (data.offerPrice))*people}/-</Text>
                        </View>

                        <View style={styles.orderPriceStyle}>
                            <Text style={styles.priceTitle}>Packaging Charges</Text>
                            <Text style={{ fontSize: 13, color: 'green' }}>FREE</Text>
                        </View>

                        <View style={styles.orderPriceStyle}>
                            <Text style={styles.priceTitle}>Delivery Charges</Text>
                            <Text style={{ fontSize: 13, color: '#7D7D7D', textDecorationLine: 'line-through' }}> Rs 3 / day</Text>
                            <Text style={{ fontSize: 13, color: 'green' }}>FREE</Text>
                        </View>
                    </View>


                    <View style={styles.orderPriceStyle}>
                        <Text style={{ fontSize: 13, fontWeight: '700' }}>Total Payble</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name="rupee" size={16} color="black" />
                            <Text style={{ fontSize: 13, marginLeft: 5 }}>
                                {finaltotal} / <Text style={{ fontSize: 10 }}>{people} Person</Text>
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.save}>Save : Rs {(data.normalPrice) - (data.offerPrice)} .00 (20%)</Text>
                </View>
            </ScrollView>
            {/* <Text style={styles.instruction}>Hey, you can skip meal on party day.</Text>
            <Text style={styles.instruction}>skip days added at the end of plan. so party hard!!*</Text> */}
            <TouchableOpacity style={styles.subscribeBtn} onPress={() => navigation.navigate('orderinfo', { data, people, subscriptionday: checked, finaltotal })}  >
                <Text style={styles.btntxt}>Place order ( &#8377; {finaltotal} )</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PlaceOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
    },
    flex: {
        flexDirection: 'row',
        padding: 10,
        margin: 20,
        borderRadius: 10,
        // backgroundColor: '#e5c9ca',
        // elevation: 10,
        borderWidth:1,
        borderStyle:'dashed'
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
    peopleText: {
        textAlign: 'center',
        fontSize: 18,
        opacity: 0.8
    },
    incdecout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    incdecbtn: {
        height: 50,
        width: 50,
        backgroundColor: '#2d92e5',
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 27,
        fontWeight: 'bold',
        color: 'white'
    },
    peopleincdec: {
        paddingHorizontal: 20,
        fontSize: 20,
        fontWeight: '600'
    },
    flexmonthweek: {
        alignItems: 'center',
        marginVertical: 10
    },
    orderContainer: {
        paddingVertical: 20,
        borderBottomColor: '#ADADAD',
        borderBottomWidth: 1
    },
    orderTitle: {
        fontSize: 20,
        marginBottom: 20
    },
    orderPriceStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    priceTitle: {
        color: '#797979',
        fontSize: 13
    },
    packagingChargesStyle: {
        fontSize: 13,
        marginLeft: 5,
        textDecorationLine: 'line-through',
        color: '#097807'
    },
    save: {
        color: "green",
        textAlign: 'center',
        marginTop: 20,
        fontStyle: 'italic',
        fontSize: 13
    },
    title: {
        fontSize: 15,
        fontWeight: '500'
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
    instruction: {
        color: 'red',
        textAlign: 'center',
        backgroundColor: 'white',
        fontSize: 12
    }
})