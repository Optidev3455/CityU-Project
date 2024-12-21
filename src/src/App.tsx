import Home from "./pages/home/Home"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Camera from "./pages/camera/Camera"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Menu from "./components/menu/Menu"
import Chart from "./pages/chart/Chart"
import Settings from "./pages/settings/Settings"
import "./styles/global.scss"
import Heatmap from "./pages/heatmap/Heatmap"

function App() {

    const Layout = () => {
        return (
            <div className="chkScreen">
                <h1 className="screen">Your device screen width is too small for this application</h1>
                <br className="screen" />
                <h2 className="screen">Please adjust your screen size to <span style={{textDecoration: 'underline'}}>greater or equal to 1505px</span> or use a bigger monitor.</h2>
                <div className="positionContainer">
                    <img src="/arrowL.svg" alt="" className="arrow left screenImg" />
                    <img src="/monitor.svg" alt="" className="monitor screenImg" />
                    <img src="/arrowR.svg" alt="" className="arrow right screenImg" />
                </div>
                <div className="main">
                    <Navbar />
                    <div className="container">
                        <div className="menuContainer">
                            <Menu />
                        </div>
                        <div className="contentContainer">
                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/camera",
                    element: <Camera />
                },
                {
                    path: "/heatmap",
                    element: <Heatmap />
                },
                {
                    path: "/chart",
                    element: <Chart />
                },
                {
                    path: "/settings",
                    element: <Settings />
                }
            ],
        },
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default App