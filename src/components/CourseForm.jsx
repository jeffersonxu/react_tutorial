import {useRef} from 'react';
import { Link, useParams } from "react-router-dom";
function CourseForm(props) {
    let { id } = useParams();
    let course = props.courses[id]
    const ref = useRef(null);

    const handleSubmit = () => {
        console.log("test")
    }

    return(
        <>
            <Link to="/">
                <button type="button" className="btn btn-danger">Cancel</button>                      
            </Link>            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" ref={ref} defaultValue={course.title} />                
                </div>
                <div className="form-group">
                    <label htmlFor="meeting_time">Meeting Time</label>
                    <input type="text" className="form-control" id="meeting_time" ref={ref} defaultValue={course.meets}/>
                </div>
            </form>
        </>
    )
}

export default CourseForm;