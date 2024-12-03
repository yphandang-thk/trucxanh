import { Navigate, Outlet } from 'react-router-dom'

const UserRouter = ({ element }) => {
    const isAuth = true

    return isAuth ? element : <Navigate to='/login' />
}

export default UserRouter;