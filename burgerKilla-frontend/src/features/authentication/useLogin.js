import { useMutation } from '@tanstack/react-query';
import { login as apiLogin } from '../../services/apiUser';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { updateUserProfile } from './userSlice';
import { useDispatch } from 'react-redux';

function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }) => apiLogin({ email, password }),
    onSuccess: (data) => {
      //queryClient.setQueryData(['user'], loginData);
      dispatch(updateUserProfile(data));
      toast.success('You are logged in!', {
        position: 'bottom-right',
      });
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.error(err.message, err.statusCode, err.stack);
      toast.error('Incorrect email or password!');
    },
  });

  return { login, isLogging };
}

export default useLogin;
