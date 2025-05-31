import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import { FileText, ChevronRight, Download } from 'lucide-react';

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, setCurrentProject } = useAppContext();
  const [project, setProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMachines, setFilteredMachines] = useState<any[]>([]);

  useEffect(() => {
    if (id && projects.length > 0) {
      const foundProject = projects.find((p) => p._id === id);
      if (foundProject) {
        setProject(foundProject);
        setCurrentProject(foundProject);
        setFilteredMachines(foundProject.machines);
      } else {
        navigate('/');
      }
    }
  }, [id, projects, navigate, setCurrentProject]);

  console.log(project);

  useEffect(() => {
    if (project) {
      const filtered = project.machines.filter((machine: any) =>
        machine.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMachines(filtered);
    }
  }, [searchTerm, project]);

  const handleAddMachine = () => {
    navigate(`/project/${id}/machine/new`);
  };

  const handleMachineClick = (machineId: string) => {
    navigate(`/project/${id}/machine/${machineId}`);
  };

  if (!project) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{project.name}</h2>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="border-b pb-2 mb-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Inspection Date</span>
              <span className="font-medium">{formatDate(project.details.inspectionDate)}</span>
            </div>
          </div>

          <div className="border-b pb-2 mb-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">City</span>
              <span className="font-medium">{project.details.city}</span>
            </div>
          </div>

          <div className="border-b pb-2 mb-2">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Originally Bought</span>
              <span className="font-medium">{project.details.originallyBought || 'N/A'}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Mfg. Origin</span>
              <span className="font-medium">{project.details.mfgOrigin || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Machines</h3>
          
          <div className='mb-4'>
            <SearchBar
              placeholder="Search machines"
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          {filteredMachines.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">No machines added yet</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handleAddMachine}
              >
                Add your first machine
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMachines.map((machine) => (
                <div 
                  key={machine.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex items-center hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleMachineClick(machine.id)}
                >
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <FileText size={24} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{machine.name}</h4>
                    <p className="text-sm text-gray-500">Sheet {machine.sheetNumber}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mb-4">
          <button
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            onClick={() => {/* Export function would go here */}}
          >
            <Download size={18} className="mr-2" />
            Export as PDF
          </button>
        </div>

        <AddButton label="Add Machine" onClick={handleAddMachine} />
      </main>
    </div>
  );
};

export default ProjectDetailPage;