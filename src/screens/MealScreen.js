import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import OfferSlider from '../components/OfferSlider'

import { firebase } from '../../Firebase/FirebaseConfig'
import CardSlider from '../components/CardSlider'

const MealScreen = () => {
    const [mealData, setMealData] = useState([])
    const [mealCategory, setMealCategory] = useState([])
    const [proteinBowlCategory, setProteinBowlCategory] = useState([])
    const [otherCategory, setOtherCategory] = useState([])

    const foodRef = firebase.firestore().collection('MealData')

    useEffect(() => {
        foodRef.onSnapshot(snapshot => {
            setMealData(snapshot.docs.map((doc) => doc.data()))
        })
    }, [])

    useEffect(() => {
        setMealCategory(mealData.filter(item => item.foodCategory == 'meal'))
        setProteinBowlCategory(mealData.filter(item => item.foodCategory == 'proteinbowl'))
        setOtherCategory(mealData.filter(item => item.foodCategory == 'other'))
    }, [mealData])

    // console.log(mealCategory);
    return (
        <View style={styles.container} >
            <StatusBar backgroundColor={'black'} />
            <Header />
            <ScrollView>
                <View style={styles.infoText}>
                    <Text style={{ fontSize: 15, color:'green' }}>Hi vinayak,</Text>
                    <Text >here You can order food in Group.<Text></Text></Text>
                </View>
                <OfferSlider />
                <View style={styles.typeStyle} >
                    <Text style={styles.title}>Group Meal</Text>
                    <Text style={styles.subTitle}>You can order quality & quantity food in group in low price.</Text>
                </View>
                <CardSlider title={'Full meal'} data={mealCategory} subTitle={'( group students, bachlers, family )'} />
                <CardSlider title={'Protein Bowl'} data={proteinBowlCategory} />
                <CardSlider title={'Other'} data={otherCategory} />

            </ScrollView>
        </View>
    )
}

export default MealScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    infoText: {
        borderWidth: 1,
        margin: 20,
        padding: 10,
        borderRadius: 10,
        borderColor:'green'
    },
    typeStyle: {
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign:'center'
    },
    subTitle: {
        marginTop: 7,
        paddingHorizontal: 10,
        color: 'gray',
        textAlign:'center'
    },

})