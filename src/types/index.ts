export interface Project {
  _id: string;
  name: string;
  templateId: string;
  details: {
    inspectionDate?: string;
    city: string;
    originallyBought: 'New' | 'Used' | 'Refurbished';
    mfgOrigin: string;
    nearestAirport: string;
    condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    millName?: string;
    country?: string;
    delivery?: string;
    askingPrice?: string;
  };
  machines: Machine[];
  imageUrl?: string;
}

export interface Machine {
  id: string;
  name: string;
  sheetNumber: number;
  millMachineNo?: string;
  model?: string;
  typeOfFabric?: string;
  yearOfMfg?: number;
  photos?: string[];
  [key: string]: any; // For dynamic fields
}

export interface Template {
  id: string;
  name: string;
  sections: Section[];
}

export interface Section {
  id: string;
  name: string;
  fields: Field[];
}

export interface Field {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'date' | 'file';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[] | number[];
  helpText?: string;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    message?: string;
  };
}

export interface FormFieldProps {
  field: Field;
  value: any;
  onChange: (name: string, value: any) => void;
  readOnly?: boolean;
}