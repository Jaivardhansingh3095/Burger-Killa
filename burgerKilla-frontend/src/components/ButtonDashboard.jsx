import { RiDashboardHorizontalFill } from 'react-icons/ri';

import { NavLink } from 'react-router';

function ButtonDashboard() {
  return (
    <NavLink
      role="button"
      to="/admin"
      className="items-start justify-center hidden gap-2 xl:flex"
    >
      <RiDashboardHorizontalFill className="w-6 h-6" />
      <span className="lg:text-lg">DB</span>
    </NavLink>
  );
}

export default ButtonDashboard;
