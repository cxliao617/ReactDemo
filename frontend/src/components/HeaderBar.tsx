import React from 'react';
import './../index.css';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export default function HeaderBar() {
  let navigate = useNavigate();

  const items = [
    {
      label: 'Home',
      command: () => navigate('/'),
    },
    {
      label: 'Todo',
      command: () => navigate('/todo'),
    },
    
  ];
  return (
    <>
      <Menubar model={items} />
    </>
  );
}
