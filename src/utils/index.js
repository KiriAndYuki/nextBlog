import { AES_KEY, JWT_KEY } from '@/app/db/constants';
/*

*/
export const keyValToArr = (obj) => {

  let mainArr = [];
  Object.keys(obj).map(key => {
    // obj
    if (obj[key] && (typeof obj[key] === 'object')) {
      //except null and undefine
      mainArr = [
        ...mainArr,
        ...keyValToArr(obj[key]),
      ];
    } else {
      //value
      mainArr = [
        ...mainArr,
        {
          key,
          value: obj[key],
        },
      ];
    }
  });

  return mainArr;
};

/*
res: response data,
ref: toast ref,
toast: chakura toast instance
toatId: toast error id
afterSuccess: reset form function or you want to do some thing after success

return: void
*/
export const responseToast = (res, ref, toast, toastId, afterSuccess) => {
  if (res?.code) {
    // success
    toast({
      title: res?.msg || 'success!',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'top',
    });
    afterSuccess(res);
  } else {
    // error
    if (!toast.isActive(toastId)) {
      ref.current = toast({
        id: toastId,
        title: res?.msg || 'error!',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast.update(ref.current, {
        id: toastId,
        title: res?.msg || 'error!',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
  }
};


/*
e: error event
toast: chakura toast instance
*/
export const dbErrorToast = (e, toast) => {
  console.log('db error: ', e);
  if (!toast.isActive('dbErr')) {
    toast({
      id: 'dbErr',
      title: 'server err',
      status: 'error',
      duration: 4000,
      isClosable: true,
      position: 'top',
    });
  }
};

// cryptoJS AES 
/*
msg: message
type: encrypt(en) or decrypt(de)

return : string -> encrypt or decrypt
*/
export const aesCrypto = (msg, type = 'en') => {
  const cryptoJS = require('crypto-js');
  const key = AES_KEY;

  const options = {
    iv: cryptoJS.enc.Hex.parse('0000000000000000'),
    mode: cryptoJS.mode.ECB,
    padding: cryptoJS.pad.Pkcs7,
  };

  if (type === 'en') {
    const encrypted = cryptoJS.AES.encrypt(msg, key, options);
    return encrypted.toString();
  } else {
    const decrypt = cryptoJS.AES.decrypt(msg, key, options);
    return decrypt.toString(cryptoJS.enc.Utf8);
  }
};

// myJWT
/*
msg: message
type: encrypt(en) or decrypt(de)

return: token or { err, data }
*/
export const myJWT = (msg, type = 'en') => {
  const jwt = require('jsonwebtoken');
  const key = JWT_KEY;

  if (type === 'en') {
    return jwt.sign(msg, key);
  } else {
    // decrypt
    try {
      const decrypt = jwt.verify(msg, key);
      console.log(decrypt);
      return decrypt;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};