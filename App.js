import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { colors } from './src/Themes';

import ListCard from './src/Components/ListCard';
import * as _ from 'lodash'
import { ScaledSheet } from 'react-native-size-matters';
import { apiInstance } from './src/ApiHandler'

function Dashboard(props) {

  const [list, setList] = useState([])
  const [currentResponse, setCurrentResponse] = useState([])
  const [loader, setLoader] = useState(true)
  const [pageNo, setPageNo] = useState(1)
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
  const [apiTriggered, setApiTriggered] = useState(false)

  useEffect(() => {
    setApiTriggered(true)
    getList()
  }, [pageNo])

  useEffect(() => {
    if (apiTriggered) {
      if (currentResponse.length > 0) {
        var newList = _.concat(list, currentResponse)
        setList(newList)
        setApiTriggered(false)
        setLoader(false)
        //once data has been reloaded 
        //setting to false so next time user can reload data
        setOnEndReachedCalledDuringMomentum(false);
      }
    }
  }, [currentResponse])

  const getList = () => {
    //Api call
    apiInstance.get('/api/character/?page=' + pageNo).then((response) => {
      if (response.status === 200) {
        if (response.data && response.data.results) {
          setCurrentResponse(response.data.results)
        }
      }
      setLoader(false)
      console.log("response", response)
    }).catch((err) => {
      setLoader(false)
      console.log("err", err)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerTxt}>Rick & Morty List</Text>
      </View>
      <View style={styles.flexCenter}>
        {loader ? <ActivityIndicator color={colors.appThemeColor} size={'large'} /> :
          list.length > 0 ?
            <FlatList
              style={styles.container}
              data={list}
              extraData={list}
              contentContainerStyle={{ paddingBottom: 60 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <ListCard item={item} />
                )
              }
              }
              keyExtractor={(item, index) => index.toString()}
              onEndReached={({ distanceFromEnd }) => {
                if (!onEndReachedCalledDuringMomentum) {
                  //settng true user keep on dragging will elimintae unnecessary call
                  if (list.length >= 10 && !_.isEmpty(currentResponse)) {
                    setOnEndReachedCalledDuringMomentum(true);
                    setPageNo(pageNo => pageNo + 1)
                  }
                }
              }}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.5}
              onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
              ListFooterComponent={() => {
                return (
                  <View style={styles.listFooterLoader}>
                    {apiTriggered ? <ActivityIndicator size={'small'} color={colors.appThemeColor} /> : null}
                  </View>
                )
              }} />
            : <Text>No Records found</Text>}
      </View>
    </SafeAreaView>
  );
}

export default Dashboard

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listFooterLoader: {
    width: '100%',
    height: "50@ms",
    justifyContent: 'center',
    alignItems: 'center'
  },
  header:{
    width: "100%",
    height: "50@ms",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appThemeColor
  },
  headerTxt:{
    fontSize: "16@ms",
    fontWeight: '600',
    color: colors.white
  }
})