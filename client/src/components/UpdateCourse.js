import React, {
    useEffect,
    useContext,
    useState,
    useRef
} from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context';
import url from '../baseUrl';

import Header from './Header';



function UpdateCourse(props) {
    const { actions, ownerId, authenticatedUser } = useContext(Context);
    const [ course, setDetails ] = useState({});
    const { id } = props.match.params;
    const fullUrl = url + '/courses/' + id;
    const path = `/courses/${id}`;
    
    // const useComponentWillMount = func => {
    //     const willMount = useRef(true);
    //     if (willMount.current) {
    //       func();
    //     }
    // }

    // useComponentWillMount(() => console.log("willMount"));
    let ownerRef = useRef();

    useEffect(() => {
        actions.getCourseDetails(fullUrl)
            .then(data => {
                // ownerRef.current = data.course.Student.id;
                actions.setOwner(data.course.Student.id);
                setDetails(data.course);
                // actions.setOwner(data.course.Student.id);
            });
    }, [actions, fullUrl]);

    

    const updateDetails = async (e, id) => {
        const body = actions.getFormData(e);
        await actions.updateCourse(JSON.stringify(body), id);
        window.location.href = `/courses/${id}`;
    }

    const compareTwo = () => +authenticatedUser.id === ownerId;
    console.log(ownerId);
    // console.log('This is one: ', authenticatedUser.id);
    // console.log('This is the other: ', ownerId);
    // console.log(compareTwo());
    // console.log(ownerRef);
    // && +authenticatedUser.id === ownerId 
    return (
        <React.Fragment>
            {ownerId === '' ? <div/> : authenticatedUser && +authenticatedUser.id === ownerId ? //did it but with a warning: check it
                <React.Fragment>
                    <Header />
                    <main>
                        <div className="wrap">
                            <h2>Update Course</h2>
                            <form>
                                <div className="main--flex">
                                    <div>
                                        <label htmlFor="courseTitle">Course Title</label>
                                        <input id="courseTitle" name="title" type="text" defaultValue={course.title} />

                                        <label htmlFor="courseAuthor">Course Author</label>
                                        <input id="courseAuthor" name="courseAuthor" type="text" defaultValue={course.Student ? `${course.Student.firstName} ${course.Student.lastName}` : ''} />

                                        <label htmlFor="courseDescription">Course Description</label>
                                        <textarea id="courseDescription" name="description" defaultValue={course.description} />
                                    </div>
                                    <div>
                                        {course.estimatedTime ?
                                            <EstimatedTime estimated={course.estimatedTime} /> :
                                                ''
                                        }
                                        {course.materialsNeeded ?
                                            <MaterialsNeeded materials={course.materialsNeeded} /> :
                                                ''
                                        } 
                                    </div>
                                </div>
                                <button className="button" type="submit" onClick={(e) => updateDetails(e, id)}>Update Course</button><button className="button button-secondary" onClick={(e) => actions.goBack(e, path)}>Cancel</button>
                            </form>
                        </div>
                    </main>
                </React.Fragment>
                :
                <Redirect to={'/forbidden'} />
             }
            <Header />
            
        </React.Fragment>
    );
}

function EstimatedTime(props) {
    return (
        <React.Fragment>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={props.estimated} />
        </React.Fragment>
    );
}

function MaterialsNeeded(props) {
    return (
        <React.Fragment>
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={props.materials} />
        </React.Fragment>
    );
} 




export default UpdateCourse;