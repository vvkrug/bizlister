import { FC, useState } from 'react';
import { useCompanies } from '../contexts/CompanyContext';
import Modal from './Modal';

const AddButton: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { dispatch } = useCompanies();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleAdd = (company: any) => {
    dispatch({ type: 'ADD_COMPANY', payload: { id: Date.now(), ...company } });
  };

  return (
    <>
      <button onClick={handleOpen} className="px-4 py-2 bg-blue-500 text-white rounded w-full">
        Добавить
      </button>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={handleClose} onAdd={handleAdd} />}
    </>
  );
};

export default AddButton;
