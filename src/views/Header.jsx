import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getPathByName } from './../utils/getPathByName';
const Header = () => {

    // const CustomLink = ({ children, to, ...props }) => {
    //     const resolved = useResolvedPath(to)
    //     const match = useMatch({ path: resolved.pathname, end: true })
    //     return (
    //         <li className={match ? 'active' : ''}>
    //             <Link to={to} {...props}>
    //                 {children}
    //             </Link>
    //         </li>
    //     )
    // }

    return (
        <header></header>
        // <header>
        //     <div>
        //         <div className='container'>
        //             <div className='index'>
        //                 <Link to="/">
        //                     <img
        //                         alt="メンエスじゃぱん"
        //                         width="230"
        //                         className="header-logo"
        //                         src="https://dev.mens-est.jp/assets/img/user/common/pharse2/layout/logo.svg?1729047519"
        //                         style={{ height: 'auto' }}
        //                     />
        //                 </Link>
        //             </div>
        //             <div className='nav'>
        //                 <NavLink className='nav-link' to={getPathByName('course')}>course</NavLink>
        //                 <NavLink className='nav-link' to={getPathByName('about')}>About</NavLink>
        //                 <CustomLink to="/" />
        //             </div>
        //         </div>
        //     </div>
        // </header>
    )
}
export default Header