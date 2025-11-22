import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router';
import CreateEmployeeForm from './CreateEmployeeForm';

function CreateEmployee() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full px-5 pt-2">
      <div className="flex flex-col items-center justify-start w-full h-full gap-2">
        <div className="flex items-center justify-start w-full gap-2 p-3">
          <button onClick={() => navigate(-1)} className="cursor-pointer">
            <MdOutlineKeyboardBackspace className="w-8 h-8 fill-primary dark:fill-primary-dark" />
          </button>
          <h2 className="text-2xl font-bold tracking-wide text-center text-primary dark:text-primary-dark">
            Create Employee Account
          </h2>
        </div>

        <div className="flex items-center justify-center w-full p-3 grow-1">
          <CreateEmployeeForm />
          <div className="h-full flex-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
