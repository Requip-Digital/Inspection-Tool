import React, { createContext, useContext, useState } from 'react';
import { Project, Machine, Template } from '../types';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';
import { MACHINE_TEMPLATES } from '../data/machineTemplates';
import { MOCK_PROJECTS } from '../data/mockData';

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
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addMachine: (projectId: string, machine: Omit<Machine, 'id'>) => void;
  updateMachine: (projectId: string, machine: Machine) => void;
  deleteMachine: (projectId: string, machineId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentMachine, setCurrentMachine] = useState<Machine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
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
    const newMachine: Machine = {
      ...machine,
      id: Date.now().toString(),
      name: machine.name || '',
      sheetNumber: machine.sheetNumber || 0,
      millMachineNo: machine.millMachineNo || '',
      model: machine.model || '',
      typeOfFabric: machine.typeOfFabric || '',
      yearOfMfg: machine.yearOfMfg || new Date().getFullYear(),
      photos: machine.photos || []
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;