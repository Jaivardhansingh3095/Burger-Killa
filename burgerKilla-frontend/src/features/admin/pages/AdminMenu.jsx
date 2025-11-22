import MenuEdit from '../features/menu/MenuEdit';

function AdminMenu() {
  return (
    <div className="w-full h-full px-5 pt-2">
      <div className="flex flex-col items-center justify-start w-full h-full gap-2">
        <h2 className="text-3xl font-bold tracking-wide text-center text-gray-800 dark:text-text-primary-dark">
          Menu Management
        </h2>
        <div className="w-full grow-1">
          <MenuEdit />
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
