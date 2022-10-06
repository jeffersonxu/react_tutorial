import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import MenuSelector from "./MenuSelector";
import CoursePlanBody from "./CoursePlanBody";
import updateConflicts from "../utilities/helper.js"
import Modal from './Modal';
import { BsFillPencilFill } from "react-icons/bs";

const CourseList = ({courses}) => {
  const [term, setTerm] = useState(() => "Fall");
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [conflicts, setConflicts] = useState([]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );

  useEffect(() => {
    setConflicts(updateConflicts(selected, courses));
  }, [selected, courses]);
  
  return (
    <div>
      <MenuSelector selection={term} setSelection={setTerm} />
      <button className="course-plan-btn btn btn-outline-dark" onClick={openModal}>Course Plan</button>
      <Modal open={open} close={closeModal}>
        <CoursePlanBody selected={selected} courses={courses}></CoursePlanBody>
      </Modal>
      <FilteredCourseList term={term} courses={courses} conflicts={conflicts} selected={selected} toggleSelected={toggleSelected}/>
    </div>
  );
}

function CourseItem(props) {
    const {toggleSelected, selected, conflicts, id, course} = props
    let course_style = "";
    if(selected.includes(id)){
        course_style = "selected"
    } else if(conflicts.includes(course)){
        course_style = "disabled"    
    }

    return (
        <div className={`card course-card m-1 p-2 ${course_style}`} onClick={() => toggleSelected(id)}>
            <Link to={`/course/${id}`}><BsFillPencilFill/></Link>            
            <div className="card-body">            
                <h5 className="card-title">{course.term} {course.number}</h5>
                <p className="card-text">{course.title}</p>                   
                <hr></hr>       
                <p className="card-text">{course.meets}</p>                        
            </div>        
        </div>
    )    
}

function FilteredCourseList(props) {
    const {courses, term, selected, conflicts, toggleSelected} = props;    
    let filteredCourses = Object.keys(courses).reduce((p, c) => {    
        if (courses[c]['term'] === term) p[c] = courses[c];
        return p;
        }, {});
      
    const listItems = Object.keys(filteredCourses).map((key) =>
        <CourseItem key={key}
                    id={key}
                    course = {filteredCourses[key]}
                    conflicts ={conflicts}
                    selected={selected}                     
                    toggleSelected={toggleSelected}>                    
        </CourseItem>
    );

    return (        
        <div className="course-list">
            {listItems}
        </div>               
    );
}

export default CourseList;