import { IoMdNotifications } from 'react-icons/io';

import { MdKeyboardArrowDown } from 'react-icons/md';

import { useSelector } from 'react-redux';
import { selectUser } from '../../authentication/userSlice';
import { camelCaseName } from '../../../utils/helpers';
import LoaderProfile from '../../../components/LoarderProfile';
import ButtonDark from './ButtonDark';

function Header() {
  const currentUser = useSelector((state) => selectUser(state));

  return (
    <div className="w-full px-5 py-2">
      <div className="flex items-center justify-end w-full gap-10">
        <ButtonDark />
        <div>
          <IoMdNotifications className="w-7 h-9 fill-primary dark:fill-primary-dark" />
        </div>
        {currentUser.status === 'pending' && <LoaderProfile />}
        {currentUser.status === 'idle' && (
          <div className="flex items-center justify-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-[#fffaca]  hover:dark:bg-[#053a47]">
            <img
              src="./default-user.jpg"
              className="w-10 h-10 rounded-full"
              alt="user profile photo"
            />
            <div className="flex flex-col items-start justify-center text-text-primary dark:text-text-primary-dark">
              <span className="text-sm font-semibold">
                {camelCaseName(currentUser?.user?.name)}
              </span>
              <span className="text-[10px] tracking-wider font-[500]">
                {camelCaseName(currentUser?.user?.role)}
              </span>
            </div>
            <MdKeyboardArrowDown className="w-7 h-7 fill-text-secondary dark:fill-text-secondary-dark" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
