import './App.css';
import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {NavBar, Footer, Header, MobileHeader, PublicUser, AdminUser, StudentInstructorUser} from './components/index'
import {Quiz, FileUpload, Home, Contact, SignIn, Accounts, Exam, ChapterUpload, ChapterInstall, AdminCourses, Course, DashboardPage, Profile, UploadAssignment, Assignments} from './Pages/index'

import axios from "axios";

function App() {


  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'En'
  );
  


  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'En' ? 'Ar' : 'En'));
    document.documentElement.setAttribute('dir', language === 'En' ? 'rtl' : 'ltr');
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  
  const [stick , setStick] = useState(true)

  function isRelative(){
    setStick(prevStick => prevStick = true)
  }

  function isFixed(){
    setStick(prevStick => prevStick = false)
  }
  console.log(stick)


  // const { auth, name } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:4001')
        .then(res => {
          console.log("Server response:", res.data); // Log the server response
          if (res.data.Status === "Success") {
            console.log("User authenticated: ", res.data.firstName); // Log the firstName
            setAuth(true);
            setName(res.data.firstName);
            setRole(res.data.role);
            setUserId(res.data.id);
          } else {
            console.log("Authentication failed: ", res.data.Error); // Log the error
            setAuth(false);
            // alert(res.data.Error);
          }
        })
        .catch(err => {
          console.error("Error fetching auth status: ", err); // Log network errors
        });
  }, []);


  return (
    <div className="App" >

      <Router>

        <MobileHeader
        language={language}
        toggleLanguage={toggleLanguage}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        Role = {role}
        userId={userId}
        auth={auth}
        name={name}
        />
        <Header 
          language={language}
          toggleLanguage={toggleLanguage}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          auth={auth}
          name={name}
          userId={userId}
        />
        

        <NavBar 
          language = {language}
          isDarkMode = {isDarkMode}
          Role = {role}
          relative = {isRelative}
          fixed = {isFixed}
          userId={userId}
        />


        <Routes>
          <Route path = '/ChapterUpload/:courseCode' element={<StudentInstructorUser Role={role}><ChapterUpload language={language} isDarkMode={isDarkMode} Role={role} relative ={isRelative} fixed ={isFixed}/></StudentInstructorUser>} />
          <Route path = '/ChapterInstall' element={<ChapterInstall language={language} isDarkMode={isDarkMode} />} />
          <Route path = '*' element={
            <>
              <Routes>
                <Route path = '/' element={<PublicUser><Home language={language} isDarkMode={isDarkMode} name={name} auth={auth}/></PublicUser>} />
                <Route path = '/SignIn' element={<PublicUser><SignIn language={language} isDarkMode={isDarkMode} /></PublicUser>} />
                <Route path = '/Quiz' element={<StudentInstructorUser Role={role}><Quiz  isDarkMode={isDarkMode} Role={role}/></StudentInstructorUser>} />
                <Route path = '/Exam' element={<StudentInstructorUser Role={role}><Exam language={language} isDarkMode={isDarkMode} Role={role} userId={userId}/></StudentInstructorUser>} />
                <Route path = '/FileUpload' element={<StudentInstructorUser Role={role}><FileUpload isDarkMode={isDarkMode} Role={role}/></StudentInstructorUser>} />
                <Route path = '/Contact' element={<StudentInstructorUser Role={role}><Contact language={language} isDarkMode={isDarkMode} Role={role}/></StudentInstructorUser>} />
                <Route path = '/Course/:userId' element={<StudentInstructorUser Role={role}><Course isDarkMode={isDarkMode} Role={role}/></StudentInstructorUser>} />
                <Route path = '/AdminCourse' element={<AdminUser Role={role}><AdminCourses language={language} isDarkMode={isDarkMode} /></AdminUser>} />
                <Route path = '/Accounts' element={<AdminUser Role={role}><Accounts language={language} isDarkMode={isDarkMode} relative ={isRelative} fixed ={isFixed}/></AdminUser>} />
                <Route path = '/Dashboard' element={<AdminUser Role={role}><DashboardPage isDarkMode={isDarkMode} language={language}/></AdminUser>} />
                <Route path = '/Profile/:userId' element={<StudentInstructorUser Role={role}><Profile language={language} isDarkMode={isDarkMode} Role={role} userId={userId}/></StudentInstructorUser>} />
                <Route path = '/Assignments' element={<StudentInstructorUser Role={role}><Assignments isDarkMode={isDarkMode} language={language} userId={userId}/></StudentInstructorUser>} />
                <Route path = '/UploadAssignment' element={<StudentInstructorUser Role={role}><UploadAssignment isDarkMode={isDarkMode} language={language} userId={userId}/></StudentInstructorUser>} />
              </Routes>
            </>
          } />
        </Routes>

        <Footer language={language} isDarkMode={isDarkMode} stick= {stick}/>
      </Router>
    </div>
  );
}

export default App;
