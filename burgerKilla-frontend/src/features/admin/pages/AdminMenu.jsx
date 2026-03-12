import MenuEdit from '../features/menu/MenuEdit';

function AdminMenu() {
  return (
    <div className="w-full h-full px-5 pt-2">
      <div className="flex flex-col items-center justify-start w-full h-full gap-2">
        <h2 className="w-full pb-3 text-3xl font-bold tracking-wide text-left border-b-2 text-amber-500 text-shadow-2xs text-shadow-amber-900 dark:text-shadow-none dark:text-text-primary-dark border-b-amber-600 dark:border-b-gray-200">
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
