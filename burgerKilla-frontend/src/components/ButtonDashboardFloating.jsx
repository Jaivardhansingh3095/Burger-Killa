import { RiDashboardHorizontalFill } from 'react-icons/ri';

import { useNavigate } from 'react-router';

function ButtonDashboardFloating() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/admin')}
      className="cursor-pointer xl:hidden fixed z-900 bottom-[30%] right-[9%] md:right-[5%] w-12 h-12 sm:w-15 sm:h-15 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors duration-300 ease-linear"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <RiDashboardHorizontalFill className="w-6 h-6 sm:w-8 sm:h-8 fill-white" />
      </div>
    </div>
  );
}

export default ButtonDashboardFloating;
