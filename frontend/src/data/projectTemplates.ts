import { Template } from '../types';

export const PROJECT_TEMPLATES: Template[] = [
  {
    "id": "1",
    "name": "Toyota",
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
          { "id": "askingPrice", "name": "askingPrice", "type": "text", "label": "Asking Price (Ex Mill Price)", "placeholder": "Enter asking price (ex mill price)" }
        ]
      }
    ]
  },
  {
    "id": "2",
    "name": "Picanol",
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
          { "id": "askingPrice", "name": "askingPrice", "type": "text", "label": "Asking Price (Ex Mill Price)", "placeholder": "Enter asking price (ex mill price)" }
        ]
      }
    ]
  }
];