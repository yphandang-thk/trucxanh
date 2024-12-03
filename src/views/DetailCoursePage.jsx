import React from "react";
import { useParams } from 'react-router-dom'

const DetailCoursePage = ({ courseId }) => {
    const params = useParams();
    return (
        <>
            <div>Đây là khóa học có id là : {params.courseId}</div>
        </>
    );
}

export default DetailCoursePage;