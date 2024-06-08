/*
values: form value,
type: key type, -> 'nickName', 'sex', 'email', 'desc',
ref: toastRef,
toast: chakura Toast instance
toastId: toast id -> error

return: boolean
*/
export const beforeUpdateValid = (value, type, ref, toast, toastId) => {
  // no value
  if (value.length === 0) {
    if (!toast.isActive(toastId)) {
      ref.current = toast({
        id: toastId,
        title: 'please input info',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast.update(ref.current, {
        id: toastId,
        title: 'please input info',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
    return false;
  }
  switch (type) {
    
    case 'nickName':
      {
        if (value.length >= 24) {
          if (!toast.isActive(toastId)) {
            ref.current = toast({
              id: toastId,
              title: 'nickName length too long',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top',
            });
          } else {
            toast.update(ref.current, {
              id: toastId,
              title: 'nickName length too long',
              status: 'error',
              isClosable: true,
              position: 'top',
            });
          }
          return false;
        }
        return true;
      }
    
    case 'sex':
      {
        if (!['M', 'F'].includes(value)) {
          if (!toast.isActive(toastId)) {
            ref.current = toast({
              id: toastId,
              title: 'sex value error',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top',
            });
          } else {
            toast.update(ref.current, {
              id: toastId,
              title: 'sex value error',
              status: 'error',
              isClosable: true,
              position: 'top',
            });
          }
          return false;
        }
        return true;
      }
    case 'email':
      {
        if (value.length >= 18) {
          if (!toast.isActive(toastId)) {
            ref.current = toast({
              id: toastId,
              title: 'email length too long',
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top',
            });
          } else {
            toast.update(ref.current, {
              id: toastId,
              title: 'email length too long',
              status: 'error',
              isClosable: true,
              position: 'top',
            });
          }
          return false;
        }
        // reg test email
        return true;
      }

    case 'desc':
      return true;
    
    // other type -> error
    default:
      return false;
  }
};