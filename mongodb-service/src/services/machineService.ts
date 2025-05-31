import Machine, { IMachine } from '../models/Machine';
import Project from '../models/Project';
import { Template, Section, Field } from '../types';

interface MachineData {
  name: string;
  sheetNumber: number;
  template: string;
  templateData: Template;
  [key: string]: any;
}

export const createMachine = async (projectId: string, machineData: MachineData): Promise<IMachine> => {
  try {
    const templateData  = machineData;

    // Create sections with fields from template
    const sections = templateData.sections.map((section: Section) => ({
      id: section.id,
      name: section.name,
      fields: section.fields.map((field: Field) => ({
        ...field,
        value: machineData[field.name] || null
      }))
    }));

    // Create new machine
    const machine = new Machine({
      projectId,
      name: machineData.name,
      sheetNumber: machineData.sheetNumber,
      template: machineData.template,
      sections
    });

    const savedMachine = await machine.save();

    // Update project's machines array
    await Project.findByIdAndUpdate(
      projectId,
      { $push: { machines: savedMachine._id } },
      { new: true }
    );

    return savedMachine;
  } catch (error) {
    throw error;
  }
};

interface UpdateData {
  name?: string;
  sheetNumber?: number;
  [key: string]: any;
}

export const updateMachine = async (machineId: string, updateData: UpdateData): Promise<IMachine | null> => {
  try {
    const machine = await Machine.findById(machineId);
    if (!machine) {
      throw new Error('Machine not found');
    }

    // Update basic fields
    if (updateData.name) machine.name = updateData.name;
    if (updateData.sheetNumber) machine.sheetNumber = updateData.sheetNumber;

    // Update field values in sections
    machine.sections.forEach((section: any) => {
      section.fields.forEach((field: any) => {
        if (updateData[field.name] !== undefined) {
          field.value = updateData[field.name];
        }
      });
    });

    return await machine.save();
  } catch (error) {
    throw error;
  }
};

export const getMachine = async (machineId: string): Promise<IMachine | null> => {
  try {
    return await Machine.findById(machineId);
  } catch (error) {
    throw error;
  }
};

export const getMachinesByProject = async (projectId: string): Promise<IMachine[]> => {
  try {
    return await Machine.find({ projectId });
  } catch (error) {
    throw error;
  }
}; 