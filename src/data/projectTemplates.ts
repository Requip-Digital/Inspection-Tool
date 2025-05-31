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
          { "id": "mfgOrigin", "name": "mfgOrigin", "type": "number", "label": "Mfg. Origin", "placeholder": "Manufacturing year", "validation": { "min": 1900, "max": 2025, "message": "Please enter a valid year" }, "required": true },
          { "id": "nearestAirport", "name": "nearestAirport", "type": "text", "label": "Nearest Airport", "placeholder": "E.g., BOM, DEL", "required": true },
          { "id": "condition", "name": "condition", "type": "select", "label": "Condition", "options": ["Excellent", "Good", "Fair", "Poor"], "required": true }
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
          { "id": "millName", "name": "millName", "type": "text", "label": "Mill Name", "placeholder": "Enter mill name", "required": true },
          { "id": "city", "name": "city", "type": "text", "label": "City", "placeholder": "E.g., Pune, Surat", "required": true },
          { "id": "country", "name": "country", "type": "text", "label": "Country", "placeholder": "E.g., India, China", "required": true },
          { "id": "nearestAirport", "name": "nearestAirport", "type": "text", "label": "Nearest Airport", "placeholder": "E.g., BOM, DEL", "required": true },
          { "id": "condition", "name": "condition", "type": "select", "label": "Condition", "options": ["Excellent", "Good", "Fair", "Poor"], "required": true },
          { "id": "inspectedByDate", "name": "inspectedByDate", "type": "date", "label": "Inspected By/Date", "required": true },
          { "id": "originallyBought", "name": "originallyBought", "type": "select", "label": "Originally Bought", "options": ["New", "Used", "Refurbished"], "required": true },
          { "id": "mfgOrigin", "name": "mfgOrigin", "type": "text", "label": "Mfg. Origin", "placeholder": "E.g., Japan, Germany", "required": true },
          { "id": "delivery", "name": "delivery", "type": "text", "label": "Delivery", "placeholder": "Enter delivery details", "required": true },
          { "id": "askingPrice", "name": "askingPrice", "type": "text", "label": "Asking Price", "placeholder": "Enter asking price", "required": true }
        ]
      }
    ]
  }
];