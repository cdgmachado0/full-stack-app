import React, {
    useEffect,
    useContext,
    useState,
} from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context';
import url from '../baseUrl';

import Header from './Header';
import ErrorValidation from './ErrorValidation';



function UpdateCourse(props) {
    const { actions, ownerId, authenticatedUser, errors } = useContext(Context);
    const [ course, setDetails ] = useState({});
    const { id } = props.match.params;
    const fullUrl = url + '/courses/' + id;
    const path = `/courses/${id}`;

    useEffect(() => {
        let isMounted = true
        fetch(fullUrl)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    actions.setOwner(data.course.Student.id);
                    setDetails(data.course);
                }
            })
            .catch(err => console.log(err));
        return () => {
            isMounted = false;
        }
    }, [actions, fullUrl]);
    






    const revertMarkdown = items => {
        const a = items.split('*');
        a.shift();
        const noMark = a.map(elem => elem.trimStart());
        return noMark.join('');
    }


    return (
        <React.Fragment>
            {!ownerId ? <div/> : authenticatedUser && +authenticatedUser.id === ownerId ?
                <React.Fragment>
                    <Header />
                    <main>
                        <div className="wrap">
                            <h2>Update Course</h2>
                            { errors && errors.length > 0 ? <ErrorValidation errors={errors} /> : '' }
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
                                        <EstimatedTime estimated={course.estimatedTime ? course.estimatedTime : ''} />
                                        <MaterialsNeeded materials={course.materialsNeeded ? revertMarkdown(course.materialsNeeded) : ''} />
                                    </div>
                                </div>
                                <button className="button" type="submit" onClick={(e) => actions.handleCourseUserInter(e, fullUrl, 'PUT')}>Update Course</button><button className="button button-secondary" onClick={(e) => actions.goBack(e, path)}>Cancel</button>
                            </form>
                        </div>
                    </main>
                </React.Fragment>
                :
                <Redirect to='/forbidden' />
             }  
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