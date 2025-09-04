import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { selectUser } from '../authentication/userSlice';
import { Link } from 'react-router';

function CheckoutButton({ cartTotalPrice }) {
  const currentUser = useSelector((state) => selectUser(state));

  return (
    <Link
      to={currentUser.status === 'error' ? '/login' : '/checkout'}
      disabled={currentUser.status === 'pending'}
      className="w-full bg-orange-500/90 rounded-[10px] py-3 cursor-pointer focus:outline-none hover:bg-orange-500 shadow-[4px_2px_30px_-15px_inset] shadow-orange-600 transition-all duration-200 ease-linear"
    >
      <span className="font-sans font-bold text-[1.1rem] text-gray-50 tracking-wide w-full flex justify-center items-center">
        Checkout <span className="ml-3">{formatCurrency(cartTotalPrice)}</span>
      </span>
    </Link>
  );
}

export default CheckoutButton;
