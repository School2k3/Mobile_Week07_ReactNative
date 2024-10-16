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
  TextInput,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const API_URL = 'https://645464baa74f994b333f63ab.mockapi.io/account';

/**
 * Home Screen
 */
function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  return (
    <View style={styles.homeContainer}>
      <View style={styles.header}>
        <Image source={require('./icons/task.png')} style={styles.image} />
      </View>
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      <View style={styles.inputContainer}>
        <Image source={require('./icons/mailIcon.png')} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Contents', { username: name })}>
        <Text style={styles.buttonText}>GET STARTED →</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * List Of Contents Screen
 */
const ListOfContents = ({ navigation, route }) => {
  const { username } = route.params;
  const [data, setData] = useState([]);
  const [editContentId, setEditContentId] = useState(null);

  useEffect(() => {
    var fn = fetch(API_URL);
    fn.then((response) => response.json()).then((newdata) => setData(newdata));
  }, []);

  var addContent = async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: 'Learn mobile programming',
      }),
    });
    const newData = await response.json();
    setData([...data, newData]);
  };

  // var updateContent = async () => {
  //   if (editContentId) {
  //     const response = await fetch(`${API_URL}/${editContentId}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         content: 'Learn Java',
  //       }),
  //     });
  //     const updateData = await response.json();
  //     setData(data.map(d => (d.id === editContentId ? updateData : d)));
  //     setEditContentId(null);
  //   }
  // };

  const updateContent = async (editContentId) => {
    if (editContentId) {
      const response = await fetch(`${API_URL}/${editContentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: 'Learn Java' }),
      });
      const updateData = await response.json();
      setData(data.map((d) => (d.id === editContentId ? updateData : d)));
      setEditContentId(null);
    }
  };

  var deleteContent = function (id) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    setData(data.filter((d) => d.id !== id));
  };

  const Item = ({ content }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => deleteContent(content.id)}>
        <Image source={require('./icons/Frame.png')} />
      </TouchableOpacity>
      <Text style={styles.content}>{content.content}</Text>
      <TouchableOpacity onPress={() => {
        updateContent(content.id);
      }}>
        <Image style={styles.editIcon} source={require('./icons/Edit.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image style={styles.userImage} source={require('./icons/user.png')} />
        <View>
          <Text style={styles.name}>Hi {username}</Text>
          <Text>Have agrate day a head</Text>
        </View>
      </View>
      <View
        style={[styles.inputContainer, { alignSelf: 'center', width: '90%' }]}>
        <Image source={require('./icons/magnifyingGlass.png')} />
        <TextInput style={styles.input} placeholder="Search" />
      </View>
      <SafeAreaView style={{ flex: 2 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item content={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.addButton} onPress={() => addContent()}>
        <Image source={require('./icons/addButton.png')} />
      </TouchableOpacity>
    </View>
  );
};

const Stack = createNativeStackNavigator();

/**
 * Run application
 */
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Contents" component={ListOfContents} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * Decorate with StyleSheet
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 60,
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
    alignSelf: 'center',
    width: 69,
    marginBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '80%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: '100%',
    color: 'silver',
    paddingLeft: 12,
  },
  button: {
    backgroundColor: '#00CFFF',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  userContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  userImage: {
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default App;
