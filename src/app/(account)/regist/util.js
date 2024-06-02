/* valid input data
values: formStates,
ref: toastRef,
toast: chakura Toast instance
toastId: toast id -> error

return: boolean
*/
export const beforeSubmitValid = (values, ref, toast, toastId) => {
  if (values?.account.length === 0 || values?.pwd.length === 0 || values?.check.length === 0) {
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
  if (values?.account.length < 6 || values?.account.length > 18) {
    if (!toast.isActive(toastId)) {
      ref.current = toast({
        id: toastId,
        title: 'account must 6 ~ 18 char',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast.update(ref.current, {
        id: toastId,
        title: 'account must 6 ~ 18 char',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
    return false;
  }
  if (values?.pwd.length < 6 || values?.pwd.length > 12) {
    if (!toast.isActive(toastId)) {
      ref.current = toast({
        id: toastId,
        title: 'password must 6 ~ 12 char',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast.update(ref.current, { 
        id: toastId,
        title: 'password must 6 ~ 12 char',
        status: 'error',
        isClosable: true,
        position: 'top',
       });
    }
    return false;
  }
  if (values?.pwd !== values?.check) {
    if (!toast.isActive(toastId)) {
      ref.current = toast({
        id: toastId,
        title: 'entered passwords differ',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast.update(ref.current, {
        id: toastId,
        title: 'entered passwords differ',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
    return false;
  }
  return true;
};