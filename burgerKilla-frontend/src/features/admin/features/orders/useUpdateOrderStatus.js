import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateOrderStatus } from "../../../../services/apiOrder";
import toast from "react-hot-toast";

export function useUpdateOrderStatus() {
  const queryClient = new QueryClient();

  const {
    mutate: updateOrder,
    status: updatingOrder,
    data: updatedOrder,
    error: updateOrderError,
  } = useMutation({
    mutationFn: ({ status, orderId }) => updateOrderStatus({ status, orderId }),
    onSuccess: () => {
      toast.success("Status updated successfully", {
        position: "top-right",
      });
      // console.log(queryClient.getQueryData(["orders-active"]));
      //queryClient.invalidateQueries(["orders-active"]);
      // console.log(queryClient.getQueryData(["orders-active"]));
      // queryClient.setQueryData(["orders-active"], (oldData) => {
      //   console.log(data, oldData);
      //   if (!oldData) return;
      //   if (!data.active) {
      //     return oldData.filter((old) => data._id !== old._id);
      //   }
      //   return oldData.map((old) =>
      //     old._id === data._id ? { ...old, status: data.status } : old
      //   );
      // });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { updateOrder, updatingOrder, updatedOrder, updateOrderError };
}
