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

function CourseList(props) {
    let courses = props.courses;
    const listItems = Object.keys(courses).map((key) =>
        <CourseItem key={key}
                    term={key} 
                    number={courses[key]['number']}
                    title={courses[key]['title']}
                    time={courses[key]['meets']}>
        </CourseItem>
    );

    return (
        <div className="course-list">
            {listItems}
        </div>       
    );
}

export default CourseList;