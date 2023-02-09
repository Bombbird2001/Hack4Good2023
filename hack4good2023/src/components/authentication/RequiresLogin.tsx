import {Navigate} from 'react-router-dom'
import {useTypedSelector} from '../../utilities/typedReduxHooks'

const RequiresLogin = (args: { component: JSX.Element }): JSX.Element => {
    const loggedIn = useTypedSelector(state => state.session.loggedIn)

    return (loggedIn) ? args.component : <Navigate to={"/login"} replace/>
}

export default RequiresLogin