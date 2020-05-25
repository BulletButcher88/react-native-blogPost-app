import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'

const BlogPostForm = ({ onSubmit, initialValue }) => {

  const [title, setTitle] = useState(initialValue.title)
  const [content, setContext] = useState(initialValue.content)

  return (
    <View>
      <Text style={styles.label}>Enter Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
      <Text style={styles.label}>Enter Context</Text>
      <TextInput style={styles.input} value={content} onChangeText={(content) => setContext(content)} />
      <Button
        title='Save Blog Post'
        onPress={() => onSubmit(title, content)}
      />
    </View>
  )
}

BlogPostForm.defaultProps = {
  initialValue: {
    title: '',
    content: ''
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    padding: 5
  },
  label: {
    fontSize: 25,
    marginBottom: 5,
    marginLeft: 5
  }
})

export default BlogPostForm




