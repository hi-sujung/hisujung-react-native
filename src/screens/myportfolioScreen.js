import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://3.39.104.119/portfolio/';


export default function myportfolioScreen({ route }) {
  const { portfolioId } = route.params;
 // const { portfolioId } = route.params;
  const [portfolioData, setPortfolio] = useState({});

  const [navigationButtons, setNavigationButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedSubTitle, setEditedSubTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
 // const [portfolio, setPortfolio] = useState([]);
  const { token } = useAuth(); // 현재 로그인한 유저의 user, token
  const navigation = useNavigation(); // Initialize navigation
  // if (!route.params || !route.params.portfolioId) {
  //   // Handle the case when portfolioId is not available
  //   console.log(파람스없음)
  // }

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {

    try {
      const response = await axios.get(`${API_URL}id?id=${portfolioId}`);
      if (response.status === 200) {
        setPortfolio(response.data.data); // Set the fetched activity data in the state
      }
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  };

  const EditPortfolioData = async () => {
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    try {
      const response = await axios.post(
        `${API_URL}update/id?id=${portfolioId}`,
        { headers },
        {
          title: editedTitle,
          urlLink: editedSubTitle,
          description: editedContent,
        }
      );
  
      if (response.status === 200) {
        setPortfolio(response.data.data); // Set the fetched activity data in the state
        conoloe.log('editdddddddddddddddddddddd');
      } else {
        console.error('Error editing activity data:', response.status);
      }
    } catch (error) {
      console.error('Error editing activity data:', error);
    }
  };

  
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

  const handleEditButtonClick = () => {
    setIsEditMode(true); // "수정" 버튼 클릭 시 편집 모드 활성화
    // setEditedTitle(portfolioData.title); // 편집 중인 타이틀 초기화
  };

  const handleSaveButtonClick = () => {
    // 저장 버튼 클릭 시 편집 모드 비활성화 등의 처리
    setIsEditMode(false);
  };


  const handleSaveButton = async () => {
    const updatedButtons = navigationButtons.map((button) => {
      if (button === selectedButton) {
        return { ...button, title: editedTitle, subTitle: editedSubTitle, content: editedContent };
      }
      return button;
    });

    // setNavigationButtons(updatedButtons);
    setIsEditMode(false);

    const data = {
      title: String(editedTitle),
      urllink: String(editedSubTitle),
      description: String(editedContent),
    };

    // const fetchPortfolioData = async() => {
    //   try {
    //     const response = await axios.post(API_URL, token);
    //     console.log('서버 응답 데이터:', response.data);
  
    //     // 여기서 서버 응답 데이터를 활용할 수 있습니다.
    //     // 예: 성공 메시지를 출력하거나 다른 동작을 수행할 수 있습니다.
    //   } catch (error) {
    //     console.error('에러 발생:', error);
    //   }

    // }
   
  };

  const handleHomePress = () => {
    navigation.navigate('Main'); 
  };

  const handleDelete = () => {
    setShowPopup(true); // 팝업 표시
  };

  const cancelDelete = () => {
    setShowPopup(false); // 팝업 닫기
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHomePress} style={styles.homeButton}>
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
          {isEditMode ? ( // 편집 모드일 때
            <TextInput
              style={styles.portfolioName}
              value={editedTitle}
              onChangeText={handleTitleChange}
             />
            ) : ( // 편집 모드가 아닐 때
           <Text style={styles.portfolioName}>{portfolioData.title}</Text>
           )}
          <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
            <Text
            style={styles.editButtonText}
            onPress={isEditMode ? handleSaveButtonClick : handleEditButtonClick}
            >{isEditMode ? '완료' : '수정'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{portfolioData.username}서가은 수정 </Text>
        <Text style={styles.infoLabel}>포트폴리오 제목</Text>
        {isEditMode ? ( // 편집 모드일 때
        <TextInput
          style={styles.infoInput}
          value={editedTitle}
          onChangeText={handleTitleChange}
        />
      ) : ( // 편집 모드가 아닐 때
        <Text style={styles.infoInput}>{portfolioData.title}</Text>
      )}
        <Text style={styles.infoLabel}>포트폴리오 링크</Text>
        {isEditMode ? ( // 편집 모드일 때
        <TextInput
          style={styles.infoInput}
          value={editedSubTitle}
          onChangeText={handleSubTitleChange}
        />
      ) : ( // 편집 모드가 아닐 때
        <Text style={styles.infoInput}>{portfolioData.urlLink}</Text>
      )}
        <Text style={styles.infoLabel}>내용</Text>
        {isEditMode ? ( // 편집 모드일 때
        <TextInput
          style={styles.bigInfoInput}
          multiline
          numberOfLines={4}
          value={editedContent}
          onChangeText={handleContentChange}
          editable={isEditMode}
        />
      ) : ( // 편집 모드가 아닐 때
        <Text style={styles.bigInfoInput}>{portfolioData.description}</Text>
      )}

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>삭제</Text>
          </TouchableOpacity>

          <Modal
        visible={showPopup}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>이 포트폴리오를 삭제하시겠습니까?</Text>
            <Button title="예" onPress={cancelDelete} />
            <Button title="아니오" onPress={cancelDelete} />
          </View>
        </View>
      </Modal>




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
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
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
  deleteButton: {
    position: 'absolute',
    bottom: 300, // 아래 여백
    right: 20, // 오른쪽 여백
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'red',
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