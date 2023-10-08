import React, { createContext, useContext, useEffect, useReducer } from 'react';

type Company = {
  id: number;
  name: string;
  address: string;
  ogrn: string;
  inn: string;
  registrationDate: string;
};

type State = {
  companies: Company[];
};

type Action =
  | { type: 'ADD_COMPANY'; payload: Company }
  | { type: 'DELETE_COMPANY'; payload: number }
  | { type: 'EDIT_COMPANY'; payload: Company }
	| { type: 'INITIALIZE_COMPANIES'; payload: Company[] };

const CompanyContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_COMPANY':
      return { ...state, companies: [...state.companies, action.payload] };
    case 'DELETE_COMPANY':
      return { ...state, companies: state.companies.filter(company => company.id !== action.payload) };
    case 'EDIT_COMPANY':
      return {
        ...state,
        companies: state.companies.map(company =>
          company.id === action.payload.id ? action.payload : company
        ),
      };
    default:
      throw new Error('Unhandled action type');
  }
};

type CompanyProviderProps = {
  children: React.ReactNode;
};

const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { companies: [] });

  useEffect(() => {
    // Проверяем, доступен ли localStorage в браузере
    if (typeof window !== 'undefined') {
      const savedCompanies = localStorage.getItem('companies');
      if (savedCompanies) {
        dispatch({ type: 'INITIALIZE_COMPANIES', payload: JSON.parse(savedCompanies) });
      }
    }
  }, []); // Запуск эффекта только один раз при монтировании компонента

  return (
    <CompanyContext.Provider value={{ state, dispatch }}>
      {children}
    </CompanyContext.Provider>
  );
};

const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompanies must be used within a CompanyProvider');
  }
  return context;
};

export { CompanyProvider, useCompanies };

