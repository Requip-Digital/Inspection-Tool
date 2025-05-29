import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import { ChevronDown } from 'lucide-react';

const NewProjectPage: React.FC = () => {
  const { addProject, templates } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    template: '',
    inspectionDate: '',
    city: '',
    originallyBought: '',
    mfgOrigin: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) {
      newErrors.name = 'Project name is required';
    }
    
    if (!formData.template) {
      newErrors.template = 'Template selection is required';
    }
    
    if (!formData.inspectionDate) {
      newErrors.inspectionDate = 'Inspection date is required';
    }
    
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Generate a name based on template and incremental number if not provided
      const projectName = formData.name || 
        `${formData.template} Project ${Math.floor(Math.random() * 1000)}`;
      
      addProject({
        name: projectName,
        template: formData.template,
        inspectionDate: formData.inspectionDate,
        city: formData.city,
        originallyBought: formData.originallyBought,
        mfgOrigin: formData.mfgOrigin,
        machines: []
      });
      
      navigate('/');
    }
  };

  const toggleTemplateDropdown = () => {
    setShowTemplateDropdown(!showTemplateDropdown);
  };

  const selectTemplate = (templateName: string) => {
    setFormData({
      ...formData,
      template: templateName
    });
    setShowTemplateDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="E.g., Toyota Project 3"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Template
            </label>
            <div className="relative">
              <button
                type="button"
                className={`w-full p-3 border rounded-lg bg-white flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.template ? 'border-red-500' : 'border-gray-300'
                }`}
                onClick={toggleTemplateDropdown}
              >
                <span className={formData.template ? 'text-gray-900' : 'text-gray-400'}>
                  {formData.template || 'E.g., Toyota, Picanol'}
                </span>
                <ChevronDown size={20} className="text-gray-400" />
              </button>
              
              {showTemplateDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                      onClick={() => selectTemplate(template.name)}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              )}
              
              {errors.template && (
                <p className="mt-1 text-sm text-red-500">{errors.template}</p>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inspection Date
            </label>
            <input
              type="date"
              name="inspectionDate"
              value={formData.inspectionDate}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.inspectionDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.inspectionDate && (
              <p className="mt-1 text-sm text-red-500">{errors.inspectionDate}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="E.g., Pune, Surat"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Originally Bought
            </label>
            <select
              name="originallyBought"
              value={formData.originallyBought}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mfg. Origin
            </label>
            <input
              type="text"
              name="mfgOrigin"
              value={formData.mfgOrigin}
              onChange={handleChange}
              placeholder="E.g., Japan, Germany"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewProjectPage;