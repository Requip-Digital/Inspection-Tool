export interface Field {
  id: string;
  name: string;
  type: string;
  label: string;
  options?: any[];
  validation?: {
    min?: number;
    max?: number;
    message?: string;
  };
  required?: boolean;
}

export interface Section {
  id: string;
  name: string;
  fields: Field[];
}

export interface Template {
  id: string;
  name: string;
  sections: Section[];
} 