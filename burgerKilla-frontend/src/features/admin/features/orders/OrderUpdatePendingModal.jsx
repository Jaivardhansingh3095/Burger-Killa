import LoaderSpinner from "../../../../components/LoaderSpinner";

function OrderUpdatePendingModal() {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-full h-full"
    >
      <div className="">
        <LoaderSpinner content="Please wait a moment" />
      </div>
    </div>
  );
}

export default OrderUpdatePendingModal;
