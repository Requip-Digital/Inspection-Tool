import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import FormField from '../components/FormField';
import { Eye, Pencil, Save, Loader2 } from 'lucide-react';
import { Project, Machine, Template, Section, Field } from '../types';
import { machineService } from '../services/machineService';
import ActionMenu from '../components/ActionMenu';

const MachineDetailPage: React.FC = () => {
  const { projectId, machineId } = useParams<{ projectId: string; machineId: string }>();
  const navigate = useNavigate();
  const { projects, machineTemplates, updateMachine } = useAppContext();
  const [project, setProject] = useState<Project | null>(null);
  const [machine, setMachine] = useState<Machine | null>(null);
  const [template, setTemplate] = useState<Template | null>(null);
  const [activeTab, setActiveTab] = useState('General');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper function to extract field values from sections
  const extractFieldValues = useCallback((machine: Machine) => {
    const values: Record<string, any> = {
      name: machine.name,
      sheetNumber: machine.sheetNumber,
      millMachineNo: machine.millMachineNo,
      model: machine.model,
      typeOfFabric: machine.typeOfFabric,
      yearOfMfg: machine.yearOfMfg
    };

    // Extract values from sections if they exist
    if (machine.sections) {
      machine.sections.forEach((section: Section) => {
        section.fields.forEach((field: Field & { value?: any }) => {
          if (field.value !== undefined) {
            values[field.name] = field.value;
          }
        });
      });
    }

    return values;
  }, []);

  useEffect(() => {
    const fetchMachineData = async () => {
      if (!projectId || !machineId) {
        navigate('/');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Find the project first
        const foundProject = projects.find((p) => p._id === projectId);
        if (!foundProject) {
          navigate('/');
          return;
        }
        setProject(foundProject);

        // Fetch machine data from API
        const machineData = await machineService.getMachine(machineId);
        if (!machineData) {
          navigate(`/project/${projectId}`);
          return;
        }

        // Convert the API response to our Machine type
        const machine: Machine = {
          id: machineData._id,
          name: machineData.name,
          sheetNumber: machineData.sheetNumber,
          template: machineData.template,
          sections: machineData.sections,
          millMachineNo: machineData.millMachineNo,
          model: machineData.model,
          typeOfFabric: machineData.typeOfFabric,
          yearOfMfg: machineData.yearOfMfg,
          photos: machineData.photos
        };

        setMachine(machine);
        const initialFormData = extractFieldValues(machine);
        setFormData(initialFormData);

        // Find template
        const foundTemplate = machineTemplates.find((t) => t.name === foundProject.templateId);
        if (foundTemplate) {
          setTemplate(foundTemplate);
        }
      } catch (err) {
        console.error('Error fetching machine:', err);
        setError('Failed to load machine data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachineData();
  }, [projectId, machineId, projects, machineTemplates, navigate, extractFieldValues]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      return tabs[currentIndex + 1];
    }
    return tabs[0]; // Loop back to first tab if we're at the end
  };

  const handleSave = async () => {
    if (!projectId || !machineId || isReadOnly || !machine) return;
    
    setIsSaving(true);
    setSaveMessage('Saving...');
    
    try {
      // Create the update data with both basic and field values
      const updateData = {
        ...machine,
        ...formData,
        // Ensure required fields are included
        name: formData.name || machine.name,
        sheetNumber: formData.sheetNumber || machine.sheetNumber
      };

      // Update the machine
      await updateMachine(projectId, updateData);
      
      setIsSaving(false);
      setSaveMessage('All changes saved');
      setHasUnsavedChanges(false);
      
      // Move to next tab after successful save
      const nextTab = getNextTab();
      setActiveTab(nextTab);
      
      // Clear success message after a delay
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Failed to save changes:', error);
      
      setIsSaving(false);
      setSaveMessage('Failed to save changes');
      
      // Clear error message after a delay
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }
  };

  const handleFieldChange = (name: string, value: any) => {
    if (isReadOnly) return;
    
    const newData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newData);
    setHasUnsavedChanges(true);
  };

  const handleDelete = async () => {
    if (!machineId || !projectId) return;
    
    const confirmDelete = window.confirm('Are you sure you want to delete this machine? This action cannot be undone.');
    if (!confirmDelete) return;
    
    setIsDeleting(true);
    
    try {
      await machineService.deleteMachine(machineId);
      navigate(`/project/${projectId}`);
    } catch (error) {
      console.error('Failed to delete machine:', error);
      alert('Failed to delete machine. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 max-w-lg flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
            <p className="text-gray-500">Loading machine details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p>{error}</p>
            <button 
              onClick={() => navigate(`/project/${projectId}`)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Go back to project
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!project || !machine || !template) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
            <p>No data available</p>
            <button 
              onClick={() => navigate(`/project/${projectId}`)}
              className="mt-2 text-sm text-yellow-600 hover:text-yellow-800"
            >
              Go back to project
            </button>
          </div>
        </main>
      </div>
    );
  }

  const tabs = template.sections.map((section: Section) => section.name);
  const currentSection = template.sections.find((section: Section) => section.name === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{machine.name}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsReadOnly(!isReadOnly)}
              className={`flex border border-blue-300 items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                isReadOnly 
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {isReadOnly ? (
                <>
                  <Pencil size={16} />
                  <span>Edit</span>
                </>
              ) : (
                <>
                  <Eye size={16} />
                  <span>View</span>
                </>
              )}
            </button>
          </div>
        </div>

        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {currentSection && currentSection.fields.length > 0 ? (
            currentSection.fields.map((field: Field) => (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.name]}
                onChange={handleFieldChange}
                readOnly={isReadOnly}
              />
            ))
          ) : (
            <p className="text-gray-500 py-4 text-center">No fields in this section</p>
          )}
        </div>

        {!isReadOnly && (
              <button
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
                className={`flex w-full justify-center items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  isSaving || !hasUnsavedChanges
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save and Next</span>
                  </>
                )}
              </button>
            )}

          {saveMessage && (
            <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
              saveMessage.includes('Failed')
                ? 'bg-red-500 text-white'
                : 'bg-green-500 text-white'
            }`}>
              {saveMessage}
            </div>
          )}

        <ActionMenu
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      </main>
    </div>
  );
};

export default MachineDetailPage;