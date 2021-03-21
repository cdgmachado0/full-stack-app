import React from 'react';

function CourseTemplate(props) {
    return (
        <a className="course--module course--link" href={`/courses/${props.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{props.name}</h3>
        </a>
    );
}


export default CourseTemplate;