import ActiveOrdersList from '../features/orderTracking/pages/ActiveOrdersList';

function MyOrder() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-[1250px] w-full mx-auto">
        <ActiveOrdersList />
      </div>
    </div>
  );
}

export default MyOrder;
