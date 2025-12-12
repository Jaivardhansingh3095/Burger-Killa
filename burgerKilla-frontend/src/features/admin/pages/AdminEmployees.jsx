import EmployeeManagement from '../features/employees/EmployeeManagement';

function AdminEmployees() {
  return (
    <div className="w-full h-full px-5 pt-2">
      <div className="flex flex-col items-start justify-start w-full h-full gap-2">
        <h2 className="w-full pb-3 text-3xl font-bold tracking-wide text-left text-gray-800 border-b-2 dark:text-text-primary-dark border-b-gray-700 dark:border-b-gray-200">
          Employees Management
        </h2>
        <div className="w-full grow-1">
          <EmployeeManagement />
        </div>
      </div>
    </div>
  );
}

export default AdminEmployees;
