import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toast } from 'primereact/toast';
import { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import DefaultLayout from './layout/DefaultLayout';
import { hideToast } from './redux/features/toast';
import { routers } from './routers/routers';
import Dashboard from './screens/dashboard/components/DashBoard';
import './styles/addproduct.css';
import './styles/editprofile.css';
import './styles/product.css';
function App() {
  const dispatch = useDispatch()

  const toastOptions = useSelector((state) => state.toast)
  const toast = useRef(null)
  useEffect(() => {
    if (toastOptions.severity) {
      const show = () => {
        toast.current.show({ ...toastOptions })
      }
      show()
      dispatch(hideToast())
    }
  }, [toastOptions])
  return (
    <div>
      <Toast ref={toast} />
      <BrowserRouter>
        <Routes>
          {routers.map((route) => {
            const Page = route.page
            const DeLayout = route.isShowHeader ? DefaultLayout : Fragment
            return (
              <Route path={route.path} element={
                <DeLayout>
                  <Page />
                </DeLayout>
              } />
            )
          })}
          <Route path='/dashboard' element={
            <>
              <Dashboard />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
