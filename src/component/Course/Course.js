import React,{Component} from 'react';
import './course.css';
import {Link} from 'react-router-dom';
class Course extends Component{
  render(){
    return(
      <div class="container">
        <h1>Course</h1>
          <CourseYear title="2018 เทอม1"/>
          <CourseYear title="2017 เทอม2"/>
      </div>
    );
  }
}
class CourseYear extends Component{
  render(){
    return(
      <div class="card">
        <div class="card-header">
          <h2>{this.props.title}</h2>
        </div>
        <div class="card-body">
          <div class="card-group">
            <CourseHead title="Webtech"/>
            <CourseHead title="Coding"/>
            <CourseHead title="Telecom"/>
            <CourseHead title="Database"/>
          </div>

      </div>
      </div>
    );
  }
}

class CourseHead extends Component{
  render(){
    return(
      <div class="card col blog-course"><Link class="nav-link" to="/subject">
          <div class="card-body ">
              <h3 class="card-text">{this.props.title}</h3>
              <p class="text-primary">by Jakkapat Boonroj</p>
          </div></Link>
          <img class="card-img-bottom img-course" src="img/education.jpg" alt="card"/>

    </div>
    );
  }
}



export default Course;
