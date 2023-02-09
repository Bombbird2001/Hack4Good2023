import {Navigate} from 'react-router-dom'
import {useTypedSelector} from '../../utilities/typedReduxHooks'

const NotLoggedIn = (args: { component: JSX.Element }): JSX.Element => {
    const loggedIn = useTypedSelector(state => state.session.loggedIn)

    return (!loggedIn) ? args.component : <Navigate to={"/profile"} replace/>
}

export default NotLoggedIn