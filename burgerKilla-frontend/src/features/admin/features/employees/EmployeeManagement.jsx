import { FaPlus } from 'react-icons/fa';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

import { Link } from 'react-router';
import EmployeesTable from './EmployeesTable';

function EmployeeManagement() {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-10">
      <div className="flex items-center justify-start w-full gap-20 px-5 pt-10">
        <span className="text-xl font-semibold tracking-wide text-gray-700 dark:text-text-primary-dark">
          Create employee account
        </span>
        <Link
          to="/admin/employees/create"
          className="flex items-center justify-center gap-2 px-8 py-2 text-white rounded-sm bg-primary dark:bg-primary-dark hover:bg-primary/90 hover:dark:bg-primary-dark/90 inset-shadow-[1px_-1px_5px] inset-shadow-amber-800 dark:inset-shadow-gray-200"
        >
          <FaPlus className="w-5 h-5" />
          <span className="text-lg font-bold">Create</span>
        </Link>
      </div>
      <div className="w-full px-5 py-5 grow-1">
        <div className="flex flex-col items-start justify-start w-full h-full gap-5">
          <h3 className="text-xl font-semibold tracking-wide text-gray-700 dark:text-text-primary-dark">
            Employees Information
          </h3>
          <EmployeesTable />
        </div>
      </div>
    </div>
  );
}

export default EmployeeManagement;
