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

    // Update project with machine reference
    await Project.findByIdAndUpdate(
      projectId,
      { 
        $push: { 
          machines: {
            id: savedMachine._id,
            name: savedMachine.name
          }
        }
      },
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

    // Update basic fields if they exist in updateData
    Object.keys(updateData).forEach(key => {
      if (key !== 'sections' && key !== '_id' && updateData[key] !== undefined) {
        (machine as any)[key] = updateData[key];
      }
    });

    // Create a map of field names to their new values
    const fieldValues: Record<string, any> = {};
    Object.entries(updateData).forEach(([key, value]) => {
      if (key !== 'sections' && key !== '_id' && key !== 'name' && key !== 'sheetNumber') {
        fieldValues[key] = value;
      }
    });

    // Update field values in sections
    if (machine.sections) {
      machine.sections = machine.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => ({
          ...field,
          value: fieldValues[field.name] !== undefined ? fieldValues[field.name] : field.value
        }))
      }));
    }

    const savedMachine = await machine.save();
    console.log('Saved machine:', savedMachine); // Debug log
    return savedMachine;
  } catch (error) {
    console.error('Error updating machine:', error); // Debug log
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