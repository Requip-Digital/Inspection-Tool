import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProjectCard from '../components/ProjectCard';
import AddButton from '../components/AddButton';
import { Filter, Loader2 } from 'lucide-react';

const HomePage: React.FC = () => {
  const { projects, searchTerm, setSearchTerm, isLoading } = useAppContext();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
  
      const matchesTemplate = selectedTemplate
        ? project.templateId === selectedTemplate
        : true;
  
      return matchesSearch && matchesTemplate;
    });
  
    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedTemplate]);
  
  const handleAddProject = () => {
    navigate('/project/new');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const TemplateButton = ({ label, value }: { label: string, value: string }) => (
    <button
      className={`px-3 py-1 rounded-full text-sm ${
        selectedTemplate === value ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
      }`}
      onClick={() => setSelectedTemplate(value)}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>

        <div className="flex items-center mb-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search projects"
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          <button
            className="ml-2 p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50"
            onClick={toggleFilters}
          >
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 animate-fadeIn">
            <h3 className="font-medium mb-2">Filter by</h3>
            <div className="flex flex-wrap gap-2">
              <TemplateButton label="All" value="" />
              <TemplateButton label="Toyota" value="Toyota" />
              <TemplateButton label="Picanol" value="Picanol" />  
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No projects found</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleAddProject}
            >
              Create your first project
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        <AddButton label="Add Project" onClick={handleAddProject} />
      </main>
    </div>
  );
};

export default HomePage;