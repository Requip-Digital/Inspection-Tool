import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import FormField from '../components/FormField';
import { Camera } from 'lucide-react';

const MachineDetailPage: React.FC = () => {
  const { projectId, machineId } = useParams<{ projectId: string; machineId: string }>();
  const navigate = useNavigate();
  const { projects, templates, updateMachine } = useAppContext();
  const [project, setProject] = useState<any>(null);
  const [machine, setMachine] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('General');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (projectId && machineId && projects.length > 0) {
      const foundProject = projects.find((p) => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
        
        const foundMachine = foundProject.machines.find((m: any) => m.id === machineId);
        if (foundMachine) {
          setMachine(foundMachine);
          setFormData(foundMachine);
          
          // Find template
          const foundTemplate = templates.find((t) => t.name === foundProject.template);
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
  }, [projectId, machineId, projects, templates, navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFieldChange = (name: string, value: any) => {
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
    if (projectId && machineId) {
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
      }, 500);
    }
  };

  const handleBackToProjects = () => {
    navigate(`/project/${projectId}`);
  };

  if (!project || !machine || !template) {
    return <div className="p-4">Loading...</div>;
  }

  const tabs = template.sections.map((section: any) => section.name);
  const currentSection = template.sections.find((section: any) => section.name === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{machine.name}</h2>
        
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {currentSection && currentSection.fields.length > 0 ? (
            currentSection.fields.map((field: any) => (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.name]}
                onChange={handleFieldChange}
              />
            ))
          ) : (
            <p className="text-gray-500 py-4 text-center">No fields in this section</p>
          )}
        </div>
        
        {saveMessage && (
          <div className="fixed bottom-20 left-0 right-0 flex justify-center">
            <div className={`px-4 py-2 rounded-full ${
              isSaving ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
            } text-sm font-medium shadow-md transition-opacity`}>
              {saveMessage}
            </div>
          </div>
        )}
        
        <button
          onClick={handleBackToProjects}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg text-blue-500 bg-white hover:bg-gray-50 transition-colors"
        >
          Back to Projects
        </button>
      </main>
    </div>
  );
};

export default MachineDetailPage;