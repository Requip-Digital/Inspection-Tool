import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import { DEFAULT_MACHINE } from '../data/mockData';

const NewMachinePage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects, addMachine } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    sheetNumber: 1
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedMachineId, setSelectedMachineId] = useState('');

  useEffect(() => {
    if (projectId && projects.length > 0) {
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        // Auto-increment sheet number
        const nextSheetNumber = project.machines.length + 1;
        setFormData((prev) => ({
          ...prev,
          sheetNumber: nextSheetNumber,
          name: `Machine ${String.fromCharCode(64 + nextSheetNumber)}`
        }));
      } else {
        navigate('/');
      }
    }
  }, [projectId, projects, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleMachineSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const machineId = e.target.value;
    setSelectedMachineId(machineId);

    if (machineId && projectId) {
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        const selectedMachine = project.machines.find((m) => m.id === machineId);
        if (selectedMachine) {
          // Copy all fields except id, name and sheet number
          const { id, name, sheetNumber, ...machineData } = selectedMachine;
          setFormData((prev) => ({
            ...machineData,
            name: prev.name,
            sheetNumber: prev.sheetNumber
          }));
        }
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) {
      newErrors.name = 'Machine name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && projectId) {
      addMachine(projectId, {
        ...DEFAULT_MACHINE,
        ...formData
      });
      
      navigate(`/project/${projectId}`);
    }
  };

  // Get current project and its machines
  const currentProject = projectId ? projects.find((p) => p.id === projectId) : null;
  const existingMachines = currentProject?.machines || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Add New Machine</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Machine Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="E.g., Machine A"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sheet Number
            </label>
            <input
              type="number"
              name="sheetNumber"
              value={formData.sheetNumber}
              onChange={handleChange}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {existingMachines.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Copy Details From
              </label>
              <select
                value={selectedMachineId}
                onChange={handleMachineSelect}
                className={`w-full p-2 border border-gray-300 ${selectedMachineId ? 'text-gray-600' : 'text-gray-400'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select a machine to copy from</option>
                {existingMachines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                This will copy all details except name and sheet number
              </p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewMachinePage;