import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';


import './App.css'
import RootLayoutUser, { loaderHotel } from './pages/root/RootUser/index.jsx';
import HomePage from './pages/Home/index.jsx';
import { queryClient } from './util/configHttp.js';

import Infomation, { loaderProfile } from './pages/Infomation/index.jsx';
import YourProfile from './component/Profile/index.jsx';
import ChangePass from './component/Profile/ChangePassword/index.jsx';
import RootBusiness, { loaerBusiness } from './pages/root/RootBusiness/index.jsx';
import RegisterBusiness, { loaderRegisterBusiness } from './pages/Cooperate/RegisterBusiness/index.jsx';
import Cooperate from './pages/Cooperate/index.jsx';
import Dashboard from './pages/Business/DashBoard.jsx';
import ManageRoom from './pages/Business/ListHotels.jsx';
import ListRoom, { loaderRoom } from './pages/Business/Rooms.jsx';
import RootAdmin from './pages/root/RootAdmin/index.jsx';
import HotelDetail, { loaderIdHotel } from './pages/HotelDetail/HotelDetail.jsx';


const routers = createBrowserRouter([
    {
        path: "/",
        element: <RootLayoutUser />,
        id: "rootUser",
        loader: loaderHotel,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "infomation",
                element: <Infomation />,
                id: "infomation",
                loader: loaderProfile,
                children: [
                    {
                        index: true,
                        element: <YourProfile />
                    },
                    {
                        path: "password",
                        element: <ChangePass />
                    }
                ]
            },
            {

                path: "cooperate",
                element: <Cooperate/>,
                children: [
                    {
                        index: true,
                        element: <RegisterBusiness />,
                        loader: loaderRegisterBusiness
                    }
                ]
            },
            {
                path: "hotel/:id",
                element: <HotelDetail/>,
                loader: loaderIdHotel
            },
            {
                path:"booking/:id",
                
            }

        ]
    },
    {
        path: "business",
        element: <RootBusiness />,
        id: "rootBusiness",
        loader: loaerBusiness,
        children: [
            {
                index: true, // Thêm đoạn này để xử lý redirect từ /business
                element: <Navigate to="dashboard" />
            },
            {
                path:"dashboard",
                element: <Dashboard/>
            },
            {
                path: "hotel",
                element: <ManageRoom/>
            },
            {
                path: "hotel/:id",
                element: <ListRoom/>,
                loader: loaderRoom
            }
        ]
    },
    
])


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routers} />
        </QueryClientProvider>
    )
}

export default App
