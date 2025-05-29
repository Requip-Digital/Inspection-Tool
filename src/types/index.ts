export interface Project {
  id: string;
  name: string;
  inspectionDate: string;
  city: string;
  originallyBought: string;
  mfgOrigin: string;
  template: string;
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
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'file';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  helpText?: string;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    message?: string;
  };
  dependsOn?: {
    field: string;
    value: string | number | boolean;
  };
}