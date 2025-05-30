import React from 'react';
import { Field } from '../types';
import { Camera } from 'lucide-react';

interface FormFieldProps {
  field: Field;
  value: any;
  onChange: (name: string, value: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange(field.name, e.target.value);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            min={field.validation?.min}
            max={field.validation?.max}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case 'select':
        return (
          <select
            id={field.id}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            className={`w-full p-2 border border-gray-300 ${value ? 'text-gray-600' : 'text-gray-400'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'multiselect':
        return (
          <select
            id={field.id}
            name={field.name}
            value={value || []}
            onChange={handleChange}
            required={field.required}
            multiple
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'file':
        return (
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              {/* Image placeholders */}
              <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded-md border border-dashed border-gray-300">
                <div className="text-center">
                  <Camera className="mx-auto text-gray-400" size={24} />
                  <span className="text-sm text-gray-500">Add Photo</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {field.helpText && <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>}
      {field.validation?.message && <p className="mt-1 text-xs text-red-500">{field.validation.message}</p>}
    </div>
  );
};

export default FormField;