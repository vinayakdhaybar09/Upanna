import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { navbtn, hr80 } from '../globals/Style'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';



const OrderInfo = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const data = route.params


    const [checked, setChecked] = useState('');
    const [optionalnumber, setOptionalnumber] = useState('')
    const [address, setaddress] = useState('')
    const [startingdate, setStartingdate] = useState('')
    const [endingdate, setEndingdate] = useState('')


    // dropdown usestate
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);


    useEffect(() => {

        function toMonthName() {
            const a = new Date()
            const date = a.getDate()
            const month = a.getMonth()
            const year = a.getFullYear()
            const date1 = (`${date + 1} / ${month} / ${year}`);
            setStartingdate(date1)
        }

        toMonthName()

    }, [])


    const finaldata = {
        optionalno: optionalnumber,
        address: address,
        foodname: data.data.foodName,
        foodcategory: data.data.foodCategory,
        deliverytime: checked,
        startdate: startingdate,
        enddate: endingdate,
        monthlyweekly: data.subscriptionday,
        totalpeople: data.people,
        totalprice: data.finaltotal,
        image: data.data.foodImageUrl,
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <View style={navbtn}>
                    <Ionicons name="arrow-back-outline" size={35} color="black" />
                </View>
            </TouchableOpacity>
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={styles.addressFlex}>
                        <Text>Delivery Address</Text>
                        <TouchableOpacity><Text style={{color:'blue'}}>+ Add address</Text></TouchableOpacity>
                    </View>
                    <View style={styles.addressbox}>
                        <View style={styles.homeoffice}>
                            <Ionicons name="ios-location" size={24} color="black" />
                            <Text>Home</Text>
                        </View>
                        <View>
                            <Text style={{ paddingHorizontal: 15 }} >lane no 3, sopan nagar wadgaonsheri pune 411014</Text>
                        </View>
                    </View>
                </View>
                <View style={hr80} />
                <View style={styles.startingDateStyle}>
                    <Text style={{ width: '50%' }}>Starting Date</Text>
                    <Text>{startingdate}</Text>
                </View>
                <View style={hr80} />
                <View style={{ paddingHorizontal: 20 }}>
                    <Text>Delivery Time Slot ( choose any one slot )</Text>
                    <View style={styles.timingstyle}>
                        <Text>Afternoon</Text>
                        <View>
                            <View style={styles.timeSlotBox}>
                                <RadioButton
                                    value="1 slot"
                                    status={checked === '1 slot' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('1 slot')}
                                    color={'red'}
                                />
                                <Text>12:15 PM - 01:00 PM</Text>
                            </View>
                            <View style={styles.timeSlotBox}>
                                <RadioButton
                                    value="2 slot"
                                    status={checked === '2 slot' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('2 slot')}
                                    color={'red'}
                                />
                                <Text>01:00 PM - 02:00 PM</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.timingstyle}>
                        <Text>Evening</Text>
                        <View>
                            <View style={styles.timeSlotBox}>
                                <RadioButton
                                    value="3 slot"
                                    status={checked === '3 slot' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('3 slot')}
                                    color={'red'}
                                />
                                <Text>08:00 PM - 09:00 PM</Text>
                            </View>
                            <View style={styles.timeSlotBox}>
                                <RadioButton
                                    value="4 slot"
                                    status={checked === '4 slot' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('4 slot')}
                                    color={'red'}
                                />
                                <Text>09:00 PM - 10:00 PM</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={hr80} />
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        placeholder='Alternative Number ( roommate, partner etc. )'
                        style={styles.inputnumber}
                        keyboardType={'number-pad'}
                        onChangeText={(text) => setOptionalnumber(text)}
                    />
                </View>
            </ScrollView>
            <Text style={styles.instruction}>Free Delivery!!</Text>
            <TouchableOpacity style={styles.subscribeBtn} onPress={() => navigation.navigate('paymentpage', { finaldata })}  >
                <Text style={styles.btntxt}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OrderInfo

const styles = StyleSheet.create({
    addressFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addressbox: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 15,
        borderRadius: 10
    },
    homeoffice: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    startingDateStyle: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timingstyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10

    },
    timeSlotBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputnumber: {
        fontSize: 15,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray'
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
        fontSize: 12,
        paddingTop: 10
    }
})