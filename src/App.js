import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/courses/`,
});

class App extends Component {
  state = {
    courses: [],
  };

  constructor() {
    super();
    this.getCourses();
  }

  getCourses = async () => {
    try {
      let data = await api.get("/").then(({ data }) => data);
      this.setState({ courses: data });
    } catch (err) {
      console.log(err);
    }
  };

  createCourse = async () => {
    let res = await api
      .post("/", {
        title: "Test",
        id: 4,
        author: "Ertuğrul Emre Cihan",
      })
      .catch((err) => console.log(err));
    console.log(res);
    this.getCourses();
  };

  deleteCourse = async (id) => {
    let data = await api.delete(`/${id}`);
    this.getCourses();
  };

  updateCourse = async (id, val) => {
    let data = await api.patch(`/${id}`, { title: val });
    this.getCourses();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.createCourse}>Create New Course</button>
          {this.state.courses.map((course) => (
            <h2
              key={course.id}
              onClick={() => this.updateCourse(course.id, `${course.title}a`)}
            >
              {course.title}
              <button onClick={() => this.deleteCourse(course.id)}>X</button>
            </h2>
          ))}
        </header>
      </div>
    );
  }
}

export default App;
