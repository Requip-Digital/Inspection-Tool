import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import FormField from '../components/FormField';
import { ChevronDown, Loader2 } from 'lucide-react';
import { PROJECT_TEMPLATES } from '../data/projectTemplates';
import toast from 'react-hot-toast';

interface BaseFormData {
  name: string;
  template: string;
  city: string;
  nearestAirport: string;
  condition: string;
  originallyBought: string;
}

interface ToyotaFormData extends BaseFormData {
  template: 'Toyota';
  inspectionDate: string;
}

interface PicanalFormData extends BaseFormData {
  template: 'Picanol';
  millName: string;
  country: string;
  inspectionDate: string;
  delivery: string;
  askingPrice: string;
}

type FormData = ToyotaFormData | PicanalFormData;

const NewProjectPage: React.FC = () => {
  const { addProject } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    template: 'Toyota',
    inspectionDate: '',
    city: '',
    originallyBought: '',
    nearestAirport: '',
    condition: ''
  } as ToyotaFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const template = PROJECT_TEMPLATES.find(t => t.name === formData.template);
    
    if (!formData.name) {
      newErrors.name = 'Project name is required';
    }
    
    if (!formData.template) {
      newErrors.template = 'Template selection is required';
    }

    // Validate required fields from template
    if (template) {
      template.sections.forEach(section => {
        section.fields.forEach(field => {
          if (field.required && !formData[field.name as keyof FormData]) {
            newErrors[field.name] = `${field.label} is required`;
          }
        });
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      const submitToast = toast.loading('Creating new project...');
      
      try {
        const projectName = formData.name || 
          `${formData.template} Project ${Math.floor(Math.random() * 1000)}`;
        
        const projectData = {
          _id: '',
          name: projectName,
          templateId: formData.template,
          details: {
            inspectionDate: formData.template === 'Toyota' ? (formData as ToyotaFormData).inspectionDate : (formData as PicanalFormData).inspectionDate ,
            city: formData.city,
            originallyBought: formData.originallyBought as 'New' | 'Used' | 'Refurbished',
            nearestAirport: formData.nearestAirport,
            condition: formData.condition as 'Excellent' | 'Good' | 'Fair' | 'Poor',
            millName: formData.template === 'Picanol' ? (formData as PicanalFormData).millName : undefined,
            country: formData.template === 'Picanol' ? (formData as PicanalFormData).country : undefined,
            delivery: formData.template === 'Picanol' ? (formData as PicanalFormData).delivery : undefined,
            askingPrice: formData.template === 'Picanol' ? (formData as PicanalFormData).askingPrice : undefined
          },
          machines: []
        };
        
        await addProject(projectData);
        toast.success('Project created successfully!', { id: submitToast });
        navigate('/');
      } catch (error) {
        console.error('Failed to create project:', error);
        toast.error('Failed to create project. Please try again.', { id: submitToast });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleTemplateDropdown = () => {
    setShowTemplateDropdown(!showTemplateDropdown);
  };

  const selectTemplate = (templateName: string) => {
    if (templateName === 'Toyota') {
      setFormData({
        name: '',
        template: 'Toyota',
        inspectionDate: '',
        city: '',
        originallyBought: '',
        nearestAirport: '',
        condition: ''
      } as ToyotaFormData);
    } else {
      setFormData({
        name: '',
        template: 'Picanol',
        millName: '',
        city: '',
        country: '',
        nearestAirport: '',
        condition: '',
        inspectionDate: '',
        originallyBought: '',
        delivery: '',
        askingPrice: ''
      } as PicanalFormData);
    }
    setShowTemplateDropdown(false);
  };

  const renderFormFields = () => {
    if (!formData.template) return null;

    const template = PROJECT_TEMPLATES.find(t => t.name === formData.template);
    if (!template) return null;

    return template.sections.map(section => (
      <div key={section.id}>
        {section.fields.map(field => (
          <FormField
            key={field.id}
            field={field}
            value={formData[field.name as keyof FormData]}
            onChange={handleChange}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
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
                  {PROJECT_TEMPLATES.map((template) => (
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
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="E.g., Toyota Project 3"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          {renderFormFields()}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg transition-colors ${
              isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Creating Project...
              </>
            ) : (
              'Save'
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewProjectPage;