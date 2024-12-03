import React from "react";
import { useParams } from 'react-router-dom'

const DetailCoursePage = ({ courseId, type }) => {
    const params = useParams();
    return (
        <>
            <div>Đây là khóa học có id là : {params.courseId} và type: {params.type}</div>
        </>
    );
}

export default DetailCoursePage;