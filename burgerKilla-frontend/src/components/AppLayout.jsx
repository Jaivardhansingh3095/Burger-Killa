import { Outlet, useLocation } from 'react-router';

import Footer from './Footer';
import Nav from './Nav';

function AppLayout() {
  const location = useLocation();

  return (
    <div className="grid h-auto  grid-rows-[auto_1fr_auto] text-gray-700 font-roboto">
      <Nav />
      <main className="w-full">
        <Outlet />
      </main>
      {location.pathname === '/menu' ||
      location.pathname === '/checkout' ||
      location.pathname.includes('/pay') ? null : (
        <Footer />
      )}
    </div>
  );
}

export default AppLayout;
