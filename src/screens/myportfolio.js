import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from './../utils/AuthContext';

export default function App() {
  const [navigationButtons, setNavigationButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedSubTitle, setEditedSubTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const { token } = useAuth(); // 현재 로그인한 유저의 user, token


  console.log(token)
  
  const addNavigationButton = () => {
    const newButton = {
      title: `포트폴리오${navigationButtons.length + 1}`,
      subTitle: `새로운 포트폴리오 ${navigationButtons.length + 1}`,
      content: `새로운 내용 ${navigationButtons.length + 1}`,
    };

    setNavigationButtons([...navigationButtons, newButton]);
  };

  const handleButtonPress = (button) => {
    setSelectedButton(button);
    setIsEditMode(false);
    setEditedTitle(button.title);
    setEditedSubTitle(button.subTitle);
    setEditedContent(button.content);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleTitleChange = (text) => {
    setEditedTitle(text);
  };

  const handleSubTitleChange = (text) => {
    setEditedSubTitle(text);
  };

  const handleContentChange = (text) => {
    setEditedContent(text);
  };

  const handleSaveButton = async () => {
    const updatedButtons = navigationButtons.map((button) => {
      if (button === selectedButton) {
        return { ...button, title: editedTitle, subTitle: editedSubTitle, content: editedContent };
      }
      return button;
    });

    setNavigationButtons(updatedButtons);
    setIsEditMode(false);

    const data = {
      title: String(editedTitle),
      urllink: String(editedSubTitle),
      description: String(editedContent),
    };

    try {
      const response = await axios.post('http://3.39.104.119:8080/portfolio/new', token);
      console.log('서버 응답 데이터:', response.data);

      // 여기서 서버 응답 데이터를 활용할 수 있습니다.
      // 예: 성공 메시지를 출력하거나 다른 동작을 수행할 수 있습니다.
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeButton}>
          <AntDesign name="home" size={24} color="rgba(74, 85, 162, 1)" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>포트폴리오 관리</Text>
      </View>
      <View style={styles.nav}>
        <LinearGradient
          colors={['#E2D0F8', '#A0BFE0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navContent}>
            {navigationButtons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.navButton,
                  selectedButton === button && styles.selectedNavButton,
                ]}
                onPress={() => handleButtonPress(button)}
              >
                <Text style={styles.navButtonText}>{button.title}</Text>
                <Text style={styles.portfolioNavTitle}>{button.subTitle}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.navButtonPlus} onPress={addNavigationButton}>
              <Text style={styles.navButtonTextPlus}>추가</Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </View>

      <View style={styles.main}>
        <View style={styles.portfolioInfo}>
          <Text style={styles.portfolioName}>{editedTitle}</Text>
          <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
            <Text style={styles.editButtonText}>{isEditMode ? '완료' : '수정'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>서가은 수정</Text>
        <Text style={styles.infoLabel}>포트폴리오 제목</Text>
        <TextInput
          style={styles.infoInput}
          value={editedTitle}
          onChangeText={handleTitleChange}
          editable={isEditMode}
        />
        <Text style={styles.infoLabel}>포트폴리오 링크</Text>
        <TextInput
          style={styles.infoInput}
          value={editedSubTitle}
          onChangeText={handleSubTitleChange}
          editable={isEditMode}
        />
        <Text style={styles.infoLabel}>내용</Text>
        <TextInput
          style={styles.bigInfoInput}
          multiline
          numberOfLines={4}
          value={editedContent}
          onChangeText={handleContentChange}
          editable={isEditMode}
        />
        {isEditMode && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveButton}>
            <Text style={styles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  homeButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop:20,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop:10,
  },
  nav: {
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    overflow: 'hidden',
  },
  navContent: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom:10,
  },
  navButtonText: {
    color: 'rgba(74, 85, 162, 1)',
    fontWeight: 'bold',
  },
  navButtonPlus: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dotted',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom:10,
  },
  navButtonTextPlus: {
    color: 'white',
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  portfolioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  portfolioName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: 'rgba(74, 85, 162, 1)',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoInput: {
    backgroundColor: 'rgba(226, 208, 248, 0.3)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  bigInfoInput: {
    backgroundColor: 'rgba(226, 208, 248, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: 'rgba(160, 191, 224, 1)',
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  portfolioNavTitle: {
    color: 'rgba(74, 85, 162, 1)',
    fontWeight: 'bold',
    fontSize: 12,
  },
});