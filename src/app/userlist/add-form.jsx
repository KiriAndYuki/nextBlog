'use client';

import { useState } from 'react';
import { Input, Button, useToast } from '@chakra-ui/react';
import { createUser } from '../db/userActions';

const AddForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const errId = 'submitErr';

  const handleSubmit = async () => {
    if (name.length === 0 || email.length === 0) {
      if (!toast.isActive(errId)) {
        toast({
          id: errId,
          title: 'please input the info',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      }
    } else {
      setLoading(true);
      try {
        const res = await createUser({
          name,
          email,
        });
        if (res?.code) {
          // success
          toast({
            title: res?.msg,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
          setEmail('');
          setName('');
        } else {
          // error
          if (!toast.isActive(errId)) {
            toast({
              id: errId,
              title: res?.msg,
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top',
            });
          }
        }
      } catch (e) {
        if (!toast.isActive(errId)) {
          toast({
            id: errId,
            title: 'server err',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-xl">name:</span>
      <Input
        value={name}
        onChange={e => setName(e?.target?.value)}
        placeholder='enter user name'
      />
      <span className="text-xl">E-mail:</span>
      <Input
        value={email}
        onChange={e => setEmail(e?.target?.value)}
        placeholder='enter your email'
      />
      <Button colorScheme='teal' variant='outline' disabled={loading} onClick={handleSubmit}>add user</Button>
    </div>
  );
};

export default AddForm;