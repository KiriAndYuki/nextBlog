
/* valid input data
values: formStates,
ref: toastRef,
toast: chakura Toast instance
toastId: toast id -> error

return: boolean
*/
export const beforeSubmitValid = (values, ref, toast, toastId) => {
  if (values?.account?.length === 0 || values?.password?.length === 0) {
    if (!toast.isActive(toastId)) {
      ref.current = toast({
        id: toastId,
        title: 'please input all info',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast.update(ref.current, {
        id: toastId,
        title: 'please input all info',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
    return false;
  }

  return true;
};