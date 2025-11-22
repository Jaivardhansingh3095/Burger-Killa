import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './features/authentication/userSlice';

import Home from './pages/home/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import AppLayout from './components/AppLayout';
import Login from './features/authentication/Login';
import ForgetPassword from './features/authentication/ForgetPassword';
import Signup from './features/authentication/Signup';
import Checkout from './pages/Checkout';
import Profile from './features/account/pages/Profile';
import Orders from './features/account/pages/Orders';
import ManageAddress from './features/account/pages/ManageAddress';
import UpdateContact from './features/account/pages/UpdateContact';
import RefundPolicy from './components/RefundPolicy';
import PaymentSession from './features/payment/pages/PaymentSession';
import MyOrder from './pages/MyOrder';
import ThankYou from './pages/ThankYou';
import OrderConfirmed from './features/orderTracking/pages/OrderConfirmed';
import ResetPassword from './features/authentication/ResetPassword';
import AdminDashboadLayout from './components/AdminDashboadLayout';
import { DarkModeProvider } from './context/DarkModeContext';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import AdminOrders from './features/admin/pages/AdminOrders';
import AdminMenu from './features/admin/pages/AdminMenu';
import AdminTransactions from './features/admin/pages/AdminTransactions';
import AdminCustomers from './features/admin/pages/AdminCustomers';
import AdminEmployees from './features/admin/pages/AdminEmployees';
import AdminSettings from './features/admin/pages/AdminSettings';
import CreateEmployee from './features/admin/features/employees/CreateEmployee';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/menu',
        Component: Menu,
      },
      {
        path: '/checkout',
        Component: Checkout,
      },
      {
        path: '/profile',
        Component: Profile,
      },
      {
        path: '/my-orders',
        Component: Orders,
      },
      {
        path: '/manage-address',
        Component: ManageAddress,
      },
      {
        path: '/refund-policy',
        Component: RefundPolicy,
      },
      {
        path: '/update-contact',
        Component: UpdateContact,
      },
      {
        path: '/pay/:sessionId',
        Component: PaymentSession,
      },
      {
        path: '/order/:orderId',
        Component: OrderConfirmed,
      },
      {
        path: '/order',
        Component: MyOrder,
      },
      {
        path: '/thank-you/:orderId',
        Component: ThankYou,
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/forgetpassword',
    Component: ForgetPassword,
  },
  {
    path: '/signup',
    Component: Signup,
  },
  {
    path: '/resetPassword/:resetToken',
    Component: ResetPassword,
  },
  {
    Component: AdminDashboadLayout,
    children: [
      {
        path: '/admin',
        Component: AdminDashboard,
      },
      {
        path: '/admin/orders',
        Component: AdminOrders,
      },
      {
        path: '/admin/menu',
        Component: AdminMenu,
      },
      {
        path: '/admin/transactions',
        Component: AdminTransactions,
      },
      {
        path: '/admin/Customers',
        Component: AdminCustomers,
      },
      {
        path: '/admin/employees',
        Component: AdminEmployees,
      },
      {
        path: '/admin/employees/create',
        Component: CreateEmployee,
      },
      {
        path: '/admin/settings',
        Component: AdminSettings,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(fetchUser());
  }, []);

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '12px' }}
          toastOptions={{
            success: {
              duration: 3000,
              removeDelay: 1000,
            },
            error: {
              duration: 5000,
              removeDelay: 1000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'white',
              color: 'black',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
