import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoursesView = ({ language }) => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        id: '',
        name: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null);
    const [updatedCourse, setUpdatedCourse] = useState({
        id: '',
        name: '',
        description: ''
    });
    const [updatedImage, setUpdatedImage] = useState(null);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:4001/api/courses');
            setCourses(response.data);
        } catch (err) {
            console.log('Error fetching courses data: ', err);
        }
    };


    useEffect(() => {
        fetchCourses();
    }, []);
    console.log("courses: ", courses);

    const addCourse = async (course) => {
        const formData = new FormData();
        for (const key in course) {
            formData.append(key, course[key]);
        }
        formData.append('image', image);

        try {
            await axios.post('http://localhost:4001/api/courses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchCourses();
            setNewCourse({
                id: '',
                name: '',
                description: ''
            });
        } catch (err) {
            console.error('Error adding course: ', err);
        }
    };

    const updateCourse = async (course) => {
        const formData = new FormData();
        for (const key in updatedCourse) {
            formData.append(key, course[key]);
        }
        if (updatedImage) {
            formData.append('file', updatedImage);
        }

        try {
            await axios.put(`http://localhost:4001/api/courses/${course.course_code}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setEditingCourse(null);
            setUpdatedCourse({
                id: '',
                name: '',
                description: ''
            });
            setUpdatedImage(null);
            fetchCourses();
        } catch (err) {
            console.error('Error updating course: ', err);
        }
    };

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:4001/api/courses/${id}`);
            fetchCourses();
        } catch (err) {
            console.error('Error deleting course: ', err);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpdatedImageChange = (e) => {
        setUpdatedImage(e.target.files[0]);
    };


    const [resizing, setResizing] = useState(false);
    const [start, setStart] = useState(null);
    const [startWidth, setStartWidth] = useState(null);

    const handleMouseDown = (e) => {
        setStart(e.clientX);
        setStartWidth(e.target.clientWidth);
        setResizing(true);
        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e) => {
        if (resizing) {
            const newWidth = startWidth + (e.clientX - start);
            e.target.style.width = `${newWidth}px`;
        }
    };

    const handleMouseUp = () => {
        setResizing(false);
        document.body.style.userSelect = 'auto';
    };

    const handleMouseEnter = (e) => {
        e.target.style.cursor = 'col-resize';
    };

    const handleMouseLeave = (e) => {
        e.target.style.cursor = 'auto';
    };


    return (
        <table className="course-table">
            <thead>
            <tr>
                <th onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>{language === 'En' ? 'Course ID' : 'رقم الدورة'}</th>
                <th onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>{language === 'En' ? 'Course Name' : 'اسم الدورة'}</th>
                <th onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>{language === 'En' ? 'Course Description' : 'وصف الدورة'}</th>
                <th onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>{language === 'En' ? 'Course Image' : 'صورة الدورة'}</th>
                <th onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>{language === 'En' ? 'Actions' : 'الإجراءات'}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <input
                        type="text"
                        placeholder="Course ID"
                        value={newCourse.id}
                        onChange={(e) => setNewCourse({...newCourse, id: e.target.value})}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="Course Name"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="Description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    />
                </td>
                <td>
                    <input
                        type="file"
                        id="courseImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </td>
                <td>
                    <button onClick={() => addCourse(newCourse)}>Add</button>
                </td>
            </tr>
            {courses.map((course, index) => (
                <tr key={index}>
                    <td>{course.course_code}</td>
                    <td>
                        {editingCourse === course.course_code ? (
                            <input
                                type="text"
                                value={updatedCourse.name}
                                onChange={(e) => setUpdatedCourse({...updatedCourse, name: e.target.value})}
                            />
                        ) : (
                            course.course_name
                        )}
                    </td>
                    <td>
                        {editingCourse === course.course_code ? (
                            <input
                                type="text"
                                value={updatedCourse.description}
                                onChange={(e) => setUpdatedCourse({...updatedCourse, description: e.target.value})}
                            />
                        ) : (
                            course.description
                        )}
                    </td>
                    <td>
                        {editingCourse === course.course_code ? (
                            <input
                                type="file"
                                onChange={handleUpdatedImageChange}
                            />
                        ) : (
                            <img src={`/uploads/${course.image}`} alt={course.course_name}
                                 style={{width: '100px', height: 'auto'}}/>
                        )}
                    </td>
                    <td>
                        {editingCourse === course.course_code ? (
                            <>
                                <button onClick={() => updateCourse(updatedCourse)}>Update</button>
                                <button onClick={() => setEditingCourse(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => {
                                    setEditingCourse(course.course_code);
                                    setUpdatedCourse({
                                        ...course
                                        // instructor_ids: course.instructors ? course.instructors.map(instr => instr.id) : []
                                    });
                                }}>Edit
                                </button>
                                <button onClick={() => deleteCourse(course.course_code)}>Delete</button>
                            </>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CoursesView;
