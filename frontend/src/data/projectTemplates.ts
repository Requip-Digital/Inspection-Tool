import { Template } from '../types';
import { TEMPLATE_CATEGORIES } from '../types/constants';

export const PROJECT_TEMPLATES: Template[] = [
  {
    "id": "1",
    "name": "Toyota",
    "category": TEMPLATE_CATEGORIES['1'],
    "sections": [
      {
        "id": "details",
        "name": "Details",
        "fields": [
          { "id": "inspectionDate", "name": "inspectionDate", "type": "date", "label": "Inspection Date", "required": true },
          { "id": "city", "name": "city", "type": "text", "label": "City", "placeholder": "E.g., Pune, Surat", "required": true },
          { "id": "originallyBought", "name": "originallyBought", "type": "select", "label": "Originally Bought", "options": ["New", "Used", "Refurbished"], "required": true },
          { "id": "nearestAirport", "name": "nearestAirport", "type": "text", "label": "Nearest Airport", "placeholder": "E.g., BOM, DEL", "required": true },
          { "id": "condition", "name": "condition", "type": "select", "label": "Condition", "options": ["Excellent", "Good", "Fair", "Poor"], "required": true },
          { "id": "noOfMachines", "name": "noOfMachines", "type": "number", "label": "No. of Machines", "placeholder": "Enter no. of machines", "required": true  }
        ]
      }
    ]
  },
  {
    "id": "2",
    "name": "Picanol",
    "category": TEMPLATE_CATEGORIES['2'],
    "sections": [
      {
        "id": "details",
        "name": "Details",
        "fields": [
          { "id": "inspectionDate", "name": "inspectionDate", "type": "date", "label": "Inspection Date", "required": true },
          { "id": "city", "name": "city", "type": "text", "label": "City", "placeholder": "E.g., Pune, Surat", "required": true },
          { "id": "originallyBought", "name": "originallyBought", "type": "select", "label": "Originally Bought", "options": ["New", "Used", "Refurbished"], "required": true },
          { "id": "nearestAirport", "name": "nearestAirport", "type": "text", "label": "Nearest Airport", "placeholder": "E.g., BOM, DEL", "required": true },
          { "id": "condition", "name": "condition", "type": "select", "label": "Condition", "options": ["Excellent", "Good", "Fair", "Poor"], "required": true },
          { "id": "askingPrice", "name": "askingPrice", "type": "text", "label": "Asking Price (Ex Mill Price)", "placeholder": "Enter asking price (ex mill price)", "required": true },
          { "id": "noOfMachines", "name": "noOfMachines", "type": "number", "label": "No. of Machines", "placeholder": "Enter no. of machines", "required": true  }
        ]
      }
    ]
  },
  {
    "id": "3",
    "name": "Picanol Rapier",
    "category": TEMPLATE_CATEGORIES['3'],
    "sections": [
      {
        "id": "details",
        "name": "Details",
        "fields": [
          { "id": "inspectionDate", "name": "inspectionDate", "type": "date", "label": "Inspection Date", "required": true },
          { "id": "city", "name": "city", "type": "text", "label": "City", "placeholder": "E.g., Pune, Surat", "required": true },
          { "id": "originallyBought", "name": "originallyBought", "type": "select", "label": "Originally Bought", "options": ["New", "Used", "Refurbished"], "required": true },
          { "id": "nearestAirport", "name": "nearestAirport", "type": "text", "label": "Nearest Airport", "placeholder": "E.g., BOM, DEL", "required": true },
          { "id": "condition", "name": "condition", "type": "select", "label": "Condition", "options": ["Excellent", "Good", "Fair", "Poor"], "required": true },
          { "id": "askingPrice", "name": "askingPrice", "type": "text", "label": "Asking Price (Ex Mill Price)", "placeholder": "Enter asking price (ex mill price)", "required": true },
          { "id": "noOfMachines", "name": "noOfMachines", "type": "number", "label": "No. of Machines", "placeholder": "Enter no. of machines", "required": true  }
        ]
      }
    ]
  },
  {
    "id": "4",
    "name": "Somet Rapier",
    "category": TEMPLATE_CATEGORIES['4'],
    "sections": [
      {
        "id": "details",
        "name": "Details",
        "fields": [
          { "id": "inspectionDate", "name": "inspectionDate", "type": "date", "label": "Inspection Date", "required": true },
          { "id": "city", "name": "city", "type": "text", "label": "City", "placeholder": "E.g., Pune, Surat", "required": true },
          { "id": "originallyBought", "name": "originallyBought", "type": "select", "label": "Originally Bought", "options": ["New", "Used", "Refurbished"], "required": true },
          { "id": "nearestAirport", "name": "nearestAirport", "type": "text", "label": "Nearest Airport", "placeholder": "E.g., BOM, DEL", "required": true },
          { "id": "condition", "name": "condition", "type": "select", "label": "Condition", "options": ["Excellent", "Good", "Fair", "Poor"], "required": true },
          { "id": "askingPrice", "name": "askingPrice", "type": "text", "label": "Asking Price (Ex Mill Price)", "placeholder": "Enter asking price (ex mill price)", "required": true },
          { "id": "noOfMachines", "name": "noOfMachines", "type": "number", "label": "No. of Machines", "placeholder": "Enter no. of machines", "required": true  }
        ]
      }
    ]
  },
  {
    "id": "5",
    "name": "Vamatex Rapier",
    "category": TEMPLATE_CATEGORIES['5'],
    "sections": [
      {
        "id": "details",
        "name": "Details",
        "fields": [
          { "id": "inspectionDate", "name": "inspectionDate", "type": "date", "label": "Inspection Date", "required": true },
          { "id": "city", "name": "city", "type": "text", "label": "City", "placeholder": "E.g., Pune, Surat", "required": true },
          { "id": "originallyBought", "name": "originallyBought", "type": "select", "label": "Originally Bought", "options": ["New", "Used", "Refurbished"], "required": true },
          { "id": "nearestAirport", "name": "nearestAirport", "type": "text", "label": "Nearest Airport", "placeholder": "E.g., BOM, DEL", "required": true },
          { "id": "condition", "name": "condition", "type": "select", "label": "Condition", "options": ["Excellent", "Good", "Fair", "Poor"], "required": true },
          { "id": "askingPrice", "name": "askingPrice", "type": "text", "label": "Asking Price (Ex Mill Price)", "placeholder": "Enter asking price (ex mill price)", "required": true },
          { "id": "noOfMachines", "name": "noOfMachines", "type": "number", "label": "No. of Machines", "placeholder": "Enter no. of machines", "required": true  }
        ]
      }
    ]
  },
  {
    "id": "6",
    "name": "SMIT Rapier",
    "category": TEMPLATE_CATEGORIES['6'],
    "sections": [
      {
        "id": "details",
        "name": "Details",
        "fields": [
          { "id": "inspectionDate", "name": "inspectionDate", "type": "date", "label": "Inspection Date", "required": true },
          { "id": "city", "name": "city", "type": "text", "label": "City", "placeholder": "E.g., Pune, Surat", "required": true },
          { "id": "originallyBought", "name": "originallyBought", "type": "select", "label": "Originally Bought", "options": ["New", "Used", "Refurbished"], "required": true },
          { "id": "nearestAirport", "name": "nearestAirport", "type": "text", "label": "Nearest Airport", "placeholder": "E.g., BOM, DEL", "required": true },
          { "id": "condition", "name": "condition", "type": "select", "label": "Condition", "options": ["Excellent", "Good", "Fair", "Poor"], "required": true },
          { "id": "askingPrice", "name": "askingPrice", "type": "text", "label": "Asking Price (Ex Mill Price)", "placeholder": "Enter asking price (ex mill price)", "required": true },
          { "id": "noOfMachines", "name": "noOfMachines", "type": "number", "label": "No. of Machines", "placeholder": "Enter no. of machines", "required": true  }
        ]
      }
    ]
  },
  {
    "id": "7",
    "name": "Itema Rapier",
    "category": TEMPLATE_CATEGORIES['7'],
    "sections": [
      {
        "id": "details",
        "name": "Details",
        "fields": [
          { "id": "inspectionDate", "name": "inspectionDate", "type": "date", "label": "Inspection Date", "required": true },
          { "id": "city", "name": "city", "type": "text", "label": "City", "placeholder": "E.g., Pune, Surat", "required": true },
          { "id": "originallyBought", "name": "originallyBought", "type": "select", "label": "Originally Bought", "options": ["New", "Used", "Refurbished"], "required": true },
          { "id": "nearestAirport", "name": "nearestAirport", "type": "text", "label": "Nearest Airport", "placeholder": "E.g., BOM, DEL", "required": true },
          { "id": "condition", "name": "condition", "type": "select", "label": "Condition", "options": ["Excellent", "Good", "Fair", "Poor"], "required": true },
          { "id": "askingPrice", "name": "askingPrice", "type": "text", "label": "Asking Price (Ex Mill Price)", "placeholder": "Enter asking price (ex mill price)", "required": true },
          { "id": "noOfMachines", "name": "noOfMachines", "type": "number", "label": "No. of Machines", "placeholder": "Enter no. of machines", "required": true  }
        ]
      }
    ]
  }
];