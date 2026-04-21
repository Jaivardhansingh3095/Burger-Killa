import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordAPI } from "../../services/apiUser";

export function useUpdatePassword() {
  const {
    mutate: updatePassword,
    status: updatePasswordStatus,
    error: updateError,
  } = useMutation({
    mutationFn: ({ newPassword, oldPassword }) =>
      updatePasswordAPI({ newPassword, oldPassword }),
  });

  return { updatePassword, updatePasswordStatus, updateError };
}
