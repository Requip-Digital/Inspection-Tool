import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project._id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex">
        <div className="flex-1 p-4">
          <p className="text-gray-500 text-sm">Inspection Date: {formatDate(project.details.inspectionDate)}</p>
          <h3 className="text-lg font-semibold mt-1">{project.name}</h3>
          <p className="text-gray-600">City: {project.details.city}</p>
        </div>
        
        <div className="w-32 relative flex items-center">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;