import React, { useState } from 'react';
import { useCompanies } from '../contexts/CompanyContext';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (company: any) => void;  // TODO: Уточнить тип company в зависимости от логики
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAdd }) => {
  const { dispatch } = useCompanies();
  const [company, setCompany] = useState({ name: '', address: '', ogrn: '', inn: '', registrationDate: '' });

	const handleSubmit = () => {
    onAdd({ ...company });
    onClose();
  };

  return (
    isOpen ? (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
          {/* ... */}
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            {/* ... */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Форма */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Наименование
                </label>
                <input
                  type="text"
                  id="name"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* TODO: Повторить для остальных полей */}
              {/* ... */}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                Добавить
              </button>
              <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default Modal;
