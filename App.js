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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ListOfContents = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    var fn = fetch('https://645464baa74f994b333f63ab.mockapi.io/account');
    fn.then((response) => response.json()).then((newdata) => setData(newdata));
  });

  var addContent = function () {
    fetch('https://645464baa74f994b333f63ab.mockapi.io/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: 'Learn mobile programming',
      }),
    })
    .then(res => res.json());
  };

  var updateContent = function (id) {
    fetch(`https://645464baa74f994b333f63ab.mockapi.io/account/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: 'Learn Java',
      }),
    })
    .then(res => res.json());
  };

  var deleteContent = function (id) {
    fetch(`https://645464baa74f994b333f63ab.mockapi.io/account/${id}`, {
      method: 'DELETE',
    });
  };

  const Item = ({ content }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() => deleteContent(content.id)}><Image source={require('./icons/Frame.png')}/></TouchableOpacity>
    <Text style={styles.content}>{content.content}</Text>
    <TouchableOpacity onPress={() => updateContent(content.id)}><Image style={styles.editIcon} source={require('./icons/Edit.png')}/></TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}></View>
      <SafeAreaView style={{ flex: 2 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item content={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.addButton} onPress={() => addContent()}>
        <Image source={require('./icons/addButton.png')}/>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='' component={ListOfContents} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
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
    borderRadius: 24,
  },
  content: {
    flex: 2,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  editIcon: {
    marginRight: 16,
  },
  addButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;


