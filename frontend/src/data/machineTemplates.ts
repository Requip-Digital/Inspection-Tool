import { Template } from '../types';

export const MACHINE_TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Toyota',
    sections: [
      {
        id: 'general',
        name: 'General',
        fields: [
          { id: 'millMachineNo', name: 'millMachineNo', type: 'text', label: 'Mill Machine No', required: true },
          { id: 'model', name: 'model', type: 'select', label: 'Model', options: ['JAT 610', 'JAT 710', 'JAT 810', 'JAT 910'], required: true },
          { id: 'yearOfMfg', name: 'yearOfMfg', type: 'number', label: 'Year of Mfg', validation: { min: 2000, max: new Date().getFullYear(), message: 'Only above 2000' } },
          { id: 'typeOfFabric', name: 'typeOfFabric', type: 'select', label: 'Type Of Fabric', options: ['Velvet', 'Carpet', 'Terry', 'Label', 'Tyre Cord', 'Denim', 'Grey', 'Yarn Dyed', 'Jacquard Fabric', 'Georget', 'Matras Sticking', 'Upholsterry', 'Kanvas', 'Net', 'Bed Sheet', 'Sarong/Sari'] },
          { id: 'machineNameplatePhoto', name: 'machineNameplatePhoto', type: 'file', label: 'Machine Nameplate Photo'},
          { id: 'workingWidth', name: 'workingWidth', type: 'select', label: 'Working Width (cm)', options: [150, 170, 190, 210, 230, 250, 280, 340, 360] }
        ]
      },
      {
        id: 'sheddingSystem',
        name: 'Shedding System',
        fields: [
          { id: 'sheddingMechanism', name: 'sheddingMechanism', type: 'select', label: 'Shedding Mechanism', options: ['Crank', 'Cam', 'Dobby', 'E shedding'] },
          { id: 'photoSheddingMotionModel', name: 'photoSheddingMotionModel', type: 'file', label: 'Shedding Motion Model' },
          { id: 'sheddingMotionMake', name: 'sheddingMotionMake', type: 'select', label: 'Shedding Motion Make', options: ['Staubli', 'Yamada', 'Toyota', 'Filmtex'] }
        ]
      },
      {
        id: 'weftInsertion',
        name: 'Weft Insertion System',
        fields: [
          { id: 'noOfNozzlesColours', name: 'noOfNozzlesColours', type: 'number', label: 'No of Nozzles/Colours', validation: { min: 1, max: 8, message: 'Only between 1 and 8' } },
          { id: 'photoNozzleColours', name: 'photoNozzleColours', type: 'file', label: 'Nozzle/Colours Photo' },
          { id: 'noOfWeftFeeder', name: 'noOfWeftFeeder', type: 'number', label: 'No. of Weft Feeder', validation: { min: 1, max: 8, message: 'Only between 1 and 8' } },
          { id: 'photoWeftFeeder', name: 'photoWeftFeeder', type: 'file', label: 'Weft Feeder Photo' },
          { id: 'photoWeftStand', name: 'photoWeftStand', type: 'file', label: 'Weft Stand Photo' },
          { id: 'photoWeftBreakSystem', name: 'photoWeftBreakSystem', type: 'file', label: 'Weft Break System Photo' }
        ]
      },
      {
        id: 'beamSpecs',
        name: 'Beam Specifications',
        fields: [
          { id: 'warpBeamDia', name: 'warpBeamDia', type: 'text', label: 'Warp Beam Dia (mm)', validation: { min: 800, max: 1200, message: 'Only between 800 and 1200' } },
          { id: 'doubleBeam', name: 'doubleBeam', type: 'select', label: 'Double Beam', options: ['Yes', 'No'] },
          { id: 'photoBeamPipe', name: 'photoBeamPipe', type: 'file', label: 'Beam Pipe' }
        ]
      },
      {
        id: 'warpControl',
        name: 'Warp Control',
        fields: [
          { id: 'easingMotion', name: 'easingMotion', type: 'select', label: 'Easing Motion', options: ['Available', 'Not Available'] },
          { id: 'photoEasingMotion', name: 'photoEasingMotion', type: 'file', label: 'Easing Motion Photo' },
          { id: 'noOfWarpStopBar', name: 'noOfWarpStopBar', type: 'number', label: 'No of Warp Stop Bar' },
          { id: 'photoWarpStopMotion', name: 'photoWarpStopMotion', type: 'file', label: 'Warp Stop Motion Photo' },
          { id: 'noOfWarpBeamSupplied', name: 'noOfWarpBeamSupplied', type: 'number', label: 'No of Warp Beam Supplied' },
          { id: 'warpStopMotionPhoto', name: 'warpStopMotionPhoto', type: 'file', label: 'Warp Stop Motion Photo'}
        ]
      },
      {
        id: 'criticalComponents',
        name: 'Critical Components',
        fields: [
          { id: 'noOfClothRollSupplied', name: 'noOfClothRollSupplied', type: 'select', label: 'No of Cloth Roll Supplied', options: [1, 1.5, 2] },
          { id: 'clothRollPhoto', name: 'clothRollPhoto', type: 'file', label: 'Cloth Roll Photo'},
          { id: 'selvedgeType', name: 'selvedgeType', type: 'select', label: 'Selvedge Type', options: ['Rotary Leno', 'Leno', 'Tuck-in', 'E Leno', 'Eurotech'] },
          { id: 'photoSelvedgeType', name: 'photoSelvedgeType', type: 'file', label: 'Selvedge Type Photo' },
          { id: 'noOfBackRestRoll', name: 'noOfBackRestRoll', type: 'select', label: 'No of Back Rest Roll', options: [1, 2] },
          { id: 'noOfReedSupplied', name: 'noOfReedSupplied', type: 'number', label: 'No of Reed Supplied' },
          { id: 'clothTakeUpType', name: 'clothTakeUpType', type: 'select', label: 'Cloth Take-Up Type', options: ['Off loom (batching)', 'on loom (cloth roll)'] },
          { id: 'takeUpMotion', name: 'takeUpMotion', type: 'select', label: 'Take up Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoTakeUpMotion', name: 'photoTakeUpMotion', type: 'file', label: 'Take up Motion Photo' },
          { id: 'letOffMotion', name: 'letOffMotion', type: 'select', label: 'Let-off Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoLetOffMotion', name: 'photoLetOffMotion', type: 'file', label: 'Let-off Motion Photo' },
          { id: 'templeType', name: 'templeType', type: 'select', label: 'Temple Type', options: ['Normal', 'Full width'] },
          { id: 'photoTemple', name: 'photoTemple', type: 'file', label: 'Temple Photo' }
        ]
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: [
          { id: 'inverter', name: 'inverter', type: 'select', label: 'Inverter', options: ['Group', 'Individual', 'No inverter supplied'] },
          { id: 'photoInverter', name: 'photoInverter', type: 'file', label: 'Inverter Photo' },
          { id: 'photoElectricPanelBox', name: 'photoElectricPanelBox', type: 'file', label: 'Electric Panel Box Photo' },
          { id: 'voltage', name: 'voltage', type: 'select', label: 'Voltage', options: [200, 220, 380, 440, 560] },
          { id: 'frequency', name: 'frequency', type: 'select', label: 'Frequency', options: [50, 60] }
        ]
      },
      {
        id: 'accessories',
        name: 'Accessories',
        fields: [
          { id: 'machineRunningRpm', name: 'machineRunningRpm', type: 'text', label: 'Machine Running RPM' },
          { id: 'beamType', name: 'beamType', type: 'select', label: 'Beam Type', options: ['Single beam', 'Twin beam'] },
          { id: 'autoPickFinder', name: 'autoPickFinder', type: 'select', label: 'Auto Pick Finder', options: ['Available', 'Not Available'] },
          { id: 'underMotionCapacity', name: 'underMotionCapacity', type: 'text', label: 'Under Motion Capacity' },
          { id: 'sheddingMotionCapacity', name: 'sheddingMotionCapacity', type: 'select', label: 'Shedding Motion Capacity (Lever)', options: [24, 10, 20, 12, 16, 8, 6, 4, 7, 14, 9] },
          { id: 'sheddingMotionInstalled', name: 'sheddingMotionInstalled', type: 'select', label: 'Shedding Motion Installed Capacity (Lever)', options: [24, 10, 20, 12, 16, 8, 6, 4, 7, 14, 9] },
          { id: 'photoLever', name: 'photoLever', type: 'file', label: 'Lever Photo' },
          { id: 'photoLeverCapacity', name: 'photoLeverCapacity', type: 'file', label: 'Lever Capacity Photo' },
          { id: 'noOfFramesSupplied', name: 'noOfFramesSupplied', type: 'number', label: 'No of Frames Supplied' },
          { id: 'noOfHealdWire', name: 'noOfHealdWire', type: 'number', label: 'No of Heald Wire Supplied/Set' },
          { id: 'noOfDropper', name: 'noOfDropper', type: 'number', label: 'No of Dropper Supplied' }
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
          { id: 'model', name: 'model', type: 'select', label: 'Model', options: ['OmniPlus', 'OmniPlus 800', 'Summum', 'OmniPlus i Connect'], required: true },
          { id: 'yearOfMfg', name: 'yearOfMfg', type: 'number', label: 'Year of Mfg', validation: { min: 2000, max: new Date().getFullYear(), message: 'Only above 2000' } },
          { id: 'typeOfFabric', name: 'typeOfFabric', type: 'select', label: 'Type Of Fabric', options: ['Velvet', 'Carpet', 'Terry', 'Label', 'Tyre Cord', 'Denim', 'Grey', 'Yarn Dyed', 'Jacquard Fabric', 'Georget', 'Matras Sticking', 'Upholsterry', 'Kanvas', 'Net', 'Bed Sheet', 'Sarong/Sari'] },
          { id: 'machineNameplatePhoto', name: 'machineNameplatePhoto', type: 'file', label: 'Machine Nameplate Photo'},
          { id: 'workingWidth', name: 'workingWidth', type: 'select', label: 'Working Width (cm)', options: [190, 220, 250, 280, 340] }
        ]
      },
      {
        id: 'sheddingSystem',
        name: 'Shedding System',
        fields: [
          { id: 'sheddingMechanism', name: 'sheddingMechanism', type: 'select', label: 'Shedding Mechanism', options: ['Cam', 'Crank', 'Dobby'] },
          { id: 'sheddingMotionType', name: 'sheddingMotionType', type: 'select', label: 'Shedding Motion Type', options: ['Mechanical', 'Electronic'] },
          { id: 'sheddingMotionMake', name: 'sheddingMotionMake', type: 'select', label: 'Shedding Motion Make', options: ['Staubli'] },
          { id: 'sheddingMotionModelPhoto', name: 'sheddingMotionModelPhoto', type: 'file', label: 'Shedding Motion Model Photo' }
        ]
      },
      {
        id: 'weftInsertionSystem',
        name: 'Weft Insertion System',
        fields: [
          { id: 'noOfNozzles', name: 'noOfNozzles', type: 'select', label: 'No of Nozzles', options: [2, 4, 6] },
          { id: 'nozzlePhoto', name: 'nozzlePhoto', type: 'file', label: 'Nozzle Photo' },
          { id: 'noOfPrewinder', name: 'noOfPrewinder', type: 'select', label: 'No of Prewinder/Set', options: [2, 4, 6] },
          { id: 'weftStandPhoto', name: 'weftStandPhoto', type: 'file', label: 'Weft Stand Photo' },
          { id: 'weftBreakSystemPhoto', name: 'weftBreakSystemPhoto', type: 'file', label: 'Weft Break System Photo' },
          { id: 'weftFeederPhoto', name: 'weftFeederPhoto', type: 'file', label: 'Weft Feeder Photo' }
        ]
      },
      {
        id: 'beamSpecifications',
        name: 'Beam Specifications',
        fields: [
          { id: 'beamType', name: 'beamType', type: 'select', label: 'Beam Type', options: ['Single beam', 'twin beam'] },
          { id: 'topBeam', name: 'topBeam', type: 'select', label: 'Top Beam', options: ['Yes', 'No'] },
          { id: 'numberOfBeamPipes', name: 'numberOfBeamPipes', type: 'number', label: 'Number of Beam Pipes' },
          { id: 'beamPipeDiameter', name: 'beamPipeDiameter', type: 'text', label: 'Beam Pipe Diameter (mm)' },
          { id: 'beamPipePhoto', name: 'beamPipePhoto', type: 'file', label: 'Beam Pipe Photo' },
          { id: 'selvedgeType', name: 'selvedgeType', type: 'select', label: 'Selvedge Type', options: ['Rotary Leno', 'Tuck-in', 'Electronic Leno'] },
          { id: 'selvedgePhoto', name: 'selvedgePhoto', type: 'file', label: 'Selvedge Photo' },
          { id: 'templeType', name: 'templeType', type: 'select', label: 'Temple Type', options: ['Normal', 'Full width'] },
          { id: 'templePhoto', name: 'templePhoto', type: 'file', label: 'Photo of Temple' }
        ]
      },
      {
        id: 'warpControl',
        name: 'Warp Control',
        fields: [
          { id: 'noOfWarpStopBar', name: 'noOfWarpStopBar', type: 'number', label: 'No of Warp Stop Bar' },
          { id: 'warpStopMotionPhoto', name: 'warpStopMotionPhoto', type: 'file', label: 'Photo of Warp Stop Motion' },
          { id: 'easingMotion', name: 'easingMotion', type: 'select', label: 'Easing Motion', options: ['Available', 'Not Available'] },
          { id: 'easingMotionPhoto', name: 'easingMotionPhoto', type: 'file', label: 'Easing Motion Photo' },
          { id: 'letOffMotion', name: 'letOffMotion', type: 'select', label: 'Let-off Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'letOffMotionPhoto', name: 'letOffMotionPhoto', type: 'file', label: 'Photo of Let-off Motion' }
        ]
      },
      {
        id: 'criticalComponents',
        name: 'Critical Components',
        fields: [
          { id: 'clothTakeUpType', name: 'clothTakeUpType', type: 'select', label: 'Cloth Take-Up Type', options: ['Off loom (batching)', 'on loom (cloth roll)'] },
          { id: 'takeUpMotion', name: 'takeUpMotion', type: 'select', label: 'Take Up Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'takeUpMotionPhoto', name: 'takeUpMotionPhoto', type: 'file', label: 'Photo of Take-up Motion' },
          { id: 'numberOfClothRolls', name: 'numberOfClothRolls', type: 'select', label: 'Number of Cloth Rolls', options: [1, 1.5, 2] },
          { id: 'clothRollPhoto', name: 'clothRollPhoto', type: 'file', label: 'Cloth Roll Photo' },
          { id: 'noOfReedSupplied', name: 'noOfReedSupplied', type: 'number', label: 'No of Reed Supplied' },
          { id: 'noOfBackRestRoll', name: 'noOfBackRestRoll', type: 'select', label: 'No of Back Rest Roll', options: [1, 2] }
        ]
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: [
          { id: 'inverter', name: 'inverter', type: 'select', label: 'Inverter', options: ['Group', 'Individual', 'No inverter supplied'] },
          { id: 'inverterPhoto', name: 'inverterPhoto', type: 'file', label: 'Inverter Photo' },
          { id: 'voltage', name: 'voltage', type: 'select', label: 'Voltage', options: [200, 220, 380, 440, 560] },
          { id: 'frequency', name: 'frequency', type: 'select', label: 'Frequency', options: [50, 60] }
        ]
      },
      {
        id: 'accessories',
        name: 'Accessories',
        fields: [
          { id: 'machineRunningRpm', name: 'machineRunningRpm', type: 'text', label: 'Machine Running RPM' },
          { id: 'autoPickFinder', name: 'autoPickFinder', type: 'select', label: 'Auto Pick Finder', options: ['Available', 'Not Available'] },
          { id: 'undermotionCapacity', name: 'undermotionCapacity', type: 'number', label: 'Undermotion Capacity' },
          { id: 'sheddingMotionCapacity', name: 'sheddingMotionCapacity', type: 'select', label: 'Shedding Motion Capacity (Lever)', options: [24, 10, 20, 12, 16, 8, 6, 4, 7, 14, 9] },
          { id: 'sheddingMotionInstalled', name: 'sheddingMotionInstalled', type: 'select', label: 'Shedding Motion Installed Capacity (Lever)', options: [24, 10, 20, 12, 16, 8, 6, 4, 7, 14, 9] },
          { id: 'installedLeverPhoto', name: 'installedLeverPhoto', type: 'file', label: 'Installed Lever Photo' },
          { id: 'leverCapacityPhoto', name: 'leverCapacityPhoto', type: 'file', label: 'Lever Capacity Photo' },
          { id: 'noOfFramesSupplied', name: 'noOfFramesSupplied', type: 'number', label: 'No of Frames Supplied' },
          { id: 'noOfHealdWire', name: 'noOfHealdWire', type: 'number', label: 'No of Heald Wire Supplied/Set' },
          { id: 'noOfDropper', name: 'noOfDropper', type: 'number', label: 'No of Dropper Supplied' }
        ]
      }
    ]
  }
]; 