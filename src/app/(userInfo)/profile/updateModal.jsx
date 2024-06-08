'use client';
import { useState, useRef } from 'react';
import {
  Button,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';

import { beforeUpdateValid } from './utils';
import { responseToast, dbErrorToast } from '@/utils';
import { updateProfile } from '@/app/db/userActions/index';

const ProfUpdateModal = ({ infoList, userId, token }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('nickName');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const initRef = useRef(null);
  const finalRef = useRef(null);
  const toastRef = useRef(null);

  const errId = 'profileErr';

  const onModalOpen = (type) => {
    setType(type);
    infoList.forEach(info => {
      if (info.key === type) {
        setValue(info.value)
      }
    });
    setIsOpen(true);
  };

  const onModalClose = () => {
    setValue('');
    setIsOpen(false);
  };

  const afterSuccess = () => {
    setValue('');
    setIsOpen(false);
  };

  const onUpdate = async () => {
    console.log('type: ', type, ';value: ', value);
    if (!beforeUpdateValid(value, type, toastRef, toast, errId)) {
      return;
    }
    console.log('updating!!!');

    try {
      const res = await updateProfile({ userId, type, value, token });
      responseToast(res, toastRef, toast, errId, afterSuccess);
    } catch (e) {
      dbErrorToast(e, toast);
    }
  };

  const renderRowEl = (r) => {

    if (['id', 'userId'].includes(r?.key)) {
      return;
    }

    return (
      <Tr key={r.key}>
        <Td className="text-xl">{`${r?.key}:`}</Td>
        <Td className="text-xl">{r?.value}</Td>
        {
          r?.key === 'account' ? <Td></Td> : <Td>
            <Button colorScheme="teal" onClick={() => onModalOpen(r?.key || 'nickName')}>update</Button>
          </Td>
        }
      </Tr>
    );
  };

  const renderModalContent = () => {
    switch(type) {
      case 'sex':
        return (
          <RadioGroup value={value} onChange={setValue}>
            <Radio size='lg' value='M' mr={3}>Male</Radio>
            <Radio size='lg' value='F'>Female</Radio>
          </RadioGroup>
        );
      case 'desc':
        return (
          <Textarea
            ref={initRef}
            resize="vertical"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        );
      default:
        return (
          <Input
            ref={initRef}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        );
    }
  };

  return(
    <>
      {/* table */}
      <TableContainer
        className="border rounded-lg"
        overflowY="auto"
        overflowX="auto"
        whiteSpace="normal"
        width="66%"
      >
        <Table size="lg">
          <Tbody>
            {
              infoList&&infoList.map(r => renderRowEl(r))
            }
          </Tbody>
        </Table>
      </TableContainer>
      {/* modal */}
      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        initialFocusRef={initRef}
        finalFocusRef={finalRef}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="dark:text-black">{`update your ${type}`}</ModalHeader>
          <ModalCloseButton className="dark:text-black dark:bg-black" />
          <ModalBody>
            {renderModalContent()}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              isLoading={loading}
              loadingText="updating~"
              onClick={onUpdate}
            >
              Update
            </Button>
            <Button onClick={onModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfUpdateModal;