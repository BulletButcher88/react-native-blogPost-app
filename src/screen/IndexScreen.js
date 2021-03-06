import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';

import { Context } from '../context/BlogContext'


export const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)


const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPost } = useContext(Context)

  useEffect(() => {
    getBlogPost();

    const listener = navigation.addListener('didFocus', () => {
      getBlogPost();
    });

    return () => {
      listener.remove()
    }
  }, [])


  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          return <TouchableOpacity onPress={() =>
            navigation.navigate('Show', { id: item.id })}>
            <View style={styles.row} backgroundColor={randomColor()}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Feather style={styles.icon} name="trash" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        }}
      />
    </View>
  )
}


IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('Create')}>
      <Feather name="plus" size={34} />
    </TouchableOpacity>
  };
};


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 15,
    fontSize: 20
  },
  title: {
    fontSize: 22
  },
  icon: {
    fontSize: 24
  }
})

export default IndexScreen 