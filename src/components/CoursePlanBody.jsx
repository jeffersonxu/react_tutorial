
function CoursePlanBody(props) {
    const { courses, selected } = props;
    

    return(
        <div>
            <h2>Course Plan</h2>
            {
                courses.length === 0
                ? <p>No courses have been added yet. To do so just click on any of the courses 
                    and you will see the course highlighted once selected. To unselect a course 
                    simply click on it again and the background color will go back to white.</p>
                :             
                <ul>
                    {selected.map(key => (
                        <li key={key}>
                            {courses[key].term} {courses[key].number} : {courses[key].title} - {courses[key].meets}
                        </li>
                    ))}
                </ul>
            }
        </div>        
    )
}

export default CoursePlanBody;