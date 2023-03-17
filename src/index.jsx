import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { EditProvider } from "./utils/context"
import AuthGuard from "./helpers/AuthGuard"
import GlobalStyle from "./utils/style/GlobalStyle"
import LandingPage from "./pages/LandingPage"
import Feed from "./pages/Feed"
import Profile from "./pages/Profile"
import PostView from "./pages/PostView"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <EditProvider>
                <GlobalStyle />
                <Routes>
                    <Route path="/*" element={<LandingPage />} />
                    <Route
                        path="/home"
                        element={
                            <AuthGuard>
                                <Feed />
                            </AuthGuard>
                        }
                    />
                    <Route
                        index
                        path="/post"
                        element={
                            <AuthGuard>
                                <PostView />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <AuthGuard>
                                <Profile />
                            </AuthGuard>
                        }
                    />
                </Routes>
            </EditProvider>
        </BrowserRouter>
    </React.StrictMode>
)
