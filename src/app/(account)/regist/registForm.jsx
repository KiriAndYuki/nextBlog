'use client';
import { useState, useRef } from 'react';
import { Input, Button, useToast, InputGroup, InputRightElement } from '@chakra-ui/react';
import { beforeSubmitValid } from './util';
import useFormState from '@/hooks/useFormState';
import { createUser } from '../../db/userActions';
import { aesCrypto, responseToast, dbErrorToast } from '@/utils';

const RegistForm = () => {

  const [loading, setLoading] = useState(false);
  const [values, setFormState, resetForm] = useFormState({
    account: '',
    pwd: '',
    check: '',
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const toastRef = useRef();

  const toast = useToast();
  const errId = 'registErr';

  const submitRegist = async () => {
    if (!beforeSubmitValid(values, toastRef, toast, errId)) {
      return;
    }
    setLoading(true);
    const encryptPwd = aesCrypto(values.pwd, 'en');
    try {
      const res = await createUser({ account: values.account, password: encryptPwd });
      console.log(res);
      responseToast(res, toastRef, toast, errId, resetForm);
    } catch(e) {
      console.log(e);
      dbErrorToast(e, toast);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <label className="text-xl self-start mb-2">Account:</label>
        <Input
          className="mb-4"
          placeholder="Input your account"
          borderColor="blue.300"
          _hover={{ borderColor: "blue.500"}}
          size="lg"
          value={values.account}
          onChange={e => setFormState({ account: e.target.value })}
        />
        <label className="text-xl self-start mt-2 mb-2">Password:</label>
        <InputGroup size='lg' className="mb-4">
          <Input
            pr='4.5rem'
            placeholder="Input your password"
            borderColor="blue.300"
            _hover={{ borderColor: "blue.500"}}
            size="lg"
            type={showPwd ? 'text' : 'password'}
            value={values.pwd}
            onChange={e => setFormState({ pwd: e.target.value })}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <label className="text-xl self-start mb-2">Check your Password:</label>
        <InputGroup size='lg'>
          <Input
            placeholder="Check your password"
            borderColor="blue.300"
            _hover={{ borderColor: "blue.500"}}
            size="lg"
            type={showCheck ? 'text' : 'password'}
            value={values.check}
            onChange={e => setFormState({ check: e.target.value })}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => setShowCheck(!showCheck)}>
              {showCheck ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
      <div className="flex flex-col items-center w-full mt-4 gap-y-4">
        <Button onClick={submitRegist} colorScheme="teal" isLoading={loading} loadingText='Submitting' width="100%">Regist</Button>
      </div>
    </>
  );
};

export default RegistForm;