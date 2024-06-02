'use client';
import { useState, useRef } from 'react';
import { Input, Button, useToast, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import useFormState from '@/hooks/useFormState';
import { beforeSubmitValid } from './utils';
import { responseToast, dbErrorToast } from '@/utils';
import { login } from '@/app/db/userActions';
import { aesCrypto } from '@/utils';

const LoginForm = () => {

  const [values, setFormState, resetForm] = useFormState({
    account: '',
    password: '',
  });

  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const toastRef = useRef();

  const toast = useToast();
  const errId = 'loginErr';

  const router = useRouter();

  const afterSuccess = (res) => {
    const {
      account,
      userId,
      nickName,
      token,
    } = res?.data || {};
    localStorage.setItem('userInfo', JSON.stringify({
      account,
      userId,
      nickName,
    }));
    localStorage.setItem('yuki_token', token);
    resetForm();
    router.push(`/profile?id=${userId}`);
  };

  const handleSubmit = async () => {
    // valid data
    if (!beforeSubmitValid(values, toastRef, toast, errId)) {
      return;
    }
    setLoading(true);
    const encryptPwd = aesCrypto(values.password, 'en');
    try {
      const res = await login({
        account: values.account,
        password: encryptPwd,
      });
      console.log(res);
      responseToast(res, toastRef, toast, errId, afterSuccess);
    } catch (e) {
      dbErrorToast(e, toast);
    }
    console.log('account:  ', values.account);
    console.log('password:  ', values.password);
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <label className="text-xl self-start mb-2 text-black">Account:</label>
        <Input
          className="mb-4"
          placeholder="Input your account"
          borderColor="blue.300"
          color="black"
          _hover={{ borderColor: "blue.500"}}
          size="lg"
          value={values.account}
          onChange={e => {setFormState({ account: e.target.value })}}
        />
        <label className="text-xl self-start mb-2 text-black">Password:</label>
        <InputGroup size='lg'>
          <Input
            placeholder="Input your password"
            borderColor="blue.300"
            color="black"
            _hover={{ borderColor: "blue.500"}}
            size="lg"
            type={showPwd ? 'text' : 'password'}
            value={values.password}
            onChange={e => {setFormState({ password: e.target.value })}}
          />
          <InputRightElement width='4.5rem'>
            <Button
              colorScheme="teal"
              h='1.75rem'
              size='sm'
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
      <div className="flex flex-col items-center w-full mt-4 gap-y-4">
        <Button
          colorScheme="teal"
          isLoading={loading}
          loadingText="logining~"
          width="100%"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Button as="a" href="/regist" colorScheme="blue" variant="outline" width="100%">
          Regist
        </Button>
      </div>
    </>
  );
};

export default LoginForm;