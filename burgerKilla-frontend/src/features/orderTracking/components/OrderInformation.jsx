function OrderInformation({ orderData }) {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-5 p-2">
      <div className="w-[70%] flex items-start justify-center gap-3 p-2 border border-gray-300 border-dashed">
        <span className="font-semibold">Address:</span>
        <span className="py-.5 px-2 tracking-wide rounded-sm text-gray-600 bg-gray-200">
          {orderData.deliveryAddress.address.house.split(';').join(' ') +
            ' ,' +
            orderData.deliveryAddress.address.landmark +
            ' ,' +
            orderData.deliveryAddress.address.locality}
        </span>
      </div>
      <div></div>
    </div>
  );
}

export default OrderInformation;
