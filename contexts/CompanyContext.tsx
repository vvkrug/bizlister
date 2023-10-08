import React, { FC, ReactNode, createContext, useContext, useEffect, useReducer } from 'react';

interface Company {
  id: number;
  name: string;
  address: string;
  ogrn: string;
  inn: string;
  registrationDate: string;
}

interface State {
  companies: Company[];
}

type Action =
  | { type: 'ADD_COMPANY'; payload: Company }
  | { type: 'DELETE_COMPANY'; payload: number }
  | { type: 'EDIT_COMPANY'; payload: { id: number; address: string } } 
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
					company.id === action.payload.id
						? { ...company, address: action.payload.address }
						: company
				),
			};
    case 'INITIALIZE_COMPANIES':
      return { ...state, companies: action.payload };
    default:
      throw new Error('Unhandled action type');
  }
};

interface CompanyProviderProps {
  children: ReactNode;
}

const CompanyProvider: FC<CompanyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { companies: [] });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCompanies = localStorage.getItem('companies');
      if (savedCompanies) {
        dispatch({ type: 'INITIALIZE_COMPANIES', payload: JSON.parse(savedCompanies) });
      }
    }
  }, []);

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

