# hisujung_frontend_EJ

구성:
screens폴더 - screen들로, 파일명과 같은 함수명을 export함
/   src/App.js - 필요한 화면파일들 import해서 화면 구성으로만 쓰임

- src/App.js에서 필요한 screen파일을 사용할 이름으로 import하고, App함수 내에서 <Stack.screen></> 태그 안에서 사용

- App함수 내에서 name을 설정해놓아야 다른 screen파일에서 사용할 수 있음
예) RegisterScreen.js 파일에서 navigation.navigate('Login'); 하려면(LoginScreen으로 이동)
App 함수 내에서 <Stack.screen>name="Login" component={LoginScreen} </> 이렇게 name이 설정되어있어야 함. 아니면 에러나요..

*(이 폴더 다운 받아서 쓸 거면) npm install 하면 쓰인 모듈들 다 깔림
