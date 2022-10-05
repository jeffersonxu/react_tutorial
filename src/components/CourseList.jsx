import { useState } from "react";
import MenuSelector from "./MenuSelector";

const CourseList = ({courses}) => {
  const [selection, setSelection] = useState(() => "Fall");
  return (
    <div>
      <MenuSelector selection={selection} setSelection={setSelection} />
      <FilteredCourseList selection={selection} courses={courses}/>
    </div>
  );
}

function CourseItem(props) {
    return (
        <div className="card course-card m-1 p-2">
            <div className="card-body">
                <h5 className="card-title">{props.term} {props.number}</h5>
                <p className="card-text">{props.title}</p>                   
                <hr></hr>       
                <p className="card-text">{props.time}</p>                        
            </div>        
        </div>
    )
}

function FilteredCourseList(props) {
    let courses = props.courses;
    var filteredCourses = Object.keys(courses).reduce((p, c) => {    
        if (courses[c]['term'] === props.selection) p[c] = courses[c];
        return p;
        }, {});
      
    const listItems = Object.keys(filteredCourses).map((key) =>
        <CourseItem key={key}
                    term={filteredCourses[key]['term']} 
                    number={filteredCourses[key]['number']}
                    title={filteredCourses[key]['title']}
                    time={filteredCourses[key]['meets']}>
        </CourseItem>
    );

    return (        
        <div className="course-list">
            {listItems}
        </div>               
    );

}

export default CourseList;