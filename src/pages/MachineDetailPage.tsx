import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import FormField from '../components/FormField';
import { Eye, Pencil } from 'lucide-react';
import { Project, Machine, Template, Section, Field } from '../types';

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

  useEffect(() => {
    if (projectId && machineId && projects.length > 0) {
      const foundProject = projects.find((p) => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
        
        const foundMachine = foundProject.machines.find((m) => m.id === machineId);
        if (foundMachine) {
          setMachine(foundMachine);
          setFormData(foundMachine);
          
          // Find template
          const foundTemplate = machineTemplates.find((t) => t.name === foundProject.template);
          if (foundTemplate) {
            setTemplate(foundTemplate);
          }
        } else {
          navigate(`/project/${projectId}`);
        }
      } else {
        navigate('/');
      }
    }
  }, [projectId, machineId, projects, machineTemplates, navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFieldChange = (name: string, value: any) => {
    if (isReadOnly) return;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Auto-save after a brief delay
    handleAutoSave({
      ...formData,
      [name]: value
    });
  };

  const handleAutoSave = (data: Record<string, any>) => {
    if (projectId && machineId && !isReadOnly && machine) {
      setIsSaving(true);
      setSaveMessage('Saving...');
      
      // Simulate API delay
      setTimeout(() => {
        updateMachine(projectId, {
          ...machine,
          ...data
        });
        
        setIsSaving(false);
        setSaveMessage('All changes saved');
        
        // Clear message after a delay
        setTimeout(() => {
          setSaveMessage('');
        }, 2000);
      }, 2000);
    }
  };

  const handleBackToProjects = () => {
    navigate(`/project/${projectId}`);
  };

  if (!project || !machine || !template) {
    return <div className="p-4">Loading...</div>;
  }

  const tabs = template.sections.map((section: Section) => section.name);
  const currentSection = template.sections.find((section: Section) => section.name === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{machine.name}</h2>
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