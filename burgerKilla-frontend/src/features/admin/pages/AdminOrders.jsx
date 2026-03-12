import OrderManagement from "../features/orders/OrderManagement";

function AdminOrders() {
  return (
    <div className="w-full h-full px-5 pt-2">
      <div className="flex flex-col items-start justify-start w-full h-full gap-2">
        <h2 className="w-full pb-3 text-lg font-bold tracking-wide text-left border-b-2 md:text-2xl sm:text-xl xl:text-3xl text-amber-500 text-shadow-2xs text-shadow-amber-900 dark:text-shadow-none dark:text-text-primary-dark border-b-amber-600 dark:border-b-gray-200">
          Orders Management
        </h2>
        <div className="w-full grow-1">
          <OrderManagement />
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
