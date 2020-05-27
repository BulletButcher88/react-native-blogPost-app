import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Context } from '../context/BlogContext'
import { Feather } from '@expo/vector-icons';

export const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)


const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context)

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id'))

  const { title, id, content } = blogPost
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={{
        height: `100%`,
        fontSize: 30,
        backgroundColor: randomColor(),
      }} >{content}</Text>
    </View>
  )
}

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit', { id: navigation.getParam('id') })}>
        <Feather name="pen-tool" size={24} color="black" />
      </TouchableOpacity>
    )
  };
};



const styles = StyleSheet.create({
  title: {
    color: 'white',
    backgroundColor: 'black',
    fontSize: 100.
  },
  // contentStyle: {
  //   height: `100%`,
  //   fontSize: 30,
  //   backgroundColor: randomColor(),
  // }

})

export default ShowScreen