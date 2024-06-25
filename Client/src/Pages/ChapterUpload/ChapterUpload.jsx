import React, {useEffect, useState} from 'react';
import axios from 'axios';
import phoneIcon from "../Chapters/Imgs/phone-icon.png";
import mailIcon from "../Chapters/Imgs/mail-icon.png";
import dollarIcon from "../Chapters/Imgs/dollar-sign.png";
import {useParams} from "react-router-dom";

const ChapterUpload = ({ isDarkMode, Role }) => {
    const [file, setFile] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileView, setFileView] = useState(null);
    const { courseCode } = useParams()
    console.log("course code:", courseCode)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4001/api/courses/${courseCode}/chapters`);
                console.log('API response:', response.data); // Log the response
                setChapters(response.data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [courseCode]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setErrorMessage(''); // Clear previous error message when a new file is selected
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`http://localhost:4001/api/courses/${courseCode}/chapters`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept-Charset': 'utf-8'
                }
            });
            alert('Chapter uploaded successfully');
            setFile(null); // Clear file input
            // Refresh the chapters list
            const response = await axios.get(`http://localhost:4001/api/courses/${courseCode}/chapters`);
            setChapters(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                console.error('Error uploading chapter', error);
            }
        }
    };

    const handleDownload = async (chapterId, fileName) => {
        try {
            const response = await axios.get(`http://localhost:4001/api/chapters/${chapterId}/download`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading chapter', error);
        }
    };

    const handleDelete = async (chapterId) => {
        try {
            await axios.delete(`http://localhost:4001/api/chapters/${chapterId}`);
            alert('Chapter deleted successfully');
            // Refresh the chapters list
            const response = await axios.get(`http://localhost:4001/api/courses/${courseCode}/chapters`);
            setChapters(response.data);
        } catch (error) {
            console.error('Error deleting chapter', error);
        }
    };

    const handleModify = async (e, chapterId) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.put(`http://localhost:4001/api/chapters/${chapterId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Chapter modified successfully');
            setFile(null); // Clear file input
            // Refresh the chapters list
            const response = await axios.get(`http://localhost:4001/api/courses/${courseCode}/chapters`);
            setChapters(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                console.error('Error uploading chapter', error);
            }
        }
    };

    const handleView = async (chapterId) => {
        try {
            const response = await axios.get(`http://localhost:4001/api/chapters/${chapterId}/view`, {
                responseType: 'blob',
            });
            const contentType = response.headers['content-type'];
            const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
            setFileView({ url, contentType });
        } catch (error) {
            console.error('Error viewing chapter', error);
        }
    };

    return (
        <div>
            {Role === 'instructor' && (
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange}/>
                    <button type="submit">Upload Chapter</button>
                </form>
            )}
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            <div>
                <h3>Uploaded Chapters</h3>
                <ul>
                    {chapters.map(chapter => (
                        <li key={chapter.id}>
                            {chapter.chapter_name}
                            <button onClick={() => handleDownload(chapter.id, chapter.chapter_name)}>Download</button>
                            <button onClick={() => handleView(chapter.id)}>View</button>
                            {Role === 'instructor' && (
                                <>
                                    <button onClick={() => handleDelete(chapter.id)}>Delete</button>
                                    <form onSubmit={(e) => handleModify(e, chapter.id)} style={{display: 'inline'}}>
                                        <input type="file" onChange={handleFileChange}/>
                                        <button type="submit">Modify</button>
                                    </form>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                {fileView && (
                    <div>
                        <h3>File Preview</h3>
                        {fileView.contentType.startsWith('image/') && (
                            <img src={fileView.url} alt="File Preview" style={{width: '100%', height: 'auto'}}/>
                        )}
                        {fileView.contentType === 'application/pdf' && (
                            <embed src={fileView.url} type="application/pdf" width="100%" height="600px"/>
                        )}
                        {/* Add more conditions for other file types if needed */}
                        <button onClick={() => setFileView(null)}>Close Preview</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChapterUpload;


// import React, { useState } from 'react';
// import axios from 'axios';
//
// const ChapterUpload = () => {
//     const [chapterName, setChapterName] = useState('');
//     const [chapterTitle, setChapterTitle] = useState('');
//     const [courseId, setCourseId] = useState('');
//     const [selectedFile, setSelectedFile] = useState(null);
//
//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         switch (name) {
//             case 'chapterName':
//                 setChapterName(value);
//                 break;
//             case 'chapterTitle':
//                 setChapterTitle(value);
//                 break;
//             case 'courseId':
//                 setCourseId(value);
//                 break;
//             default:
//                 break;
//         }
//     };
//
//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//
//         const formData = new FormData();
//         formData.append('chapterName', chapterName);
//         formData.append('chapterTitle', chapterTitle);
//         formData.append('courseId', courseId);
//         formData.append('pdfFile', selectedFile);
//
//         try {
//             const response = await axios.post('/upload-chapter', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Chapter uploaded successfully:', response.data);
//             // Clear form fields after successful upload (optional)
//             setChapterName('');
//             setChapterTitle('');
//             setCourseId('');
//             setSelectedFile(null);
//         } catch (error) {
//             console.error('Error uploading chapter:', error);
//         }
//     };
//
//     return (
//         <div>
//             <h1>Upload Chapter</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="chapterName">Chapter Name:</label>
//                 <input
//                     type="text"
//                     id="chapterName"
//                     name="chapterName"
//                     value={chapterName}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label htmlFor="chapterTitle">Chapter Title:</label>
//                 <input
//                     type="text"
//                     id="chapterTitle"
//                     name="chapterTitle"
//                     value={chapterTitle}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label htmlFor="courseId">Course ID:</label>
//                 <input
//                     type="number"
//                     id="courseId"
//                     name="courseId"
//                     value={courseId}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label htmlFor="pdfFile">PDF File:</label>
//                 <input type="file" id="pdfFile" name="pdfFile" onChange={handleFileChange} required />
//                 <button type="submit">Upload Chapter</button>
//             </form>
//         </div>
//     );
// };
//
// export default ChapterUpload;
