import { Link, Outlet } from 'react-router';
import { useDakMode } from '../context/DarkModeContext';
import Sidebar from '../features/admin/components/Sidebar';
import Header from '../features/admin/components/Header';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/authentication/userSlice';
import LoaderDasher from './LoaderDasher';
import { PERMITTED_ROLES } from '../utils/helpers';

function AdminDashboadLayout() {
  const [themeSelected] = useDakMode();
  const currentUser = useSelector(selectUser);

  if (currentUser.status === 'pending') {
    return (
      <div className="w-full h-full">
        <div className="md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1200px] w-full h-full mx-auto">
          <LoaderDasher />
        </div>
      </div>
    );
  }

  if (!PERMITTED_ROLES.includes(currentUser?.user?.role)) {
    return (
      <div className="w-full h-screen">
        <div className="md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1200px] w-full h-full mx-auto">
          <div className="flex flex-col items-center justify-center w-full h-full gap-10">
            <span className="text-lg font-semibold">
              You are not authrized to access this page. Please revert to
              homepage.
            </span>
            <Link
              to="/"
              className="px-6 py-3 text-xl text-white transition-colors duration-300 ease-linear rounded-lg bg-primary hover:bg-primary/85"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-screen ${themeSelected}`}>
      <div className="w-full h-full bg-background  dark:bg-background-dark grid lg:grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-2">
        <Sidebar />
        <Header />
        <main className="w-full h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboadLayout;
