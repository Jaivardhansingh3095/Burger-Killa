import EmployeeManagement from '../features/employees/EmployeeManagement';

function AdminEmployees() {
  return (
    <div className="w-full h-full px-5 pt-2">
      <div className="flex flex-col items-center justify-start w-full h-full gap-2">
        <h2 className="text-3xl font-bold tracking-wide text-center text-gray-800 dark:text-text-primary-dark">
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
