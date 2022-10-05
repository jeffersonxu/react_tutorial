import { useState } from "react";
import MenuSelector from "./MenuSelector";
import CoursePlanBody from "./CoursePlanBody";
import Modal from './Modal';

const CourseList = ({courses}) => {
  const [term, setTerm] = useState(() => "Fall");
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  

  const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );

  return (
    <div>
      <MenuSelector selection={term} setSelection={setTerm} />
      <button className="course-plan-btn btn btn-outline-dark" onClick={openModal}>Course Plan</button>
      <Modal open={open} close={closeModal}>
        <CoursePlanBody selected={selected} courses={courses}></CoursePlanBody>
      </Modal>
      <FilteredCourseList term={term} courses={courses} selected={selected} toggleSelected={toggleSelected}/>
    </div>
  );
}

function CourseItem(props) {
    const {toggleSelected, selected, id, course} = props

    return (
        <div className={`card course-card m-1 p-2 ${selected.includes(id) ? 'selected' : ''}`} onClick={() => toggleSelected(id)}>
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
    const {courses, term, selected, toggleSelected} = props;    
    let filteredCourses = Object.keys(courses).reduce((p, c) => {    
        if (courses[c]['term'] === term) p[c] = courses[c];
        return p;
        }, {});
      
    const listItems = Object.keys(filteredCourses).map((key) =>
        <CourseItem key={key}
                    id={key}
                    course = {filteredCourses[key]}
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