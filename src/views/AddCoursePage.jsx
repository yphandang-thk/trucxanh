import React from "react";
import { useParams } from 'react-router-dom'

const AddCoursePage = () => {
    const params = useParams();
    return (
        <>
            <div>Đây là trang thêm khóa học</div>
        </>
    );
}

export default AddCoursePage;