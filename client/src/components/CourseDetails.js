import React, {
    useEffect,
    useContext,
    useState
} from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import url from '../baseUrl';

import Header from './Header';

function CourseDetails(props) {
    const { actions } = useContext(Context);
    const [ course, setDetails ] = useState({});
    const fullUrl = url + props.match.url;
    const { id } = props.match.params;

    useEffect(() => {
        actions.getCourseDetails(fullUrl)
            .then(data => setDetails(data.course))
    }, [actions, fullUrl]);

    const confirmDeletion = async () => {
        const choice = prompt("Type 'Y' to confirm");
        if (choice.toLowerCase() === 'y') {
            await actions.deleteCourse(id);
            window.location.href = '/';
        }
    }
    
    return(
        <React.Fragment>
            <Header />
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        <Link to={`/update/${course.id}`} className="button">Update Course</Link>
                        <button className="button" onClick={confirmDeletion}>Delete Course</button>
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
    const { materials } = props;
    let arrMaterials = materials.split('*');
    if (arrMaterials[0] === '') {
        arrMaterials.shift()
    }
    const createList = () => arrMaterials.map((material, index) => <li key={index}>{material}</li>);

    return (
        <React.Fragment>
            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
                {createList()}
            </ul>
        </React.Fragment>
    );
}


export default CourseDetails;




