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
        path: "/profile",
        element: <RequiresLogin component={<Profile/>}/>
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
