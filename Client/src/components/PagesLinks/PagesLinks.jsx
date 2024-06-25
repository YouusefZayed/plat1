import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function PagesLinks ({ language, Role, relative, fixed, userId }) {
    const [pathName, setPathName] = useState("/")
    const location = useLocation();
    useEffect(() => {
        setPathName(location.pathname);
    }, [location])

    return (
        <ul className={language === 'En' ? 'right-aligned' : 'left-aligned'}>
            <li className={pathName === "/" ? "active" : ""}>
                <Link to="/" onClick={relative}>{language === 'En' ? 'Home' : 'الصفحة الرئيسية'}</Link>
            </li>
            {(Role === "student" || Role === "instructor") ? <>
                <li className={pathName === "/Exam" ? "active" : ""}>
                    <Link to="/Exam">{language === 'En' ? 'Make Exam' : 'عمل إمتحان'}</Link>
                </li>
                <li className={pathName === "/Quiz" ? "active" : ""}>
                    <Link to="/Quiz" onClick={fixed}>{language === 'En' ? 'Quiz' : 'اختبار'}</Link>
                </li>
                <li className={pathName === "/FileUpload" ? "active" : ""}>
                    <Link to="/FileUpload" onClick={fixed}>{language === 'En' ? 'File upload' : 'تحميل الملفات'}</Link>
                </li>
                <li className={pathName === "/Contact" ? "active" : ""}>
                    <Link to="/Contact" onClick={fixed}>{language === 'En' ? 'Contact' : 'اتصل'}</Link>
                </li>
                <li className={pathName === `/Course/${userId}` ? "active" : ""}>
                    <Link to={`/Course/${userId}`} onClick={fixed}>{language === 'En' ? 'Course' : 'دورة'}</Link>
                </li>
                <li className={pathName === `/Assignments` ? "active" : ""}>
                    <Link to={`/Assignments`} onClick={fixed}>{language === 'En' ? 'Assignments' : 'دورة'}</Link>
                </li>
                <li className={pathName === `/UploadAssignment` ? "active" : ""}>
                    <Link to={`/UploadAssignment`} onClick={fixed}>{language === 'En' ? 'Upload Assignment' : 'دورة'}</Link>
                </li>
            </> : null}
            {(Role === "admin") ? <>
                <li className={pathName === "/Accounts" ? "active" : ""}>
                    <Link to="/Accounts">{language === 'En' ? 'Accounts Management' : 'ادارة الحسابات'}</Link>
                </li>
                <li className={pathName === "/AdminCourse" ? "active" : ""}>
                    <Link to="/AdminCourse" onClick={fixed}>{language === 'En' ? 'Structure Management' : 'ادارة الهيكل'}</Link>
                </li>
                <li className={pathName === "/ChapterUpload" ? "active" : ""}>
                    <Link to="/ChapterUpload" onClick={fixed}>{language === 'En' ? 'Chapters Upload' : 'رفع المحاضرات'}</Link>
                </li>
                <li className={pathName === "/Dashboard" ? "active" : ""}>
                    <Link to="/Dashboard" onClick={fixed}>{language === 'En' ? 'Dashboard' : 'لوحات المعلومات'}</Link>
                </li>
            </> : null}
            {/*{Role && <li className={pathName === "/ChapterUpload" && "active"}><Link to="/ChapterUpload" onClick={fixed}>{language === 'En' ? 'Chapters Upload' : ' رفع المحاضرات'}</Link></li>}*/}
            {/*{Role && <li className={pathName === "/ChapterInstall" && "active"}><Link to="/ChapterInstall" onClick={fixed}>{language === 'En' ? 'Chapters Install' : 'تنزيل المحاضرات'}</Link></li>}*/}
        </ul>
    )
}

export default PagesLinks;