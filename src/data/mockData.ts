import { Project } from '../types';

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
    mfgOrigin: 'South Korea',
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