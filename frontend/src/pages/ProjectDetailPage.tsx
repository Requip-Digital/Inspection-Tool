import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { FileText, ChevronRight, Loader2, Plus } from 'lucide-react';
import ActionMenu from '../components/ActionMenu';
import { projectService } from '../services/projectService';
import toast from 'react-hot-toast';

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, setCurrentProject, isLoading, deleteProject } = useAppContext();
  const [project, setProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMachines, setFilteredMachines] = useState<any[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!id) return;
    
    const confirmDelete = window.confirm('Are you sure you want to delete this project and all its machines? This action cannot be undone.');
    if (!confirmDelete) return;
    
    setIsDeleting(true);
    
    try {
      await deleteProject(id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = async () => {
    if (!project) return;

    try {
      await toast.promise(
        projectService.exportProject(project._id),
        {
          loading: 'Generating PDF...',
          success: (blob) => {
            // Create a download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `inspection_report_${project.name}.pdf`;
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            return 'Export completed successfully!';
          },
          error: 'Failed to export project. Please try again.'
        }
      );
    } catch (error) {
      console.error('Failed to export project:', error);
    }
  };

  if (isLoading || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 max-w-lg flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
            <p className="text-gray-500">Loading project details...</p>
          </div>
        </main>
      </div>
    );
  }

  const renderDetailField = (label: string, value: string | undefined, endBorder: boolean = true) => (
    <div className={`${endBorder ? 'border-b pb-2 mb-2' : ''} `}>
      <div className="flex justify-between py-2">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value || 'N/A'}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">{project.name}</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {/* Common fields for all templates */}
          {renderDetailField('Inspection Date', formatDate(project.details.inspectionDate))}
          {renderDetailField('City', project.details.city)}
          {renderDetailField('Originally Bought', project.details.originallyBought)}
          {renderDetailField('Nearest Airport', project.details.nearestAirport)}
          {renderDetailField('Condition', project.details.condition, project.templateId === 'Picanol' ? true : false)}

          {/* Picanol specific fields */}
          {project.templateId === 'Picanol' && (
            <>
              {renderDetailField('Mill Name', project.details.millName)}
              {renderDetailField('Country', project.details.country)}
              {renderDetailField('Delivery', project.details.delivery)}
              {renderDetailField('Asking Price', project.details.askingPrice, false)}
            </>
          )}
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Machines</h3>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              onClick={handleAddMachine}
            >
              <Plus size={16} />
              Add Machine
            </button>
          </div>
          
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
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMachines.map((machine, index) => (
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
                    <p className="text-sm text-gray-500">Sheet {index + 1}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        <ActionMenu
          onExport={handleExport}
          onDelete={handleDelete}
          isDeleting={isDeleting}
          showExport={true}
        />
      </main>
    </div>
  );
};

export default ProjectDetailPage;