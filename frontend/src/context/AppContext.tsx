import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Machine, Template } from '../types';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';
import { MACHINE_TEMPLATES } from '../data/machineTemplates';
import { projectService } from '../services/projectService';
import { machineService } from '../services/machineService';

interface IMachine {
  _id: string;
  name: string;
  sheetNumber: number;
  template: string;
  sections: {
    id: string;
    name: string;
    fields: Array<{
      id: string;
      name: string;
      type: string;
      label: string;
      value: any;
      options?: any[];
      validation?: {
        min?: number;
        max?: number;
        message?: string;
      };
      required?: boolean;
    }>;
  }[];
  millMachineNo?: string;
  model?: string;
  typeOfFabric?: string;
  yearOfMfg?: number;
  photos?: string[];
}

interface AppContextType {
  projects: Project[];
  projectTemplates: Template[];
  machineTemplates: Template[];
  currentProject: Project | null;
  currentMachine: Machine | null;
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setCurrentProject: (project: Project | null) => void;
  setCurrentMachine: (machine: Machine | null) => void;
  setSearchTerm: (term: string) => void;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addMachine: (projectId: string, machine: Omit<Machine, 'id'>) => Promise<void>;
  updateMachine: (projectId: string, machine: Machine) => Promise<void>;
  deleteMachine: (projectId: string, machineId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentMachine, setCurrentMachine] = useState<Machine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const loadedProjects = await projectService.getAllProjects();
        setProjects(loadedProjects);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const addProject = async (projectData: Omit<Project, 'id'>) => {
    setIsLoading(true);
    try {
      const newProject = await projectService.createProject(projectData);
      setProjects(prev => [...prev, newProject]);
    } catch (err) {
      setError('Failed to create project');
      console.error('Error creating project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (project: Project) => {
    setIsLoading(true);
    try {
      const updatedProject = await projectService.updateProject(project._id, project);
      if (updatedProject) {
        setProjects(prev => prev.map(p => p._id === project._id ? updatedProject : p));
        if (currentProject?._id === project._id) {
          setCurrentProject(updatedProject);
        }
      }
    } catch (err) {
      setError('Failed to update project');
      console.error('Error updating project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    try {
      const success = await projectService.deleteProject(id);
      if (success) {
        setProjects(prev => prev.filter(p => p._id !== id));
        if (currentProject?._id === id) {
          setCurrentProject(null);
        }
      }
    } catch (err) {
      setError('Failed to delete project');
      console.error('Error deleting project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addMachine = async (projectId: string, machineData: Omit<Machine, 'id'>) => {
    setIsLoading(true);
    try {
      const response = await machineService.addMachine(projectId, machineData) as unknown as IMachine;
      if (response) {
        const newMachine: Machine = {
          id: response._id,
          name: response.name,
          sheetNumber: response.sheetNumber,
          template: response.template,
          sections: response.sections,
          millMachineNo: response.millMachineNo,
          model: response.model,
          typeOfFabric: response.typeOfFabric,
          yearOfMfg: response.yearOfMfg,
          photos: response.photos
        };

        setProjects(prev => prev.map(p => {
          if (p._id === projectId) {
            return {
              ...p,
              machines: [...(p.machines || []), newMachine]
            };
          }
          return p;
        }));
        
        if (currentProject?._id === projectId) {
          setCurrentProject(prev => {
            if (!prev) return null;
            return {
              ...prev,
              machines: [...(prev.machines || []), newMachine]
            };
          });
        }
      }
    } catch (err) {
      setError('Failed to add machine');
      console.error('Error adding machine:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMachine = async (projectId: string, machine: Machine) => {
    setIsLoading(true);
    try {
      const response = await machineService.updateMachine(machine.id, machine) as unknown as IMachine;
      if (response) {
        const updatedMachine: Machine = {
          id: response._id,
          name: response.name,
          sheetNumber: response.sheetNumber,
          template: response.template,
          sections: response.sections,
          millMachineNo: response.millMachineNo,
          model: response.model,
          typeOfFabric: response.typeOfFabric,
          yearOfMfg: response.yearOfMfg,
          photos: response.photos
        };

        setProjects(prev => prev.map(p => {
          if (p._id === projectId) {
            return {
              ...p,
              machines: p.machines.map(m => 
                m.id === machine.id ? updatedMachine : m
              )
            };
          }
          return p;
        }));

        if (currentProject?._id === projectId) {
          setCurrentProject(prev => {
            if (!prev) return null;
            return {
              ...prev,
              machines: prev.machines.map(m => 
                m.id === machine.id ? updatedMachine : m
              )
            };
          });
        }

        if (currentMachine?.id === machine.id) {
          setCurrentMachine(updatedMachine);
        }
      }
    } catch (err) {
      setError('Failed to update machine');
      console.error('Error updating machine:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMachine = async (projectId: string, machineId: string) => {
    setIsLoading(true);
    try {
      const updatedProject = await machineService.deleteMachine(projectId, machineId);
      if (updatedProject) {
        setProjects(prev => prev.map(p => p._id === projectId ? updatedProject : p));
        if (currentProject?._id === projectId) {
          setCurrentProject(updatedProject);
        }
        if (currentMachine?._id === machineId) {
          setCurrentMachine(null);
        }
      }
    } catch (err) {
      setError('Failed to delete machine');
      console.error('Error deleting machine:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    projects,
    projectTemplates: PROJECT_TEMPLATES,
    machineTemplates: MACHINE_TEMPLATES,
    currentProject,
    currentMachine,
    searchTerm,
    isLoading,
    error,
    setProjects,
    setCurrentProject,
    setCurrentMachine,
    setSearchTerm,
    addProject,
    updateProject,
    deleteProject,
    addMachine,
    updateMachine,
    deleteMachine
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;