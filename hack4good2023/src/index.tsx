import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom"
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import Login from "./components/pages/Login"
import RequiresLogin from './components/authentication/RequiresLogin'
import NotLoggedIn from './components/authentication/NotLoggedIn'
import store, {persistor} from "./redux/store"
import './index.css'
import reportWebVitals from './reportWebVitals'
import Profile from './components/pages/Profile'
import PublicProfile from "./components/pages/PublicProfile"
import CreateAccount from "./components/pages/CreateAccount"
import Messages from "./components/pages/Messages"

const router = createBrowserRouter([
    {
        // Navigate to login screen
        path: "/",
        element: <Navigate to="login" replace/>
    },
    {
        path: "/login",
        element: <NotLoggedIn component={<Login/>}/>
    },
    {
        path: "/createAccount",
        element: <NotLoggedIn component={<CreateAccount/>}/>
    },
    {
        path: "/profile",
        element: <RequiresLogin component={<Profile/>}/>
    },
    {
        path: "/messages",
        element: <RequiresLogin component={<Messages/>}/>
    },
    {
        path: "/user/*",
        element: <PublicProfile/>
    }
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router}/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
