import React from 'react';
import { useCompanies } from '../contexts/CompanyContext';

type Company = {
  name: string;
  address: string;
  ogrn: string;
  inn: string;
  registrationDate: string;
};

const Table: React.FC = () => {
  const { state, dispatch } = useCompanies();
  
  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_COMPANY', payload: id });
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Наименование</th>
          <th className="py-2">Адрес</th>
          <th className="py-2">ОГРН</th>
          <th className="py-2">ИНН</th>
          <th className="py-2">Дата регистрации</th>
        </tr>
      </thead>
      <tbody>
      {state.companies.map((company, index) => (
        <tr key={company.id} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
             <td className="py-2">
            <button onClick={() => handleDelete(company.id)}>Удалить</button>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
