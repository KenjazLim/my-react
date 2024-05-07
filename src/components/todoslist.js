import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodosApp = () => {
  const [displayName, setDisplayName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [sectionCode, setSectionCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [idPicture, setIdPicture] = useState(null); // Changed to null initially
  const [todos, setTodos] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("Todo List");
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleSchoolIdChange = (event) => {
    setSchoolId(event.target.value);
  };

  const handleSectionCodeChange = (event) => {
    setSectionCode(event.target.value);
  };

  const handleCourseDescriptionChange = (event) => {
    setCourseDescription(event.target.value);
  };

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleAcademicYearChange = (event) => {
    setAcademicYear(event.target.value);
  };

  const handleIdPictureChange = (event) => {
    // Retrieve the uploaded file
    const file = event.target.files[0];
    setIdPicture(file);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!editingTodoId) {
      const todo = {
        id: uuidv4(),
        displayName,
        schoolId,
        sectionCode,
        courseDescription,
        courseName,
        academicYear,
        idPicture: idPicture ? URL.createObjectURL(idPicture) : null, // Set the URL of the uploaded image
      };
      setTodos([...todos, todo]);
      setDisplayName("");
      setSchoolId("");
      setSectionCode("");
      setCourseDescription("");
      setCourseName("");
      setAcademicYear("");
      setIdPicture(null); // Reset the idPicture state
    } else {
      // Editing existing todo
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodoId
          ? {
              ...todo,
              displayName,
              schoolId,
              sectionCode,
              courseDescription,
              courseName,
              academicYear,
              idPicture,
            }
          : todo
      );
      setTodos(updatedTodos);
      setEditingTodoId(null);
      setDisplayName("");
      setSchoolId("");
      setSectionCode("");
      setCourseDescription("");
      setCourseName("");
      setAcademicYear("");
      setIdPicture(null); // Reset the idPicture state
    }
    setHeaderTitle("Todo List");
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setDisplayName(todoToEdit.displayName);
    setSchoolId(todoToEdit.schoolId);
    setSectionCode(todoToEdit.sectionCode);
    setCourseDescription(todoToEdit.courseDescription);
    setCourseName(todoToEdit.courseName);
    setAcademicYear(todoToEdit.academicYear);
    setIdPicture(todoToEdit.idPicture);
    setEditingTodoId(id);
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <h1 className="header">{headerTitle}</h1>
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={handleDisplayNameChange}
            />
            <input
              type="text"
              placeholder="School ID"
              value={schoolId}
              onChange={handleSchoolIdChange}
            />
            <input
              type="text"
              placeholder="Section Code"
              value={sectionCode}
              onChange={handleSectionCodeChange}
            />
            <input
              type="text"
              placeholder="Course Description"
              value={courseDescription}
              onChange={handleCourseDescriptionChange}
            />
            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={handleCourseNameChange}
            />
            <input
              type="text"
              placeholder="Academic Year"
              value={academicYear}
              onChange={handleAcademicYearChange}
            />
            <input
              type="file" // Change input type to "file"
              accept="image/*" // Accept only image files
              onChange={handleIdPictureChange} // Handle file change
            />
            <button type="submit">
              {editingTodoId ? "Edit" : "Add"}
            </button>
          </form>
        </div>
        <div className="user-profiles">
          {todos.map((todo) => (
            <div className="user-profile" key={todo.id}>
              <h2>User Profile:</h2>
              <p>ID: {todo.id}</p>
              <p>Display Name: {todo.displayName}</p>
              <p>School ID: {todo.schoolId}</p>
              <p>Section Code: {todo.sectionCode}</p>
              <p>Course Description: {todo.courseDescription}</p>
              <p>Course Name: {todo.courseName}</p>
              <p>Academic Year: {todo.academicYear}</p>
              <p>ID Picture: {todo.idPicture ? <img src={todo.idPicture} alt="ID" /> : "No picture uploaded"}</p>
              <div className="user-profile-actions">
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <button onClick={() => handleEdit(todo.id)}>Edit</button>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default TodosApp;
