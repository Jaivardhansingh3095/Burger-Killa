import { useMutation } from '@tanstack/react-query';
import { signup as signupAPI } from '../../services/apiUser';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from './userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function useSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: signup, isPending: isSigning } = useMutation({
    mutationFn: ({ name, email, password, phoneNumber, gender, dob }) =>
      signupAPI({ name, email, password, phoneNumber, gender, dob }),
    onSuccess: (data) => {
      dispatch(updateUserProfile(data));
      toast.success('You are logged in!', {
        position: 'bottom-right',
      });
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.error(err.message, err.statusCode, err.stack);
      toast.error('Email and phone number already exist');
    },
  });

  return { signup, isSigning };
}
