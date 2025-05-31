import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import FormField from '../components/FormField';
import { Eye, Pencil, Save } from 'lucide-react';
import { Project, Machine, Template, Section, Field } from '../types';
import { machineService } from '../services/machineService';

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
    
    console.log('Field change:', name, value); // Debug log
    
    const newData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newData);
    setHasUnsavedChanges(true);
  };

  const handleBackToProjects = () => {
    navigate(`/project/${projectId}`);
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!project || !machine || !template) {
    return <div className="p-4">No data available</div>;
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                isReadOnly 
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              {isReadOnly ? (
                <>
                  <Eye size={18} />
                  <span>Read Only</span>
                </>
              ) : (
                <>
                  <Pencil size={18} />
                  <span>Editing</span>
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
          {!isReadOnly && hasUnsavedChanges && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-500 text-green-600 hover:bg-green-100 transition-colors"
              >
                <Save size={18} />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            )}
        </div>
        
        {saveMessage && (
          <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg ${
            isSaving ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
          }`}>
            {saveMessage}
          </div>
        )}
      </main>
    </div>
  );
};

export default MachineDetailPage;