function CourseItem(props) {
    return (
        <p>{props.term} {props.number} : {props.title}</p>        
    )
}

function CourseList(props) {
    let courses = props.courses;
    const listItems = Object.keys(courses).map((key) =>
        <CourseItem term={key} 
                    number={courses[key]['number']}
                    title={courses[key]['title']}>
        </CourseItem>
    );

    return (
       listItems   
    );
}

export default CourseList;