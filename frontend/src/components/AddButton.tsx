import React from 'react';
import { Plus } from 'lucide-react';

interface AddButtonProps {
  label: string;
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-3 flex items-center shadow-lg transition-all"
      onClick={onClick}
    >
      <Plus size={20} className="mr-1" />
      <span>{label}</span>
    </button>
  );
};

export default AddButton;