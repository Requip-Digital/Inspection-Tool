import React, { useRef, useState } from 'react';
import { Field } from '../types';
import { Camera, X, Upload, ChevronLeft, CircleSlash } from 'lucide-react';

interface FormFieldProps {
  field: Field;
  value: any;
  onChange: (name: string, value: any) => void;
  readOnly?: boolean;
}

const ImageModal: React.FC<{
  images: string[];
  onClose: () => void;
  onRemove: (index: number) => void;
  readOnly?: boolean;
}> = ({ images, onClose, onRemove, readOnly = false }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h3 className="text-lg font-medium ml-2">All Photos</h3>
        </div>

        {/* Image Grid */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img 
                  src={image} 
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {!readOnly && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, readOnly = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (readOnly) return;
    onChange(field.name, e.target.value);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const files = e.target.files;
    if (files && files.length > 0) {
      const filePromises = Array.from(files).map(file => {
        if (file.type.startsWith('image/')) {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
          });
        }
        return Promise.resolve(null);
      });

      const images = await Promise.all(filePromises);
      const validImages = images.filter(img => img !== null);
      
      // If we already have images, append new ones
      const currentImages = Array.isArray(value) ? value : (value ? [value] : []);
      onChange(field.name, [...currentImages, ...validImages]);
    }
  };

  const handleCameraCapture = () => {
    if (readOnly) return;
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.capture = 'environment';
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = () => {
    if (readOnly) return;
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.multiple = true;
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = (index: number) => {
    if (readOnly) return;
    if (Array.isArray(value)) {
      const newImages = value.filter((_, i) => i !== index);
      onChange(field.name, newImages.length > 0 ? newImages : null);
    } else {
      onChange(field.name, null);
    }
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
            disabled={readOnly}
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              readOnly ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
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
            disabled={readOnly}
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              readOnly ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
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
            disabled={readOnly}
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              readOnly ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
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
            disabled={readOnly}
            className={`w-full p-2 border border-gray-300 ${value ? 'text-gray-600' : 'text-gray-400'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              readOnly ? 'bg-gray-50 cursor-not-allowed' : ''
            }`}
          >
            <option value="">Select {field.label}</option>
            {field.options?.sort((a, b) => 
              typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))
            ).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'file':
        const images = Array.isArray(value) ? value : (value ? [value] : []);
        const hasMoreThanFour = images.length > 4;
        const displayImages = hasMoreThanFour ? images.slice(0, 3) : images;
        
        return (
          <div className="mt-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={readOnly}
            />
            
            <div className="space-y-4">
              {/* Image Grid */}
              {value ? (
                <div className="grid grid-cols-2 gap-2">
                  {displayImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative aspect-square"
                    >
                      <img 
                        src={image} 
                        alt={`${field.label} ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {hasMoreThanFour && (
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="bg-gray-100 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-gray-600 font-medium">+{images.length - 3} more photos</span>
                    </button>
                  )}
                </div>
              ) : 
              readOnly && (
                <div className="flex flex-col gap-2">
                  <div
                    className="w-full h-32 bg-gray-100 flex flex-col items-center justify-center rounded-md border border-dashed border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <CircleSlash className="text-gray-400 mb-1" size={24} />
                    <span className="text-sm text-gray-500">No Photos</span>
                    </div>
                </div>
              )}

              {/* Action Buttons */}
              {!readOnly && (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleCameraCapture}
                    className="w-full h-32 bg-gray-100 flex flex-col items-center justify-center rounded-md border border-dashed border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Camera className="text-gray-400 mb-1" size={24} />
                    <span className="text-sm text-gray-500">Take Photo</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleFileSelect}
                    className="w-full h-16 bg-gray-100 flex items-center justify-center rounded-md border border-dashed border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="text-gray-400 mr-2" size={20} />
                    <span className="text-sm text-gray-500">Upload from Gallery</span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal */}
            {showModal && (
              <ImageModal
                images={images}
                onClose={() => setShowModal(false)}
                onRemove={readOnly ? () => {} : handleRemoveImage}
                readOnly={readOnly}
              />
            )}
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