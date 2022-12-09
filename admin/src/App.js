import './App.css'
import MainDash from './pages/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signin from './pages/Signin/Signin';
import Customers from './pages/Customers/Customers';
import Orders from './pages/Order/Orders';
import Frame1 from './pages/Frames/Frame1';
import SingleOrder from './pages/SingleOrderPage/SingleOrder';
import { useEffect } from 'react';
import SingleCustomer from './pages/Customers/SingleCustomer';
import TotalSpentByUser from './pages/Customers/Tables/TotalSpentByUser';
import EditOrder from './pages/SingleOrderPage/EditOrder';
import MySettings from './pages/Settings/MySettings';
import { Provider } from 'react-redux';
import store from './store/store'
import OrderThisWeek from './pages/Order/OrderFilter/OrderThisWeek';
import OrderThisMonth from './pages/Order/OrderFilter/OrderThisMonth';
import axios from 'axios';
import AddReview from './pages/Settings/Review/AddReview/AddReview';
import Page from './pages/Page/Page';
import AddPage from './pages/Page/AddPage/AddPage';
import EditPage from './pages/Page/EditPage/EditPage';
import EditReview from './pages/Settings/Review/EditReview/EditReview';
import Signup from './pages/SignUp/Signup';
import ChangePass from './pages/ChangePass/ChangePass';



function App() {

  // useEffect(() => {
   
  // }, [])

//   window.addEventListener('beforeunload',  async(e)=> {
//     e.preventDefault();
//     e.returnValue = '';
//     axios.post('')
// });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/admin/siginup" element={<Signup />} />
          <Route path="/admin/changepassword" element={<ChangePass />} />
          <Route path="/dashbord" element={<MainDash />} />
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/customers/totalspend" element={<TotalSpentByUser />}></Route>
          <Route path="/frames/one" element={<Frame1 num={1} />}></Route>
          <Route path="/pages" element={<Page />}></Route>
          <Route path="/pages/addnewpage" element={<AddPage />}></Route>
          <Route path="/pages/editpage/:pid" element={<EditPage />}></Route>
          <Route path="/settings" element={<MySettings />}></Route>
          <Route path="/settings/addreview" element={<AddReview />}></Route>
          <Route path="/settings/editreview/:rid" element={<EditReview />}></Route>
          <Route path="/orders/filter/orderthis/week" element={<OrderThisWeek />}></Route>
          <Route path="/orders/filter/orderthis/month" element={<OrderThisMonth />}></Route>
          <Route path="/orders/order/editorder/:uid" element={<EditOrder />}></Route>
          <Route path="/orders/order/:uid" element={<SingleOrder />}></Route>
          <Route path="/customers/customer/edit/:uid" element={<SingleCustomer />}></Route>
          
        </Routes>
      </BrowserRouter>
    </Provider>


  );
}

export default App;
