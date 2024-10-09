import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const data = [
  {
    id: 1,
    content: 'To check email',
  },
  {
    id: 2,
    content: 'UI task web page',
  },
  {
    id: 3,
    content: 'Learn javascript basic',
  },
  {
    id: 4,
    content: 'Learn HTML Advance',
  },
  {
    id: 5,
    content: 'Medical App UI',
  },
  {
    id: 6,
    content: 'Learn Java',
  },
];

// useEffect(() => {
//   fetch('https://645464baa74f994b333f63ab.mockapi.io/account')
//   .then(response => response.json)
// }, []);

const Item = ({ content }) => (
  <View style={styles.item}>
  <Image source={require('./icons/Frame.png')}/>
    <Text style={styles.content}>{content}</Text>
    <Image style={styles.editIcon} source={require('./icons/Edit.png')}/>
  </View>
);

const App = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}></View>
      <SafeAreaView style={{ flex: 2 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item content={item.content} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          fetch('https://645464baa74f994b333f63ab.mockapi.io/account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: 7,
              content: 'Learn mobile programming',
            }),
          });
        }}>
        <Text>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          fetch('https://645464baa74f994b333f63ab.mockapi.io/account/7', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: 'Learn English',
            }),
          });
        }}>
        <Text>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          fetch('https://645464baa74f994b333f63ab.mockapi.io/account/7', {
            method: 'DELETE'
          });
        }}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    backgroundColor: 'cyan',
    paddingVertical: 12,
    marginBottom: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DEE1E6',
    paddingVertical: 10,
    paddingLeft: 16,
    marginBottom: 8,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 24
  },
  content: {
    flex: 2,
    fontWeight: 'bold',
    marginLeft: 12
  },
  editIcon: {
    marginRight: 16
  }
});

export default App;
