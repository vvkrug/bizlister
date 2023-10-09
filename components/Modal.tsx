import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { getCompanyInfoByINN } from '../api/dadata';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (company: any) => void;
}

interface CompanyState {
  name: string;
  address: string;
  ogrn: string;
  inn: string;
  registrationDate: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [company, setCompany] = useState<CompanyState>({ name: '', address: '', ogrn: '', inn: '', registrationDate: '' });

	const handleSubmit = () => {
    onAdd({ ...company });
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

	const handleLoad = async () => {
		try {
			const info = await getCompanyInfoByINN(company.inn);
			const registrationDate = new Date(info.data.state.registration_date).toLocaleDateString('en-GB');  // Преобразование timestamp в читаемый формат даты
			setCompany({
				name: info.value,
				address: info.data.address.value,
				ogrn: info.data.ogrn,
				inn: info.data.inn,
				registrationDate: registrationDate,
			});
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error);
		}
	};

	useEffect(() => {
    if (isOpen) {
        document.getElementById('name')?.focus();
    }
  }, [isOpen]);

  return (
    isOpen ? (
      <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex items-center justify-center" onClick={handleBackgroundClick}>
				<motion.div
						initial={{ opacity: 0, scale: 0.7 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.7 }}
						className="modal-content"
					>
					<div className="fixed z-10 inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
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
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
											Адрес
										</label>
										<input
											type="text"
											id="address"
											value={company.address}
											onChange={(e) => setCompany({ ...company, address: e.target.value })}
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										/>
									</div>
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
											ОГРН
										</label>
										<input
											type="text"
											id="ogrn"
											value={company.ogrn}
											onChange={(e) => setCompany({ ...company, ogrn: e.target.value })}
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											pattern="\d*"
										/>
									</div>
									<div className="flex mb-4 items-center">
										<label className="block text-gray-700 text-sm font-bold" htmlFor="inn">
											ИНН
										</label>
										<input
											type="text"
											id="inn"
											value={company.inn}
											onChange={(e) => setCompany({ ...company, inn: e.target.value })}
											className="mx-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											pattern="\d*"
										/>
										<button onClick={handleLoad} className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none">
											Загрузить
										</button>
									</div>
									<div className="mb-4">
										<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
											Дата регистрации
										</label>
										<input
											type="text"
											id="registrationDate"
											value={company.registrationDate}
											onChange={(e) => setCompany({ ...company, registrationDate: e.target.value })}
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										/>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
									<button onClick={handleSubmit} type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
										Добавить
									</button>
									<button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
										Отмена
									</button>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
    ) : null
  );
};

export default Modal;
