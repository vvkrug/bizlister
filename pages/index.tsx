import React from 'react';
import AddButton from '../components/AddButton';
import Table from '../components/Table';
import { CompanyProvider } from '../contexts/CompanyContext';

const Home: React.FC = () => {
  return (
    <CompanyProvider>
      <div className="container mx-auto p-6">
        <AddButton />
        <Table />
      </div>
    </CompanyProvider>
  );
};

export default Home;
