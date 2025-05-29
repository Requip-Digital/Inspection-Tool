import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Machine, Template } from '../types';
import { MOCK_PROJECTS, MOCK_TEMPLATES } from '../data/mockData';

interface AppContextType {
  projects: Project[];
  templates: Template[];
  currentProject: Project | null;
  currentMachine: Machine | null;
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setCurrentMachine: React.Dispatch<React.SetStateAction<Machine | null>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addMachine: (projectId: string, machine: Omit<Machine, 'id'>) => void;
  updateMachine: (projectId: string, machine: Machine) => void;
  deleteMachine: (projectId: string, machineId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentMachine, setCurrentMachine] = useState<Machine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage on init
  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [projects]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      machines: []
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (project: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? project : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addMachine = (projectId: string, machine: Omit<Machine, 'id'>) => {
    const newMachine = {
      ...machine,
      id: Date.now().toString()
    };
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            machines: [...p.machines, newMachine]
          };
        }
        return p;
      })
    );
  };

  const updateMachine = (projectId: string, machine: Machine) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            machines: p.machines.map((m) =>
              m.id === machine.id ? machine : m
            )
          };
        }
        return p;
      })
    );
  };

  const deleteMachine = (projectId: string, machineId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            machines: p.machines.filter((m) => m.id !== machineId)
          };
        }
        return p;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        templates,
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
      }}
    >
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