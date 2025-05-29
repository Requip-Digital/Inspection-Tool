import { Project, Template } from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Toyota Project 1',
    inspectionDate: '11/12/2024',
    city: 'Surat',
    originallyBought: 'New',
    mfgOrigin: 'Japan',
    template: 'Toyota',
    machines: [
      { id: '1', name: 'Machine A', sheetNumber: 1 },
      { id: '2', name: 'Machine B', sheetNumber: 2 }
    ],
    imageUrl: 'https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Picanol Airjet Project 1',
    inspectionDate: '21/3/2024',
    city: 'Pune',
    originallyBought: 'Used',
    mfgOrigin: 'Lorem Ipsum',
    template: 'Picanol',
    machines: [
      { id: '3', name: 'Machine A', sheetNumber: 1 },
      { id: '4', name: 'Machine B', sheetNumber: 2 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582489853490-cd3a53eb4530?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: '3',
    name: 'Toyota Project 2',
    inspectionDate: '03/05/2024',
    city: 'Surat',
    originallyBought: 'New',
    mfgOrigin: 'Japan',
    template: 'Toyota',
    machines: [],
    imageUrl: 'https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const MOCK_TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Toyota',
    sections: [
      {
        id: 'general',
        name: 'General',
        fields: [
          {
            id: 'millMachineNo',
            name: 'millMachineNo',
            type: 'text',
            label: 'Mill Machine No',
            required: true
          },
          {
            id: 'model',
            name: 'model',
            type: 'text',
            label: 'Model',
            required: true
          },
          {
            id: 'typeOfFabric',
            name: 'typeOfFabric',
            type: 'select',
            label: 'Type of Fabric',
            options: ['Cotton', 'Denim', 'Polyester', 'Wool']
          },
          {
            id: 'yearOfMfg',
            name: 'yearOfMfg',
            type: 'number',
            label: 'Year of Mfg',
            validation: {
              min: 1900,
              max: new Date().getFullYear(),
              message: 'Please enter a valid year'
            }
          }
        ]
      },
      {
        id: 'criticalComp',
        name: 'Critical Comp.',
        fields: [
          {
            id: 'compStatus',
            name: 'compStatus',
            type: 'select',
            label: 'Component Status',
            options: ['Excellent', 'Good', 'Fair', 'Poor']
          }
        ]
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: [
          {
            id: 'voltage',
            name: 'voltage',
            type: 'number',
            label: 'Voltage',
            required: true
          }
        ]
      },
      {
        id: 'accessories',
        name: 'Accessories',
        fields: [
          {
            id: 'accessoryList',
            name: 'accessoryList',
            type: 'multiselect',
            label: 'Accessories',
            options: ['Manual', 'Tool Kit', 'Spare Parts', 'Cleaning Kit']
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Picanol',
    sections: [
      {
        id: 'general',
        name: 'General',
        fields: [
          {
            id: 'millMachineNo',
            name: 'millMachineNo',
            type: 'text',
            label: 'Mill Machine No',
            required: true
          },
          {
            id: 'model',
            name: 'model',
            type: 'text',
            label: 'Model',
            required: true
          },
          {
            id: 'typeOfFabric',
            name: 'typeOfFabric',
            type: 'select',
            label: 'Type of Fabric',
            options: ['Cotton', 'Denim', 'Polyester', 'Wool']
          },
          {
            id: 'yearOfMfg',
            name: 'yearOfMfg',
            type: 'number',
            label: 'Year of Mfg',
            validation: {
              min: 1900,
              max: new Date().getFullYear(),
              message: 'Please enter a valid year'
            }
          }
        ]
      },
      {
        id: 'criticalComp',
        name: 'Critical Comp.',
        fields: []
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: []
      },
      {
        id: 'accessories',
        name: 'Accessories',
        fields: []
      }
    ]
  }
];

// Default machine data
export const DEFAULT_MACHINE = {
  id: '',
  name: '',
  sheetNumber: 0,
  millMachineNo: '',
  model: '',
  typeOfFabric: '',
  yearOfMfg: new Date().getFullYear(),
  photos: []
};