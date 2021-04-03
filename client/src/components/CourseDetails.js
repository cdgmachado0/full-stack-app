import React, {
    useEffect,
    useContext,
    useState
} from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Context } from '../Context';
import url from '../baseUrl';

import Header from './Header';

function CourseDetails(props) {
    const { actions, authenticatedUser, ownerId } = useContext(Context);
    const [ course, setDetails ] = useState({});
    const fullUrl = url + props.match.url;
    
    useEffect(() => {
        fetch(fullUrl)
            .then(res => res.json())
            .then(data => {
                setDetails(data.course);
                actions.setOwner(data.course.Student.id);
            })
            .catch(err => console.log(err));
    }, [actions, fullUrl]); 

    const confirmDeletion = async () => {
        const choice = prompt("Type 'Y' to confirm");
        if (choice && choice.toLowerCase() === 'y') {
            await actions.setCourseDetails(null, fullUrl, 'DELETE');
        } else {
            alert("Deletion cancelled or 'Y' wasn't typed");
        }
    }
   
    return(
        <React.Fragment>
            <Header />
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {authenticatedUser && +authenticatedUser.id === ownerId ?
                            <React.Fragment>
                                <Link to={`/update/${course.id}`} className="button">Update Course</Link>
                                <button className="button" onClick={confirmDeletion}>Delete Course</button>
                            </React.Fragment>
                            :
                            ''
                        }
                        <Link to='/' className="button button-secondary">Return to List</Link>
                    </div>
                </div> 
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{course.title}</h4>
                                <p>By { course.Student ? `${course.Student.firstName} ${course.Student.lastName}` : null }</p>

                                <p>{course.description}</p>  
                            </div>
                            <div>
                                {course.estimatedTime ? 
                                    <EstimatedTime estimated={course.estimatedTime} /> :
                                        null
                                }
                                {course.materialsNeeded ?
                                    <MaterialsNeeded materials={course.materialsNeeded} /> :
                                        null
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </React.Fragment>
    );
}

function EstimatedTime(props) {
    return (
        <React.Fragment>
        <h3 className="course--detail--title">Estimated Time</h3>
        <p>{props.estimated}</p>
        </React.Fragment>
    );
}

function MaterialsNeeded(props) {
    const markdown = props.materials;
  
    return (
        <React.Fragment>
            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
                <ReactMarkdown source={markdown} />
            </ul>
        </React.Fragment>
    );
}


export default CourseDetails;




