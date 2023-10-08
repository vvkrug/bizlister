import { FC, useState } from 'react';
import { useCompanies } from '../contexts/CompanyContext';

interface Company {
  id: number;
  name: string;
  address: string;
  ogrn: string;
  inn: string;
  registrationDate: string;
}

const Table: FC = () => {
	const { state, dispatch } = useCompanies();
  const [editMode, setEditMode] = useState<null | number>(null);  // ID редактируемой компании или null
  const [tempAddress, setTempAddress] = useState('');  // Временное хранилище для адреса во время редактирования

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_COMPANY', payload: id });
  };

  const handleEdit = (id: number, address: string) => {
    setEditMode(id);
    setTempAddress(address);
  };

  const handleBlur = (id: number) => {
    dispatch({ type: 'EDIT_COMPANY', payload: { id, address: tempAddress } });
    setEditMode(null);
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
          <th className="py-2">Действия</th>
        </tr>
      </thead>
      <tbody>
        {state.companies.map((company) => (
          <tr key={company.id} className={`${company.id % 2 === 0 ? 'bg-gray-100' : ''}`}>
            <td className="py-2 text-center">{company.name}</td>
						<td className="py-2 text-center">
              {editMode === company.id ? (
                <input
                  type="text"
                  value={tempAddress}
                  onChange={(e) => setTempAddress(e.target.value)}
                  onBlur={() => handleBlur(company.id)}
                  autoFocus
									className='w-full'
                />
              ) : (
                <span onClick={() => handleEdit(company.id, company.address)}>
                  {company.address}
                </span>
              )}
            </td>
            <td className="py-2 text-center">{company.ogrn}</td>
            <td className="py-2 text-center">{company.inn}</td>
            <td className="py-2 text-center">{company.registrationDate}</td>
            <td className="py-2 text-center">
              <button onClick={() => handleDelete(company.id)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
