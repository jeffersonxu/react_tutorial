import { Link, useParams } from "react-router-dom";
import { useFormData } from '../utilities/useFormData';

const validateUserData = (key, val) => {
    switch (key) {
      case 'title':
        return /(^\w\w)/.test(val) ? '' : 'Title must be least two characters';
      case 'meetingTime':
        return /^(\w)+\s\d{1,2}:\d{1,2}-\d{1,2}:\d{1,2}$/.test(val) ? '' : 'must contain days and start-end, e.g., MWF 12:00-13:20';
      default: return '';
    }
  };

function CourseForm(props) {
    let { id } = useParams();
    let course = props.courses[id]
    const [state, change] = useFormData(validateUserData, course);
    const handleSubmit = () => {
        console.log("test")
    }

    return(
        <>
            <Link to="/">
                <button type="button" className="btn btn-danger">Cancel</button>                      
            </Link>            
            {state.errors && <div className="alert alert-danger" role="alert">
                {JSON.stringify(state.errors)}
            </div>
            }
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" className="form-control" id="title" defaultValue={course.title} state={state} onChange={change} />                
                </div>
                <div className="form-group">
                    <label htmlFor="meeting_time">Meeting Time</label>
                    <input name="meetingTime" type="text" className="form-control" id="meetingTime" defaultValue={course.meets} state={state} onChange={change}/>
                </div>
            </form>
        </>
    )
}

export default CourseForm;