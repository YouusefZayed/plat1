import {useEffect, useState, useContext} from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import learningImage from "./images/learning.svg"
import elearningImage from "./images/elearning.svg"
import teamImage from "./images/team.svg"
import collegeImage from "./images/college.svg"
import axios from "axios";
import { AuthContext } from '../../components/AuthContext/AuthContext';
import {findByLabelText} from "@testing-library/react";

const Home = ({ language, isDarkMode, name, auth }) => {

  return (
      <div className={`home ${isDarkMode ? 'dark' : 'light'}`}>
        <section className="welcome-section">
          <div className='container'>
            <div className='content'>
              <h2>{language === 'En' ? `Welcome ${name} to Our Educational Platform` : `مرحبًا ${name} بك في منصتنا التعليمية`}</h2>
              <p>
                {language === 'En'
                    ? 'Empowering learners worldwide with quality education.'
                    : 'نمكّن المتعلمين في جميع أنحاء العالم من التعليم عالي الجودة.'}
              </p>
              <p>
                {language === 'En'
                    ? 'Join thousands of students already on their journey to success.'
                    : 'انضم إلى آلاف الطلاب الذين بدأوا رحلتهم نحو النجاح بالفعل.'}
              </p>
              {auth ? null :
                  (<button className="cta-button">
                <Link to="/SignIn">{language === 'En' ? 'Get Started' : 'ابدأ الآن'}</Link>
              </button>)}
            </div>
            <div className='image'>
              <img src={learningImage} alt="learning"/>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            <div className="content">
              <h2>{language === 'En' ? 'About Our Platform' : 'عن منصتنا'}</h2>
              <p>
                {language === 'En'
                    ? 'Our platform offers a wide range of courses provided by esteemed faculty members. Students can access course materials, complete assignments, and take quizzes. In addition, instructors can conduct live lectures using our video conferencing system.'
                    : 'تقدم منصتنا مجموعة واسعة من الدورات التي يقدمها أعضاء هيئة التدريس المحترمين. يمكن للطلاب الوصول إلى مواد الدورة وإكمال الواجبات وأداء الاختبارات. بالإضافة إلى ذلك، يمكن للمحاضرين إجراء محاضرات مباشرة باستخدام نظام المؤتمرات المرئية لدينا.'}
              </p>
            </div>
            <div className="image">
              <img src={elearningImage} alt="E-Learning" />
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="container">
            <div className="content">
              <h2>{language === 'En' ? 'Our Team' : 'فريق العمل'}</h2>
              <p>
                {language === 'En'
                    ? 'We are the P R E M I U M team, specialized in developing educational platforms for Egyptian colleges and universities.'
                    : 'نحن فريق P R E M I U M متخصصون في تطوير منصات تعليمية للكليات والجامعات المصرية.'}
              </p>
            </div>
            <div className="image">
              <img src={teamImage} alt="Team" />
            </div>
          </div>
        </section>

        <section className="college-info">
          <div className="container">
            <div className='content'>
              <h2>{language === 'En' ? 'College Information' : 'معلومات الكلية'}</h2>
              <p>
                {language === 'En'
                    ? 'Our platform is dedicated to the Faculty of Computer Science and Artificial Intelligence at Sadat City University.'
                    : 'تخصص منصتنا لكلية الحاسبات والذكاء الاصطناعي في جامعة مدينة السادات.'}
              </p>
              <p>
                {language === 'En'
                    ? 'The college comprises two main departments: Computer Science and Information Systems.'
                    : 'تضم الكلية قسمين رئيسيين: علوم الحاسب ونظم المعلومات.'}
              </p>
              <p>
                {language === 'En'
                    ? 'We offer a variety of courses delivered by expert instructors covering various fields in computer science and information systems.'
                    : 'نحن نقدم مجموعة متنوعة من الدورات التي يقدمها مدرسون متخصصون تغطي مجالات مختلفة في علوم الحاسب ونظم المعلومات.'}
              </p>
            </div>
            <div className="image">
              <img src={collegeImage} alt="College" />
            </div>
          </div>
        </section>
      </div>
  );
};

export default Home;
