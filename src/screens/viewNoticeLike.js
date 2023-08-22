import { View, Text,TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../utils/AuthContext';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://3.39.104.119/univactivity/likelist';

export default function NoticeScreen(props) {
  const [likeList, setLikeList] = useState([]);
  const { user, token } = useAuth(); // 현재 로그인한 유저의 user, token
  const navigation = useNavigation();

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchLikeData = async () => {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    try {
      const response = await axios.get(API_URL, { headers });
      if (response.status === 200) {
        setLikeList(response.data); // Set the fetched activity data in the state
      }
    } catch (error) {
      console.error('Error fetching like list data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E2D0F8', '#A0BFE0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.homeButton}>
            <AntDesign name="home" size={24} color="rgba(74, 85, 162, 1)" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>찜한 공지사항</Text>
        </View>
      </LinearGradient>

      <View style={styles.main}>
      <FlatList
                data={likeList}
                keyExtractor={(item) => item.id.toString()} // Assuming 'id' is a unique identifier
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.activityItem}
                    onPress={() => navigation.navigate('Activity', { activityId: item.id })} // Pass the activityId to the 'Activity' screen
                  >
                    <View style={styles.activityDetails}>
                      <Text style={styles.activityCategory}></Text>
                      {/* <Text style={styles.activityDday}>D-10</Text> */}
                    </View>
                    <Text style={styles.activityItemTitle}>{item.title}</Text>
                    <Text style={styles.activityDetails}>{item.description}</Text>
                    <Text style={styles.activityItemTitle}>{item.urlLink}</Text>
                    <Text style={styles.activityDday}>{item.createdDate}</Text>
                    <Text style={styles.activityDday}>{item.modifiedDate}</Text>
                  </TouchableOpacity>
                )}
              />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop:20,
  },
  homeButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  activityList: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  activityItem: {
    backgroundColor: 'rgba(226, 208, 248, 0.3)',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  activityCategory: {
    fontWeight: 'bold',
    color: 'rgba(74, 85, 162, 1)',
  },
  activityDday: {
    fontWeight: 'bold',
  },
  activityItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    width:"70%",
    height:"5%",
    marginBottom:20,
    flexDirection: 'row',
    alignItems: 'right',
    padding: 1,
    borderColor: '#EDEDED',
    backgroundColor: 'white',
  },

  sendButton: {
    padding: 3,
    fontSize:10,
    backgroundColor: 'rgba(74, 85, 162, 1)',
    borderRadius: 5,
    marginLeft: 10,
  },
});