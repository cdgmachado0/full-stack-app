import React, {
    useEffect,
    useContext,
    useState
} from 'react';
import { Context } from '../Context';
import url from '../baseUrl';


function CourseDetails(props) {
    const { actions } = useContext(Context);
    const [ course, setDetails ] = useState({});

    useEffect(() => {
        const fullUrl = url + props.match.url;
        actions.getCourseDetails(fullUrl)
            .then(data => setDetails(data.course))
    }, [actions, props.match.url]);
    
    return(
        <React.Fragment>
            <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul className="header--signedin">
                        <li>Welcome, Joe Smith!</li>
                        <li><a href="sign-out.html">Sign Out</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/update/${course.id}`}>Update Course</a>
                    <a className="button" href="/">Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
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


