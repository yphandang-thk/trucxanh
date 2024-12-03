import React from "react";
import { useSearchParams } from 'react-router-dom'

const CoursePage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const courseType = searchParams.get('type');
    return (
        <>
            <div>Đây là trang danh sách khóa học</div>
            {courseType ? (
                <div>Có type khóa học là: {courseType}</div>
            ) : null}
        </>
    );
}

export default CoursePage;