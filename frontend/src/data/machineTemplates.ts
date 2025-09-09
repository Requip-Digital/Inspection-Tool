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
          { id: 'yearOfMfg', name: 'yearOfMfg', type: 'number', label: 'Year of Manufacturing', validation: { min: 2000, max: new Date().getFullYear(), message: 'Only above 2000' } },
          { id: 'typeOfFabric', name: 'typeOfFabric', type: 'select', label: 'Type Of Fabric', options: ['Velvet', 'Carpet', 'Terry', 'Label', 'Tyre Cord', 'Denim', 'Grey', 'Yarn Dyed', 'Jacquard Fabric', 'Georget', 'Matras Sticking', 'Upholsterry', 'Kanvas', 'Net', 'Bed Sheet', 'Sarong/Sari'] },
          { id: 'workingWidth', name: 'workingWidth', type: 'select', label: 'Working Width (cm)', options: [150, 170, 190, 210, 230, 250, 280, 340, 360] },
          { id: 'machineNameplatePhoto', name: 'machineNameplatePhoto', type: 'file', label: 'Machine Nameplate Photo', required: true},
        ]
      },
      {
        id: 'sheddingSystem',
        name: 'Shedding System',
        fields: [
          { id: 'sheddingMechanism', name: 'sheddingMechanism', type: 'select', label: 'Shedding Mechanism', options: ['Crank', 'Cam', 'Dobby', 'E shedding'] },
          { id: 'sheddingMotionMake', name: 'sheddingMotionMake', type: 'select', label: 'Shedding Motion Make', options: ['Staubli', 'Yamada', 'Toyota', 'Filmtex'] },
          { id: 'sheddingMotionModel', name: 'sheddingMotionModel', type: 'text', label: 'Shedding Motion Model' },
          { id: 'photoSheddingMotionModel', name: 'photoSheddingMotionModel', type: 'file', label: 'Shedding Motion Model (Photo)' },
          { id: 'sheddingMotionCapacity', name: 'sheddingMotionCapacity', type: 'select', label: 'Shedding Motion Capacity (Lever)', options: [24, 10, 20, 12, 16, 8, 6, 4, 7, 14, 9] },
          { id: 'sheddingMotionInstalled', name: 'sheddingMotionInstalled', type: 'select', label: 'Shedding Motion Installed Capacity (Lever)', options: [24, 10, 20, 12, 16, 8, 6, 4, 7, 14, 9] },
          { id: 'noOfFramesSupplied', name: 'noOfFramesSupplied', type: 'number', label: 'No. of Frames Supplied' },
          { id: 'photoLever', name: 'photoLever', type: 'file', label: 'Lever Photo', validation: { min: 1, message: 'At least one lever photo is required' }},
          { id: 'photoLeverCapacity', name: 'photoLeverCapacity', type: 'file', label: 'Lever Capacity Photo', validation: { min: 1, message: 'At least one lever capacity photo is required' }},
        ]
      },
      {
        id: 'weftInsertion',
        name: 'Weft Insertion System',
        fields: [
          { id: 'noOfNozzlesColours', name: 'noOfNozzlesColours', type: 'number', label: 'No. of Nozzles/Colours', validation: { min: 1, max: 8, message: 'Only between 1 and 8' } },
          { id: 'photoNozzleColours', name: 'photoNozzleColours', type: 'file', label: 'Nozzle/Colours Photo' },
          { id: 'noOfWeftFeeder', name: 'noOfWeftFeeder', type: 'number', label: 'No. of Weft Feeder', validation: { min: 1, max: 8, message: 'Only between 1 and 8' } },
          { id: 'photoWeftFeeder', name: 'photoWeftFeeder', type: 'file', label: 'Weft Feeder Photo' },
          { id: 'photoWeftStand', name: 'photoWeftStand', type: 'file', label: 'Weft Stand Photo (if available)' },
          { id: 'photoWeftBreakSystem', name: 'photoWeftBreakSystem', type: 'file', label: 'Weft Break System Photo (if available)' }
        ]
      },
      {
        id: 'beamSpecs',
        name: 'Beam Specifications',
        fields: [
          { id: 'beamType', name: 'beamType', type: 'select', label: 'Beam Type', options: ['Single beam', 'Twin beam'] },
          { id: 'warpBeamDiameter', name: 'warpBeamDiameter', type: 'text', label: 'Warp Beam Diameter (mm)', validation: { min: 800, max: 1200, message: 'Only between 800 and 1200' } },
          { id: 'doubleBeam', name: 'doubleBeam', type: 'select', label: 'Double Beam', options: ['Yes', 'No'] },
          { id: 'noOfWarpBeamSupplied', name: 'noOfWarpBeamSupplied', type: 'number', label: 'No. of Warp Beam Supplied' },
          { id: 'photoBeamPipe', name: 'photoBeamPipe', type: 'file', label: 'Beam Pipe' },
          { id: 'selvedgeType', name: 'selvedgeType', type: 'select', label: 'Selvedge Type', options: ['Rotary Leno', 'Leno', 'Tuck-in', 'E Leno', 'Eurotech'] },
          { id: 'photoSelvedgeType', name: 'photoSelvedgeType', type: 'file', label: 'Selvedge Type Photo' },
          { id: 'templeType', name: 'templeType', type: 'select', label: 'Temple Type', options: ['Normal', 'Full width'] },
          { id: 'photoTemple', name: 'photoTemple', type: 'file', label: 'Temple Photo' }
        ]
      },
      {
        id: 'warpControl',
        name: 'Warp Control',
        fields: [
          { id: 'easingMotion', name: 'easingMotion', type: 'select', label: 'Easing Motion', options: ['Available', 'Not Available'] },
          { id: 'photoEasingMotion', name: 'photoEasingMotion', type: 'file', label: 'Easing Motion Photo' },
          { id: 'noOfWarpStopBar', name: 'noOfWarpStopBar', type: 'number', label: 'No. of Warp Stop Bar' },
          { id: 'photoWarpStopBar', name: 'photoWarpStopBar', type: 'file', label: 'Warp Stop Bar Photo' },
        ]
      },
      {
        id: 'criticalComponents',
        name: 'Critical Components',
        fields: [
          { id: 'noOfClothRollSupplied', name: 'noOfClothRollSupplied', type: 'select', label: 'No. of Cloth Roll Supplied', options: [1, 1.5, 2] },
          { id: 'clothRollPhoto', name: 'clothRollPhoto', type: 'file', label: 'Cloth Roll Photo'},
          { id: 'noOfBackRestRoll', name: 'noOfBackRestRoll', type: 'select', label: 'No. of Back Rest Roll', options: [1, 2] },
          { id: 'noOfReedSupplied', name: 'noOfReedSupplied', type: 'number', label: 'No. of Reed Supplied' },
          { id: 'clothTakeUpType', name: 'clothTakeUpType', type: 'select', label: 'Cloth Take-Up Type', options: ['Off loom (batching)', 'On loom (cloth roll)'] },
          { id: 'takeUpMotion', name: 'takeUpMotion', type: 'select', label: 'Take up Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoTakeUpMotion', name: 'photoTakeUpMotion', type: 'file', label: 'Take up Motion Photo' },
          { id: 'letOffMotion', name: 'letOffMotion', type: 'select', label: 'Let-off Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoLetOffMotion', name: 'photoLetOffMotion', type: 'file', label: 'Let-off Motion Photo' },
        ]
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: [
          { id: 'inverter', name: 'inverter', type: 'select', label: 'Inverter', options: ['Group', 'Individual', 'No. inverter supplied'] },
          { id: 'photoInverter', name: 'photoInverter', type: 'file', label: 'Inverter Photo' },
          { id: 'photoElectricPanelBox', name: 'photoElectricPanelBox', type: 'file', label: 'Electric Panel Box Photo', validation: { min: 3, message: 'At least one electric panel box photo is required' }},
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
          { id: 'underMotionCapacity', name: 'underMotionCapacity', type: 'number', label: 'Under Motion Capacity' },
          { id: 'noOfHealdWire', name: 'noOfHealdWire', type: 'number', label: 'No. of Heald Wire Supplied/Set' },
          { id: 'noOfDropper', name: 'noOfDropper', type: 'number', label: 'No. of Dropper Supplied' }
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
          { id: 'millMachineNo', name: 'millMachineNo', type: 'text', label: 'Mill Machine No', required: true },
          { id: 'model', name: 'model', type: 'select', label: 'Model', options: ['OmniPlus', 'OmniPlus 800', 'Summum', 'OmniPlus i Connect'], required: true },
          { id: 'yearOfMfg', name: 'yearOfMfg', type: 'number', label: 'Year of Manufacturing', validation: { min: 2000, max: new Date().getFullYear(), message: 'Only above 2000' } },
          { id: 'typeOfFabric', name: 'typeOfFabric', type: 'select', label: 'Type Of Fabric', options: ['Velvet', 'Carpet', 'Terry', 'Label', 'Tyre Cord', 'Denim', 'Grey', 'Yarn Dyed', 'Jacquard Fabric', 'Georget', 'Matras Sticking', 'Upholsterry', 'Kanvas', 'Net', 'Bed Sheet', 'Sarong/Sari'] },
          { id: 'workingWidth', name: 'workingWidth', type: 'select', label: 'Working Width (cm)', options: [150, 170, 190, 210, 220, 230, 250, 280, 340, 360] },
          { id: 'machineNameplatePhoto', name: 'machineNameplatePhoto', type: 'file', label: 'Machine Nameplate Photo', required: true }
        ]
      },
      {
        id: 'sheddingSystem',
        name: 'Shedding System',
        fields: [
          { id: 'sheddingMechanism', name: 'sheddingMechanism', type: 'select', label: 'Shedding Mechanism', options: ['Cam', 'Crank', 'Dobby'] },
          { id: 'sheddingMotionType', name: 'sheddingMotionType', type: 'select', label: 'Shedding Motion Type', options: ['Mechanical', 'Electronic'] },
          { id: 'sheddingMotionMake', name: 'sheddingMotionMake', type: 'select', label: 'Shedding Motion Make', options: ['Staubli'] },
          { id: 'sheddingMotionModel', name: 'sheddingMotionModel', type: 'text', label: 'Shedding Motion Model' },
          { id: 'photoSheddingMotionModel', name: 'photoSheddingMotionModel', type: 'file', label: 'Shedding Motion Model (Photo)' },
          { id: 'sheddingMotionCapacity', name: 'sheddingMotionCapacity', type: 'select', label: 'Shedding Motion Capacity (Lever)', options: [24, 10, 20, 12, 16, 8, 6, 4, 7, 14, 9] },
          { id: 'sheddingMotionInstalled', name: 'sheddingMotionInstalled', type: 'select', label: 'Shedding Motion Installed Capacity (Lever)', options: [24, 10, 20, 12, 16, 8, 6, 4, 7, 14, 9] },
          { id: 'noOfFramesSupplied', name: 'noOfFramesSupplied', type: 'number', label: 'No. of Frames Supplied' },
          { id: 'photoLever', name: 'photoLever', type: 'file', label: 'Lever Photo', validation: { min: 1, message: 'At least one lever photo is required' }},
          { id: 'photoLeverCapacity', name: 'photoLeverCapacity', type: 'file', label: 'Lever Capacity Photo', validation: { min: 1, message: 'At least one lever capacity photo is required' }}
        ]
      },
      {
        id: 'weftInsertion',
        name: 'Weft Insertion System',
        fields: [
          { id: 'noOfNozzles', name: 'noOfNozzles', type: 'select', label: 'No. of Nozzles', options: [2, 4, 6] },
          { id: 'nozzlePhoto', name: 'nozzlePhoto', type: 'file', label: 'Nozzle Photo' },
          { id: 'noOfPrewinder', name: 'noOfPrewinder', type: 'select', label: 'No. of Prewinder/Set', options: [2, 4, 6] },
          { id: 'weftStandPhoto', name: 'weftStandPhoto', type: 'file', label: 'Weft Stand Photo' },
          { id: 'weftBreakSystemPhoto', name: 'weftBreakSystemPhoto', type: 'file', label: 'Weft Break System Photo' },
          { id: 'weftFeederPhoto', name: 'weftFeederPhoto', type: 'file', label: 'Weft Feeder Photo' }
        ]
      },
      {
        id: 'beamSpecs',
        name: 'Beam Specifications',
        fields: [
          { id: 'beamType', name: 'beamType', type: 'select', label: 'Beam Type', options: ['Single beam', 'Twin beam'] },
          { id: 'topBeam', name: 'topBeam', type: 'select', label: 'Top Beam', options: ['Yes', 'No'] },
          { id: 'numberOfBeamPipes', name: 'numberOfBeamPipes', type: 'number', label: 'No. of Beam Pipes' },
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
          { id: 'easingMotion', name: 'easingMotion', type: 'select', label: 'Easing Motion', options: ['Available', 'Not Available'] },
          { id: 'photoEasingMotion', name: 'photoEasingMotion', type: 'file', label: 'Easing Motion Photo' },
          { id: 'noOfWarpStopBar', name: 'noOfWarpStopBar', type: 'number', label: 'No. of Warp Stop Bar' },
          { id: 'photoWarpStopBar', name: 'photoWarpStopBar', type: 'file', label: 'Warp Stop Bar Photo' }
        ]
      },
      {
        id: 'criticalComponents',
        name: 'Critical Components',
        fields: [
          { id: 'noOfClothRollSupplied', name: 'noOfClothRollSupplied', type: 'select', label: 'No. of Cloth Roll Supplied', options: [1, 1.5, 2] },
          { id: 'clothRollPhoto', name: 'clothRollPhoto', type: 'file', label: 'Cloth Roll Photo'},
          { id: 'noOfBackRestRoll', name: 'noOfBackRestRoll', type: 'select', label: 'No. of Back Rest Roll', options: [1, 2] },
          { id: 'noOfReedSupplied', name: 'noOfReedSupplied', type: 'number', label: 'No. of Reed Supplied' },
          { id: 'clothTakeUpType', name: 'clothTakeUpType', type: 'select', label: 'Cloth Take-Up Type', options: ['Off loom (batching)', 'On loom (cloth roll)'] },
          { id: 'takeUpMotion', name: 'takeUpMotion', type: 'select', label: 'Take up Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoTakeUpMotion', name: 'photoTakeUpMotion', type: 'file', label: 'Take up Motion Photo' },
          { id: 'letOffMotion', name: 'letOffMotion', type: 'select', label: 'Let-off Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoLetOffMotion', name: 'photoLetOffMotion', type: 'file', label: 'Let-off Motion Photo' },
        ]
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: [
          { id: 'inverter', name: 'inverter', type: 'select', label: 'Inverter', options: ['Group', 'Individual', 'No. inverter supplied'] },
          { id: 'photoInverter', name: 'photoInverter', type: 'file', label: 'Inverter Photo' },
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
          { id: 'underMotionCapacity', name: 'underMotionCapacity', type: 'number', label: 'Under Motion Capacity' },
          { id: 'noOfHealdWire', name: 'noOfHealdWire', type: 'number', label: 'No. of Heald Wire Supplied/Set' },
          { id: 'noOfDropper', name: 'noOfDropper', type: 'number', label: 'No. of Dropper Supplied' }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Picanol Rapier',
    sections: [
      {
        id: 'general',
        name: 'General',
        fields: [
          { id: 'millMachineNo', name: 'millMachineNo', type: 'text', label: 'Mill Machine No', required: true },
          { id: 'model', name: 'model', type: 'select', label: 'Model', options: ['PGW', 'GTM A', 'GTM', 'GTM AS', 'Optimax', 'GTX Plus', 'Gammax', 'GT-Max', 'Gamma', 'GTX', 'Optimax-i', 'GT-Max i'], required: true },
          { id: 'completeModelNamePlate', name: 'completeModelNamePlate', type: 'text', label: 'Complete Model Written On Name Plate' },
          { id: 'yearOfMfg', name: 'yearOfMfg', type: 'number', label: 'Year of Manufacturing', validation: { min: 2000, max: new Date().getFullYear(), message: 'Only above 2000' } },
          { id: 'typeOfFabric', name: 'typeOfFabric', type: 'select', label: 'Type Of Fabric', options: ['Velvet', 'Carpet', 'Terry', 'Label', 'Tyre Cord', 'Denim', 'Grey', 'Yarn Dyed', 'Jacquard Fabric', 'Georget', 'Matras Sticking', 'Upholsterry', 'Kanvas', 'Net', 'Bed Sheet', 'Sarong/Sari'] },
          { id: 'workingWidth', name: 'workingWidth', type: 'select', label: 'Working Width (cm)', options: [135, 150, 170, 175, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 340, 360, 380, 400, 420, 460] },
          { id: 'noOfColors', name: 'noOfColors', type: 'select', label: 'No Of Colors', options: [1, 2, 4, 6, 8, 10, 12] },
          { id: 'machineNameplatePhoto', name: 'machineNameplatePhoto', type: 'file', label: 'Machine Nameplate Photo', required: true }
        ]
      },
      {
        id: 'sheddingSystem',
        name: 'Shedding System',
        fields: [
          { id: 'sheddingMechanism', name: 'sheddingMechanism', type: 'select', label: 'Shedding Mechanism', options: ['Cam', 'Crank', 'Dobby'] },
          { id: 'sheddingMotionType', name: 'sheddingMotionType', type: 'select', label: 'Shedding Motion Type', options: ['Mechanical', 'Electronic'] },
          { id: 'sheddingMotionMake', name: 'sheddingMotionMake', type: 'select', label: 'Shedding Motion Make', options: ['Staubli'] },
          { id: 'sheddingMotionModel', name: 'sheddingMotionModel', type: 'text', label: 'Shedding Motion Model' },
          { id: 'photoSheddingMotionModel', name: 'photoSheddingMotionModel', type: 'file', label: 'Shedding Motion Model (Photo)' },
          { id: 'sheddingMotionCapacity', name: 'sheddingMotionCapacity', type: 'select', label: 'Shedding Motion Capacity (Lever)', options: [2, 4, 8, 10, 12, 14, 16, 18, 20, 24] },
          { id: 'sheddingMotionInstalled', name: 'sheddingMotionInstalled', type: 'select', label: 'Shedding Motion Installed Capacity (Lever)', options: [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24] },
          { id: 'noOfFramesSupplied', name: 'noOfFramesSupplied', type: 'number', label: 'No. of Frames Supplied', options: [2, 4, 6, 8, 10, 11, 12, 14, 16, 18, 20, 22, 24] },
          { id: 'photoLever', name: 'photoLever', type: 'file', label: 'Lever Photo' },
          { id: 'photoLeverCapacity', name: 'photoLeverCapacity', type: 'file', label: 'Lever Capacity Photo' }
        ]
      },
      {
        id: 'weftInsertion',
        name: 'Weft Insertion System',
        fields: [
          { id: 'noOfNozzles', name: 'noOfNozzles', type: 'select', label: 'No. of Nozzles', options: [1, 2, 4, 6, 8, 10, 12] },
          { id: 'nozzlePhoto', name: 'nozzlePhoto', type: 'file', label: 'Nozzle Photo' },
          { id: 'noOfPrewinder', name: 'noOfPrewinder', type: 'select', label: 'No. of Prewinder/Set', options: [1, 2, 3, 4, 5, 6, 7, 8, 12] },
          { id: 'weftStandPhoto', name: 'weftStandPhoto', type: 'file', label: 'Weft Stand Photo' },
          { id: 'weftBreakSystemPhoto', name: 'weftBreakSystemPhoto', type: 'file', label: 'Weft Break System Photo' },
          { id: 'weftFeederPhoto', name: 'weftFeederPhoto', type: 'file', label: 'Weft Feeder Photo' },
          { id: 'weftCutterType', name: 'weftCutterType', type: 'select', label: 'Weft Cutter Type', options: ['Mechanical', 'Electronic'] }
        ]
      },
      {
        id: 'beamSpecs',
        name: 'Beam Specifications',
        fields: [
          { id: 'beamType', name: 'beamType', type: 'select', label: 'Beam Type', options: ['Single beam', 'Twin beam'] },
          { id: 'topBeam', name: 'topBeam', type: 'select', label: 'Top Beam', options: ['Available', 'Not Available'] },
          { id: 'numberOfBeamPipes', name: 'numberOfBeamPipes', type: 'number', label: 'No. of Beam Pipes' },
          { id: 'noOfWarpBeamSupplied', name: 'noOfWarpBeamSupplied', type: 'select', label: 'No of Warp Beam Supplied', options: [1, 2, 3, 5] },
          { id: 'beamPipeDiameter', name: 'beamPipeDiameter', type: 'select', label: 'Beam Pipe Diameter (mm)', options: [600, 800, 940, 1000, 1100] },
          { id: 'beamPipePhoto', name: 'beamPipePhoto', type: 'file', label: 'Beam Pipe Photo' },
          { id: 'selvedgeType', name: 'selvedgeType', type: 'select', label: 'Selvedge Type', options: ['Leno', 'Tuck-in', 'Electronic Leno', 'Bobbin Rack', 'Elsy'] },
          { id: 'selvedgePhoto', name: 'selvedgePhoto', type: 'file', label: 'Selvedge Photo' },
          { id: 'selvedgeCutterType', name: 'selvedgeCutterType', type: 'select', label: 'Selvedge Cutter Type', options: ['Mechanical', 'Electronic'] },
          { id: 'selvedgeCutterPhoto', name: 'selvedgeCutterPhoto', type: 'file', label: 'Selvedge Cutter Photo' },
          { id: 'templeType', name: 'templeType', type: 'select', label: 'Temple Type', options: ['Normal', 'Full Width'] },
          { id: 'backRestType', name: 'backRestType', type: 'select', label: 'Back Rest Type' },
          { id: 'templePhoto', name: 'templePhoto', type: 'file', label: 'Photo of Temple' }
        ]
      },
      {
        id: 'warpControl',
        name: 'Warp Control',
        fields: [
          { id: 'easingMotion', name: 'easingMotion', type: 'select', label: 'Easing Motion', options: ['Available', 'Not Available'] },
          { id: 'photoEasingMotion', name: 'photoEasingMotion', type: 'file', label: 'Easing Motion Photo' },
          { id: 'noOfWarpStopBar', name: 'noOfWarpStopBar', type: 'number', label: 'No. of Warp Stop Bar', options: [4, 5, 6, 8] },
          { id: 'photoWarpStopBar', name: 'photoWarpStopBar', type: 'file', label: 'Warp Stop Bar Photo' }
        ]
      },
      {
        id: 'criticalComponents',
        name: 'Critical Components',
        fields: [
          { id: 'noOfClothRollSupplied', name: 'noOfClothRollSupplied', type: 'select', label: 'No. of Cloth Roll Supplied', options: [1, 2, 5] },
          { id: 'clothRollPhoto', name: 'clothRollPhoto', type: 'file', label: 'Cloth Roll Photo' },
          { id: 'noOfBackRestRoll', name: 'noOfBackRestRoll', type: 'select', label: 'No. of Back Rest Roll', options: [1, 2] },
          { id: 'noOfReedSupplied', name: 'noOfReedSupplied', type: 'number', label: 'No. of Reed Supplied' },
          { id: 'clothTakeUpType', name: 'clothTakeUpType', type: 'select', label: 'Cloth Take-Up Type', options: ['On Loom', 'Batching Motion'] },
          { id: 'takeUpMotion', name: 'takeUpMotion', type: 'select', label: 'Take up Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoTakeUpMotion', name: 'photoTakeUpMotion', type: 'file', label: 'Take up Motion Photo' },
          { id: 'letOffMotion', name: 'letOffMotion', type: 'select', label: 'Let-off Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoLetOffMotion', name: 'photoLetOffMotion', type: 'file', label: 'Let-off Motion Photo' },
          { id: 'colorSelectorType', name: 'colorSelectorType', type: 'select', label: 'Color Selector Type', options: ['W Type', 'Flaminggo', 'Quick Step'] },
          { id: 'rapierTravelOver', name: 'rapierTravelOver', type: 'select', label: 'Rapier Travel Over', options: ['Race Board', 'Guide Teeth', 'Free Flight'] }
        ]
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: [
          { id: 'inverter', name: 'inverter', type: 'select', label: 'Inverter', options: ['Available', 'Not Available'] },
          { id: 'photoInverter', name: 'photoInverter', type: 'file', label: 'Inverter Photo' },
          { id: 'ohtc', name: 'ohtc', type: 'select', label: 'OHTC', options: ['Available', 'Not Available'] },
          { id: 'ohtcMake', name: 'ohtcMake', type: 'text', label: 'OHTC Make' },
          { id: 'voltage', name: 'voltage', type: 'select', label: 'Voltage', options: [220, 380, 440] },
          { id: 'frequency', name: 'frequency', type: 'select', label: 'Frequency', options: [50, 60] }
        ]
      },
      {
        id: 'accessories',
        name: 'Accessories',
        fields: [
          { id: 'machineRunningRpm', name: 'machineRunningRpm', type: 'text', label: 'Machine Running RPM' },
          { id: 'autoPickFinder', name: 'autoPickFinder', type: 'select', label: 'Auto Pick Finder', options: ['Available', 'Not Available'] },
          { id: 'handSafetyDevice', name: 'handSafetyDevice', type: 'select', label: 'Hand Safety Device', options: ['Available', 'Not Available'] },
          { id: 'underMotionCapacity', name: 'underMotionCapacity', type: 'number', label: 'Under Motion Capacity' },
          { id: 'noOfHealdWire', name: 'noOfHealdWire', type: 'number', label: 'No. of Heald Wire Supplied/Set', options: [2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000] },
          { id: 'noOfDropper', name: 'noOfDropper', type: 'number', label: 'No. of Dropper Supplied', options: [2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000] }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Somet Rapier',
    sections: [
      {
        id: 'general',
        name: 'General',
        fields: [
          { id: 'millMachineNo', name: 'millMachineNo', type: 'text', label: 'Mill Machine No', required: true },
          { id: 'model', name: 'model', type: 'select', label: 'Model', options: ['SM92', 'SM93', 'Thema 11', 'Thema 11E', 'Alpha', 'Alpha PGA', 'Excel', 'Super Excel'], required: true },
          { id: 'completeModelNamePlate', name: 'completeModelNamePlate', type: 'text', label: 'Complete Model Written On Name Plate' },
          { id: 'yearOfMfg', name: 'yearOfMfg', type: 'number', label: 'Year of Manufacturing', validation: { min: 2000, max: new Date().getFullYear(), message: 'Only above 2000' } },
          { id: 'typeOfFabric', name: 'typeOfFabric', type: 'select', label: 'Type Of Fabric', options: ['Velvet', 'Carpet', 'Terry', 'Label', 'Tyre Cord', 'Denim', 'Grey', 'Yarn Dyed', 'Jacquard Fabric', 'Georget', 'Matras Sticking', 'Upholsterry', 'Kanvas', 'Net', 'Bed Sheet', 'Sarong/Sari'] },
          { id: 'workingWidth', name: 'workingWidth', type: 'select', label: 'Working Width (cm)', options: [0, 135, 150, 170, 175, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 340, 360, 380, 400, 420, 460] },
          { id: 'noOfColors', name: 'noOfColors', type: 'select', label: 'No Of Colors', options: [1, 2, 4, 6, 8, 10, 12] },
          { id: 'machineNameplatePhoto', name: 'machineNameplatePhoto', type: 'file', label: 'Machine Nameplate Photo', required: true }
        ]
      },
      {
        id: 'sheddingSystem',
        name: 'Shedding System',
        fields: [
          { id: 'sheddingMechanism', name: 'sheddingMechanism', type: 'select', label: 'Shedding Mechanism', options: ['Cam', 'Crank', 'Dobby'] },
          { id: 'sheddingMotionType', name: 'sheddingMotionType', type: 'select', label: 'Shedding Motion Type', options: ['Mechanical', 'Electronic'] },
          { id: 'sheddingMotionMake', name: 'sheddingMotionMake', type: 'select', label: 'Shedding Motion Make', options: ['Staubli', 'Fimtessile', 'Yamada'] },
          { id: 'sheddingMotionModel', name: 'sheddingMotionModel', type: 'text', label: 'Shedding Motion Model' },
          { id: 'photoSheddingMotionModel', name: 'photoSheddingMotionModel', type: 'file', label: 'Shedding Motion Model (Photo)' },
          { id: 'sheddingMotionCapacity', name: 'sheddingMotionCapacity', type: 'select', label: 'Shedding Motion Capacity (Lever)', options: [2, 4, 8, 10, 12, 14, 16, 18, 20, 24] },
          { id: 'sheddingMotionInstalled', name: 'sheddingMotionInstalled', type: 'select', label: 'Shedding Motion Installed Capacity (Lever)', options: [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24] },
          { id: 'noOfFramesSupplied', name: 'noOfFramesSupplied', type: 'number', label: 'No. of Frames Supplied', options: [2, 4, 6, 8, 10, 11, 12, 14, 16, 18, 20, 22, 24] },
          { id: 'photoLever', name: 'photoLever', type: 'file', label: 'Lever Photo' },
          { id: 'photoLeverCapacity', name: 'photoLeverCapacity', type: 'file', label: 'Lever Capacity Photo' }
        ]
      },
      {
        id: 'weftInsertion',
        name: 'Weft Insertion System',
        fields: [
          { id: 'noOfNozzles', name: 'noOfNozzles', type: 'select', label: 'No. of Nozzles', options: [1, 2, 4, 6, 8, 10, 12] },
          { id: 'nozzlePhoto', name: 'nozzlePhoto', type: 'file', label: 'Nozzle Photo' },
          { id: 'noOfPrewinder', name: 'noOfPrewinder', type: 'select', label: 'No. of Prewinder/Set', options: [1, 2, 3, 4, 5, 6, 7, 8, 12] },
          { id: 'weftStandPhoto', name: 'weftStandPhoto', type: 'file', label: 'Weft Stand Photo' },
          { id: 'weftBreakSystemPhoto', name: 'weftBreakSystemPhoto', type: 'file', label: 'Weft Break System Photo' },
          { id: 'weftFeederPhoto', name: 'weftFeederPhoto', type: 'file', label: 'Weft Feeder Photo' },
          { id: 'weftCutterType', name: 'weftCutterType', type: 'select', label: 'Weft Cutter Type', options: ['Mechanical', 'Electronic'] }
        ]
      },
      {
        id: 'beamSpecs',
        name: 'Beam Specifications',
        fields: [
          { id: 'beamType', name: 'beamType', type: 'select', label: 'Beam Type', options: ['Single', 'Twin'] },
          { id: 'topBeam', name: 'topBeam', type: 'select', label: 'Top Beam', options: ['Available', 'Not Available'] },
          { id: 'numberOfBeamPipes', name: 'numberOfBeamPipes', type: 'number', label: 'No. of Beam Pipes' },
          { id: 'noOfWarpBeamSupplied', name: 'noOfWarpBeamSupplied', type: 'select', label: 'No of Warp Beam Supplied', options: [1, 2, 3, 5] },
          { id: 'beamPipeDiameter', name: 'beamPipeDiameter', type: 'select', label: 'Beam Pipe Diameter (mm)', options: [600, 800, 940, 1000, 1100] },
          { id: 'beamPipePhoto', name: 'beamPipePhoto', type: 'file', label: 'Beam Pipe Photo' },
          { id: 'selvedgeType', name: 'selvedgeType', type: 'select', label: 'Selvedge Type', options: ['Bobbin Rack', 'Leno', 'Tuck-in', 'Elsy'] },
          { id: 'selvedgePhoto', name: 'selvedgePhoto', type: 'file', label: 'Selvedge Photo' },
          { id: 'selvedgeCutterType', name: 'selvedgeCutterType', type: 'select', label: 'Selvedge Cutter Type', options: ['Mechanical', 'Electronic'] },
          { id: 'selvedgeCutterPhoto', name: 'selvedgeCutterPhoto', type: 'file', label: 'Selvedge Cutter Photo' },
          { id: 'templeType', name: 'templeType', type: 'select', label: 'Temple Type', options: ['Normal', 'Full Width'] },
          { id: 'backRestType', name: 'backRestType', type: 'select', label: 'Back Rest Type' },
          { id: 'templePhoto', name: 'templePhoto', type: 'file', label: 'Photo of Temple' }
        ]
      },
      {
        id: 'warpControl',
        name: 'Warp Control',
        fields: [
          { id: 'easingMotion', name: 'easingMotion', type: 'select', label: 'Easing Motion', options: ['Available', 'Not Available'] },
          { id: 'photoEasingMotion', name: 'photoEasingMotion', type: 'file', label: 'Easing Motion Photo' },
          { id: 'noOfWarpStopBar', name: 'noOfWarpStopBar', type: 'number', label: 'No. of Warp Stop Bar', options: [4, 5, 6, 8] },
          { id: 'photoWarpStopBar', name: 'photoWarpStopBar', type: 'file', label: 'Warp Stop Bar Photo' }
        ]
      },
      {
        id: 'criticalComponents',
        name: 'Critical Components',
        fields: [
          { id: 'noOfClothRollSupplied', name: 'noOfClothRollSupplied', type: 'select', label: 'No. of Cloth Roll Supplied', options: [1, 2, 5] },
          { id: 'clothRollPhoto', name: 'clothRollPhoto', type: 'file', label: 'Cloth Roll Photo' },
          { id: 'noOfBackRestRoll', name: 'noOfBackRestRoll', type: 'select', label: 'No. of Back Rest Roll', options: [1, 2] },
          { id: 'noOfReedSupplied', name: 'noOfReedSupplied', type: 'number', label: 'No. of Reed Supplied' },
          { id: 'clothTakeUpType', name: 'clothTakeUpType', type: 'select', label: 'Cloth Take-Up Type', options: ['On Loom', 'Batching Motion'] },
          { id: 'takeUpMotion', name: 'takeUpMotion', type: 'select', label: 'Take up Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoTakeUpMotion', name: 'photoTakeUpMotion', type: 'file', label: 'Take up Motion Photo' },
          { id: 'letOffMotion', name: 'letOffMotion', type: 'select', label: 'Let-off Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoLetOffMotion', name: 'photoLetOffMotion', type: 'file', label: 'Let-off Motion Photo' },
          { id: 'colorSelectorType', name: 'colorSelectorType', type: 'select', label: 'Color Selector Type', options: ['W Type', 'Flaminggo', 'Quick Step'] },
          { id: 'rapierTravelOver', name: 'rapierTravelOver', type: 'select', label: 'Rapier Travel Over', options: ['Race Board', 'Guide Teeth', 'Free Flight'] }
        ]
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: [
          { id: 'inverter', name: 'inverter', type: 'select', label: 'Inverter', options: ['Available', 'Not Available'] },
          { id: 'photoInverter', name: 'photoInverter', type: 'file', label: 'Inverter Photo' },
          { id: 'ohtc', name: 'ohtc', type: 'select', label: 'OHTC', options: ['Available', 'Not Available'] },
          { id: 'ohtcMake', name: 'ohtcMake', type: 'text', label: 'OHTC Make' },
          { id: 'voltage', name: 'voltage', type: 'select', label: 'Voltage', options: [220, 380, 440] },
          { id: 'frequency', name: 'frequency', type: 'select', label: 'Frequency', options: [50, 60] }
        ]
      },
      {
        id: 'accessories',
        name: 'Accessories',
        fields: [
          { id: 'machineRunningRpm', name: 'machineRunningRpm', type: 'text', label: 'Machine Running RPM' },
          { id: 'autoPickFinder', name: 'autoPickFinder', type: 'select', label: 'Auto Pick Finder', options: ['Available', 'Not Available'] },
          { id: 'handSafetyDevice', name: 'handSafetyDevice', type: 'select', label: 'Hand Safety Device', options: ['Available', 'Not Available'] },
          { id: 'underMotionCapacity', name: 'underMotionCapacity', type: 'number', label: 'Under Motion Capacity' },
          { id: 'noOfHealdWire', name: 'noOfHealdWire', type: 'number', label: 'No. of Heald Wire Supplied/Set', options: [2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000] },
          { id: 'noOfDropper', name: 'noOfDropper', type: 'number', label: 'No. of Dropper Supplied', options: [2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000] }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Vamatex Rapier',
    sections: [
      {
        id: 'general',
        name: 'General',
        fields: [
          { id: 'millMachineNo', name: 'millMachineNo', type: 'text', label: 'Mill Machine No', required: true },
          { id: 'model', name: 'model', type: 'select', label: 'Model', options: ['Leonardo', 'SP1151ES', 'Leonardo Silver HS', 'Leonardo Silver HD', 'P1001 EK', 'P401', 'P1001E', 'C401S', 'Dyna Terry', 'Leonardo Silver', 'P401S', 'Leonardo HD', 'P1001', 'Leonardo HS', 'P1001 ES', 'Leonardo Dyna Terry', 'Silver DT', 'K88'], required: true },
          { id: 'completeModelNamePlate', name: 'completeModelNamePlate', type: 'text', label: 'Complete Model Written On Name Plate' },
          { id: 'yearOfMfg', name: 'yearOfMfg', type: 'number', label: 'Year of Manufacturing', validation: { min: 2000, max: new Date().getFullYear(), message: 'Only above 2000' } },
          { id: 'typeOfFabric', name: 'typeOfFabric', type: 'select', label: 'Type Of Fabric', options: ['Velvet', 'Carpet', 'Terry', 'Label', 'Tyre Cord', 'Denim', 'Grey', 'Yarn Dyed', 'Jacquard Fabric', 'Georget', 'Matras Sticking', 'Upholsterry', 'Kanvas', 'Net', 'Bed Sheet', 'Sarong/Sari'] },
          { id: 'workingWidth', name: 'workingWidth', type: 'select', label: 'Working Width (cm)', options: [170, 380, 320, 190, 280, 210, 360, 180, 340, 300, 240, 150, 230, 400, 260, 220, 200, 250, 135, 290, 270, 0, 460, 420, 310, 175] },
          { id: 'noOfColors', name: 'noOfColors', type: 'select', label: 'No Of Colors', options: [6, 8, 2, 4, 1, 10, 12] },
          { id: 'machineNameplatePhoto', name: 'machineNameplatePhoto', type: 'file', label: 'Machine Nameplate Photo', required: true }
        ]
      },
      {
        id: 'sheddingSystem',
        name: 'Shedding System',
        fields: [
          { id: 'sheddingMechanism', name: 'sheddingMechanism', type: 'select', label: 'Shedding Mechanism', options: ['Cam', 'Crank', 'Dobby'] },
          { id: 'sheddingMotionType', name: 'sheddingMotionType', type: 'select', label: 'Shedding Motion Type', options: ['Mechanical', 'Electronic'] },
          { id: 'sheddingMotionMake', name: 'sheddingMotionMake', type: 'select', label: 'Shedding Motion Make', options: ['Staubli', 'Fimtessile', 'Yamada'] },
          { id: 'sheddingMotionModel', name: 'sheddingMotionModel', type: 'text', label: 'Shedding Motion Model' },
          { id: 'photoSheddingMotionModel', name: 'photoSheddingMotionModel', type: 'file', label: 'Shedding Motion Model (Photo)' },
          { id: 'sheddingMotionCapacity', name: 'sheddingMotionCapacity', type: 'select', label: 'Shedding Motion Capacity (Lever)', options: [8, 10, 12, 20, 24, 16, 18, 14, 4, 2] },
          { id: 'sheddingMotionInstalled', name: 'sheddingMotionInstalled', type: 'select', label: 'Shedding Motion Installed Capacity (Lever)', options: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 9, 2] },
          { id: 'noOfFramesSupplied', name: 'noOfFramesSupplied', type: 'number', label: 'No. of Frames Supplied', options: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 11, 2] },
          { id: 'photoLever', name: 'photoLever', type: 'file', label: 'Lever Photo' },
          { id: 'photoLeverCapacity', name: 'photoLeverCapacity', type: 'file', label: 'Lever Capacity Photo' }
        ]
      },
      {
        id: 'weftInsertion',
        name: 'Weft Insertion System',
        fields: [
          { id: 'noOfNozzles', name: 'noOfNozzles', type: 'select', label: 'No. of Nozzles', options: [1, 2, 4, 6, 8, 10, 12] },
          { id: 'nozzlePhoto', name: 'nozzlePhoto', type: 'file', label: 'Nozzle Photo' },
          { id: 'noOfPrewinder', name: 'noOfPrewinder', type: 'select', label: 'No. of Prewinder/Set', options: [2, 7, 6, 8, 4, 3, 5, 12, 1] },
          { id: 'weftStandPhoto', name: 'weftStandPhoto', type: 'file', label: 'Weft Stand Photo' },
          { id: 'weftBreakSystemPhoto', name: 'weftBreakSystemPhoto', type: 'file', label: 'Weft Break System Photo' },
          { id: 'weftFeederPhoto', name: 'weftFeederPhoto', type: 'file', label: 'Weft Feeder Photo' },
          { id: 'weftCutterType', name: 'weftCutterType', type: 'select', label: 'Weft Cutter Type', options: ['Mechanical', 'Electronic'] }
        ]
      },
      {
        id: 'beamSpecs',
        name: 'Beam Specifications',
        fields: [
          { id: 'beamType', name: 'beamType', type: 'select', label: 'Beam Type', options: ['Single', 'Twin'] },
          { id: 'topBeam', name: 'topBeam', type: 'select', label: 'Top Beam', options: ['Available', 'Not Available'] },
          { id: 'numberOfBeamPipes', name: 'numberOfBeamPipes', type: 'number', label: 'No. of Beam Pipes' },
          { id: 'noOfWarpBeamSupplied', name: 'noOfWarpBeamSupplied', type: 'select', label: 'No of Warp Beam Supplied', options: [1, 5, 2, 3] },
          { id: 'beamPipeDiameter', name: 'beamPipeDiameter', type: 'select', label: 'Beam Pipe Diameter (mm)', options: [800, 940, 1000, 600, 1100] },
          { id: 'beamPipePhoto', name: 'beamPipePhoto', type: 'file', label: 'Beam Pipe Photo' },
          { id: 'selvedgeType', name: 'selvedgeType', type: 'select', label: 'Selvedge Type', options: ['Bobbin Rack', 'Leno', 'Tuck-in', 'Elsy'] },
          { id: 'selvedgePhoto', name: 'selvedgePhoto', type: 'file', label: 'Selvedge Photo' },
          { id: 'selvedgeCutterType', name: 'selvedgeCutterType', type: 'select', label: 'Selvedge Cutter Type', options: ['Mechanical', 'Electronic'] },
          { id: 'selvedgeCutterPhoto', name: 'selvedgeCutterPhoto', type: 'file', label: 'Selvedge Cutter Photo' },
          { id: 'templeType', name: 'templeType', type: 'select', label: 'Temple Type', options: ['Normal', 'Full Width'] },
          { id: 'backRestType', name: 'backRestType', type: 'select', label: 'Back Rest Type' },
          { id: 'templePhoto', name: 'templePhoto', type: 'file', label: 'Photo of Temple' }
        ]
      },
      {
        id: 'warpControl',
        name: 'Warp Control',
        fields: [
          { id: 'easingMotion', name: 'easingMotion', type: 'select', label: 'Easing Motion', options: ['Available', 'Not Available'] },
          { id: 'photoEasingMotion', name: 'photoEasingMotion', type: 'file', label: 'Easing Motion Photo' },
          { id: 'noOfWarpStopBar', name: 'noOfWarpStopBar', type: 'number', label: 'No. of Warp Stop Bar', options: [4, 6, 8, 5] },
          { id: 'photoWarpStopBar', name: 'photoWarpStopBar', type: 'file', label: 'Warp Stop Bar Photo' }
        ]
      },
      {
        id: 'criticalComponents',
        name: 'Critical Components',
        fields: [
          { id: 'noOfClothRollSupplied', name: 'noOfClothRollSupplied', type: 'select', label: 'No. of Cloth Roll Supplied', options: [1, 5, 2] },
          { id: 'clothRollPhoto', name: 'clothRollPhoto', type: 'file', label: 'Cloth Roll Photo' },
          { id: 'noOfBackRestRoll', name: 'noOfBackRestRoll', type: 'select', label: 'No. of Back Rest Roll', options: [1, 2] },
          { id: 'noOfReedSupplied', name: 'noOfReedSupplied', type: 'number', label: 'No. of Reed Supplied' },
          { id: 'clothTakeUpType', name: 'clothTakeUpType', type: 'select', label: 'Cloth Take-Up Type', options: ['On Loom', 'Batching Motion'] },
          { id: 'takeUpMotion', name: 'takeUpMotion', type: 'select', label: 'Take up Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoTakeUpMotion', name: 'photoTakeUpMotion', type: 'file', label: 'Take up Motion Photo' },
          { id: 'letOffMotion', name: 'letOffMotion', type: 'select', label: 'Let-off Motion', options: ['Mechanical', 'Electronic'] },
          { id: 'photoLetOffMotion', name: 'photoLetOffMotion', type: 'file', label: 'Let-off Motion Photo' },
          { id: 'colorSelectorType', name: 'colorSelectorType', type: 'select', label: 'Color Selector Type', options: ['W Type', 'Flaminggo', 'Quick Step'] },
          { id: 'rapierTravelOver', name: 'rapierTravelOver', type: 'select', label: 'Rapier Travel Over', options: ['Race Board', 'Guide Teeth', 'Free Flight'] }
        ]
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: [
          { id: 'inverter', name: 'inverter', type: 'select', label: 'Inverter', options: ['Available', 'Not Available'] },
          { id: 'photoInverter', name: 'photoInverter', type: 'file', label: 'Inverter Photo' },
          { id: 'ohtc', name: 'ohtc', type: 'select', label: 'OHTC', options: ['Available', 'Not Available'] },
          { id: 'ohtcMake', name: 'ohtcMake', type: 'text', label: 'OHTC Make' },
          { id: 'voltage', name: 'voltage', type: 'select', label: 'Voltage', options: [220, 380, 440] },
          { id: 'frequency', name: 'frequency', type: 'select', label: 'Frequency', options: [50, 60] }
        ]
      },
      {
        id: 'accessories',
        name: 'Accessories',
        fields: [
          { id: 'machineRunningRpm', name: 'machineRunningRpm', type: 'text', label: 'Machine Running RPM' },
          { id: 'autoPickFinder', name: 'autoPickFinder', type: 'select', label: 'Auto Pick Finder', options: ['Available', 'Not Available'] },
          { id: 'handSafetyDevice', name: 'handSafetyDevice', type: 'select', label: 'Hand Safety Device', options: ['Available', 'Not Available'] },
          { id: 'underMotionCapacity', name: 'underMotionCapacity', type: 'number', label: 'Under Motion Capacity' },
          { id: 'noOfHealdWire', name: 'noOfHealdWire', type: 'number', label: 'No. of Heald Wire Supplied/Set', options: [5000, 6000, 7000, 8000, 9000, 10000, 4000, 2000, 3000] },
          { id: 'noOfDropper', name: 'noOfDropper', type: 'number', label: 'No. of Dropper Supplied', options: [5000, 6000, 7000, 8000, 9000, 10000, 4000, 2000, 3000] }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'SMIT Rapier',
    sections: [
      {
        id: 'general',
        name: 'General',
        fields: [
          { id: 'millMachineNo', name: 'millMachineNo', type: 'text', label: 'Mill Machine No', required: true },
          { id: 'model', name: 'model', type: 'select', label: 'Model', options: ['G6300','GS 900','GS 920','GS 920F','GS 980'], required: true },
          { id: 'yearOfMfg', name: 'yearOfMfg', type: 'number', label: 'Year of Manufacturing', validation: { min: 2000, max: new Date().getFullYear(), message: 'Only above 2000' } },
          { id: 'typeOfFabric', name: 'typeOfFabric', type: 'select', label: 'Type Of Fabric', options: ['Velvet','Carpet','Terry','Label','Tyre Cord','Denim','Grey','Yarn Dyed','Jacquard Fabric','Georget','Matras Sticking','Upholsterry','Kanvas','Net','Bed Sheet','Sarong/Sari'] },
          { id: 'workingWidth', name: 'workingWidth', type: 'select', label: 'Working Width (cm)', options: [0,135,150,170,175,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,340,360,380,400,420,460] },
          { id: 'machineNameplatePhoto', name: 'machineNameplatePhoto', type: 'file', label: 'Machine Nameplate Photo', required: true }
        ]
      },
      {
        id: 'sheddingSystem',
        name: 'Shedding System',
        fields: [
          { id: 'sheddingMechanism', name: 'sheddingMechanism', type: 'select', label: 'Shedding Mechanism', options: ['Cam','Crank','Dobby'] },
          { id: 'sheddingMotionMake', name: 'sheddingMotionMake', type: 'select', label: 'Shedding Motion Make', options: ['Staubli','Fimtessile','Yamada'] },
          { id: 'sheddingMotionModel', name: 'sheddingMotionModel', type: 'text', label: 'Shedding Motion Model' },
          { id: 'sheddingMotionType', name: 'sheddingMotionType', type: 'select', label: 'Shedding Motion Type', options: ['Mechanical','Electronic'] },
          { id: 'sheddingMotionCapacity', name: 'sheddingMotionCapacity', type: 'select', label: 'Shedding Motion Capacity', options: [2,4,6,8,10,12,14,16,18,20,22,24] },
          { id: 'sheddingMotionInstalled', name: 'sheddingMotionInstalled', type: 'select', label: 'Shedding Motion Installed Capacity', options: [2,4,6,8,9,10,12,14,16,18,20,22,24] },
          { id: 'noOfFramesSupplied', name: 'noOfFramesSupplied', type: 'select', label: 'No of Frames Supplied', options: [2,4,6,8,10,11,12,14,16,18,20,22,24] }
        ]
      },
      {
        id: 'weftInsertion',
        name: 'Weft Insertion System',
        fields: [
          { id: 'noOfPrewinder', name: 'noOfPrewinder', type: 'select', label: 'No. of Prewinder/Set', options: [2,7,6,8,4,3,5,12,1] },
          { id: 'noOfNozzles', name: 'noOfNozzles', type: 'select', label: 'No. of Nozzles', options: [] },
          { id: 'nozzlePhoto', name: 'nozzlePhoto', type: 'file', label: 'Nozzle Photo' },
          { id: 'weftStandPhoto', name: 'weftStandPhoto', type: 'file', label: 'Weft Stand Photo' },
          { id: 'weftBreakSystemPhoto', name: 'weftBreakSystemPhoto', type: 'file', label: 'Weft Break System Photo' },
          { id: 'weftFeederPhoto', name: 'weftFeederPhoto', type: 'file', label: 'Weft Feeder Photo' }
        ]
      },
      {
        id: 'beamSpecs',
        name: 'Beam Specifications',
        fields: [
          { id: 'beamType', name: 'beamType', type: 'select', label: 'Beam Type', options: ['Single','Twin'] },
          { id: 'topBeam', name: 'topBeam', type: 'select', label: 'Top Beam', options: ['Available','Not Available'] },
          { id: 'noOfWarpBeamSupplied', name: 'noOfWarpBeamSupplied', type: 'select', label: 'No of Warp Beam Supplied', options: [1,2,3,5] },
          { id: 'warpBeamDia', name: 'warpBeamDia', type: 'select', label: 'Warp Beam Dia (mm)', options: [600,800,940,1000,1100] },
          { id: 'clothTakeUpType', name: 'clothTakeUpType', type: 'select', label: 'Cloth Take-Up Type', options: ['On Loom','Batching Motion'] },
          { id: 'noOfClothRollSupplied', name: 'noOfClothRollSupplied', type: 'select', label: 'No of Cloth Roller Supplied', options: [1,2,5] },
          { id: 'selvedgeType', name: 'selvedgeType', type: 'select', label: 'Selvedge Type', options: ['Bobbin Rack','Leno','Tuck-in','Elsy'] },
          { id: 'templeType', name: 'templeType', type: 'select', label: 'Temple Type', options: ['Normal','Full Width'] }
        ]
      },
      {
        id: 'warpControl',
        name: 'Warp Control',
        fields: [
          { id: 'noOfWarpStopBar', name: 'noOfWarpStopBar', type: 'select', label: 'No of Warp Stop Bar', options: [4,5,6,8] }
        ]
      },
      {
        id: 'criticalComponents',
        name: 'Critical Components',
        fields: [
          { id: 'noOfBackRestRoll', name: 'noOfBackRestRoll', type: 'select', label: 'No of Back Rest Roll', options: [1,2] },
          { id: 'noOfHealdWire', name: 'noOfHealdWire', type: 'select', label: 'No of Heald Wire Supplied/Set', options: [5000,6000,7000,8000,9000,10000,4000,2000,3000] },
          { id: 'noOfDropper', name: 'noOfDropper', type: 'select', label: 'No of Dropper Supplied', options: [5000,6000,7000,8000,9000,10000,4000,2000,3000] },
          { id: 'takeUpMotion', name: 'takeUpMotion', type: 'select', label: 'Take-Up Motion', options: ['Mechanical','Electronic'] },
          { id: 'letOffMotion', name: 'letOffMotion', type: 'select', label: 'Let-Off Motion', options: ['Mechanical','Electronic'] }
        ]
      },
      {
        id: 'electrical',
        name: 'Electrical',
        fields: [
          { id: 'inverter', name: 'inverter', type: 'select', label: 'Inverter', options: ['Available','Not Available'] },
          { id: 'voltage', name: 'voltage', type: 'select', label: 'Voltage', options: [220,380,440] },
          { id: 'frequency', name: 'frequency', type: 'select', label: 'Frequency', options: [50,60] }
        ]
      },
      {
        id: 'accessories',
        name: 'Accessories',
        fields: [
        { id: 'machineRunningRpm', name: 'machineRunningRpm', type: 'text', label: 'Machine Running RPM' },
        { id: 'autoPickFinder', name: 'autoPickFinder', type: 'select', label: 'Auto Pick Finder', options: ['Available','Not Available'] },
        { id: 'underMotionCapacity', name: 'underMotionCapacity', type: 'select', label: 'OHTC', options: ['Available','Not Available'] },
        { id: 'accessoriesPhoto', name: 'accessoriesPhoto', type: 'file', label: 'Accessories Photo' } 
      ]
      }
    ]
  },
  {
  id: '7',
  name: 'Itema Rapier',
  sections: [
    {
      id: 'general',
      name: 'General',
      fields: [
        { id: 'millMachineNo', name: 'millMachineNo', type: 'text', label: 'Mill Machine No', required: true }, 
        { id: 'model', name: 'model', type: 'select', label: 'Model', options: ['R9500', 'R9000'], required: true },
        { id: 'yearOfMfg', name: 'yearOfMfg', type: 'number', label: 'Year of Manufacturing', validation: { min: 2000, max: new Date().getFullYear(), message: 'Only above 2000' } },
        { id: 'typeOfFabric', name: 'typeOfFabric', type: 'select', label: 'Type Of Fabric', options: ['Velvet','Carpet','Terry','Label','Tyre Cord','Denim','Grey','Yarn Dyed','Jacquard Fabric','Georget','Matras Sticking','Upholsterry','Kanvas','Net','Bed Sheet','Sarong/Sari'] },
        { id: 'workingWidth', name: 'workingWidth', type: 'select', label: 'Working Width (cm)', options: [170,380,320,190,280,210,360,180,340,300,240,150,230,400,260,220,200,250,135,290,270,0,460,420,310,175] },
        { id: 'machineNameplatePhoto', name: 'machineNameplatePhoto', type: 'file', label: 'Machine Nameplate Photo', required: true }
      ]
    },
    {
      id: 'sheddingSystem',
      name: 'Shedding System',
      fields: [
        { id: 'sheddingMechanism', name: 'sheddingMechanism', type: 'select', label: 'Shedding Mechanism', options: ['Cam','Crank','Dobby'] },
        { id: 'sheddingMotionType', name: 'sheddingMotionType', type: 'select', label: 'Shedding Motion Type', options: ['Mechanical','Electronic'] },
        { id: 'sheddingMotionMake', name: 'sheddingMotionMake', type: 'select', label: 'Shedding Motion Make', options: ['Staubli','Fimtessile','Yamada'] },
        { id: 'sheddingMotionModel', name: 'sheddingMotionModel', type: 'text', label: 'Shedding Motion Model' }, 
        { id: 'photoSheddingMotionModel', name: 'photoSheddingMotionModel', type: 'file', label: 'Shedding Motion Model (Photo)' },
        { id: 'sheddingMotionCapacity', name: 'sheddingMotionCapacity', type: 'select', label: 'Shedding Motion Capacity (Lever)', options: [8,10,12,20,24,16,18,14,4,2] },
        { id: 'sheddingMotionInstalled', name: 'sheddingMotionInstalled', type: 'select', label: 'Shedding Motion Installed Capacity (Lever)', options: [4,6,8,10,12,14,16,18,20,22,24,9,2] },
        { id: 'noOfFramesSupplied', name: 'noOfFramesSupplied', type: 'select', label: 'No. of Frames Supplied', options: [4,6,8,10,12,14,16,18,20,22,24,11,2] },
        { id: 'photoLever', name: 'photoLever', type: 'file', label: 'Lever Photo', validation: { min: 1, message: 'At least one lever photo is required' }},
        { id: 'photoLeverCapacity', name: 'photoLeverCapacity', type: 'file', label: 'Lever Capacity Photo', validation: { min: 1, message: 'At least one lever capacity photo is required' }}
      ]
    },
    {
      id: 'weftInsertion',
      name: 'Weft Insertion System',
      fields: [
        { id: 'noOfPrewinder', name: 'noOfPrewinder', type: 'select', label: 'No. of Prewinder/Set', options: [2,7,6,8,4,3,5,12,1] },
        { id: 'noOfNozzles', name: 'noOfNozzles', type: 'text', label: 'No. of Nozzles', options: [] },
        { id: 'nozzlePhoto', name: 'nozzlePhoto', type: 'file', label: 'Nozzle Photo' },
        { id: 'weftStandPhoto', name: 'weftStandPhoto', type: 'file', label: 'Weft Stand Photo' },
        { id: 'weftBreakSystemPhoto', name: 'weftBreakSystemPhoto', type: 'file', label: 'Weft Break System Photo' },
        { id: 'weftFeederPhoto', name: 'weftFeederPhoto', type: 'file', label: 'Weft Feeder Photo' }
      ]
    },
    {
      id: 'beamSpecs',
      name: 'Beam Specifications',
      fields: [
        { id: 'beamType', name: 'beamType', type: 'select', label: 'Beam Type', options: ['Single','Twin'] },
        { id: 'topBeam', name: 'topBeam', type: 'select', label: 'Top Beam', options: ['Not Available','Available'] },
        { id: 'numberOfBeamPipes', name: 'numberOfBeamPipes', type: 'select', label: 'No. of Beam Pipes', options: [1,1,5,2,2,5,3] },
        { id: 'beamPipeDiameter', name: 'beamPipeDiameter', type: 'select', label: 'Beam Pipe Diameter (mm)', options: [800,940,1000,600,1100] },
        { id: 'beamPipePhoto', name: 'beamPipePhoto', type: 'file', label: 'Beam Pipe Photo' },
        { id: 'selvedgeType', name: 'selvedgeType', type: 'select', label: 'Selvedge Type', options: ['Bobbin Rack','Leno','Tuck-in','Elsy'] },
        { id: 'selvedgePhoto', name: 'selvedgePhoto', type: 'file', label: 'Selvedge Photo' },
        { id: 'templeType', name: 'templeType', type: 'select', label: 'Temple Type', options: ['Normal','Full Width'] },
        { id: 'templePhoto', name: 'templePhoto', type: 'file', label: 'Photo of Temple' }
      ]
    },
    {
      id: 'warpControl',
      name: 'Warp Control',
      fields: [
        { id: 'easingMotion', name: 'easingMotion', type: 'select', label: 'Easing Motion', options: ['Available','Not Available'] }, 
        { id: 'photoEasingMotion', name: 'photoEasingMotion', type: 'file', label: 'Easing Motion Photo' },
        { id: 'noOfWarpStopBar', name: 'noOfWarpStopBar', type: 'select', label: 'No. of Warp Stop Bar', options: [4,6,8,5] },
        { id: 'photoWarpStopBar', name: 'photoWarpStopBar', type: 'file', label: 'Warp Stop Bar Photo' }
      ]
    },
    {
      id: 'criticalComponents',
      name: 'Critical Components',
      fields: [
        { id: 'noOfClothRollSupplied', name: 'noOfClothRollSupplied', type: 'select', label: 'No. of Cloth Roll Supplied', options: [1,1,5,2] },
        { id: 'clothRollPhoto', name: 'clothRollPhoto', type: 'file', label: 'Cloth Roll Photo' },
        { id: 'noOfBackRestRoll', name: 'noOfBackRestRoll', type: 'select', label: 'No. of Back Rest Roll', options: [1,2] },
        { id: 'noOfReedSupplied', name: 'noOfReedSupplied', type: 'number', label: 'No. of Reed Supplied' },
        { id: 'clothTakeUpType', name: 'clothTakeUpType', type: 'select', label: 'Cloth Take-Up Type', options: ['On Loom','Batching Motion'] },
        { id: 'takeUpMotion', name: 'takeUpMotion', type: 'select', label: 'Take up Motion', options: ['Mechanical','Electronic'] },
        { id: 'photoTakeUpMotion', name: 'photoTakeUpMotion', type: 'file', label: 'Take up Motion Photo' },
        { id: 'letOffMotion', name: 'letOffMotion', type: 'select', label: 'Let-off Motion', options: ['Mechanical','Electronic'] },
        { id: 'photoLetOffMotion', name: 'photoLetOffMotion', type: 'file', label: 'Let-off Motion Photo' }
      ]
    },
    {
      id: 'electrical',
      name: 'Electrical',
      fields: [
        { id: 'inverter', name: 'inverter', type: 'select', label: 'Inverter', options: ['Available','Not Available'] },
        { id: 'photoInverter', name: 'photoInverter', type: 'file', label: 'Inverter Photo' },
        { id: 'voltage', name: 'voltage', type: 'select', label: 'Voltage', options: [220,380,440] },
        { id: 'frequency', name: 'frequency', type: 'select', label: 'Frequency', options: [50,60] }
      ]
    },
    {
      id: 'accessories',
      name: 'Accessories',
      fields: [
        { id: 'machineRunningRpm', name: 'machineRunningRpm', type: 'text', label: 'Machine Running RPM' }, // no data in sheet
        { id: 'autoPickFinder', name: 'autoPickFinder', type: 'select', label: 'Auto Pick Finder', options: ['Available','Not Available'] },
        { id: 'underMotionCapacity', name: 'underMotionCapacity', type: 'number', label: 'Under Motion Capacity' }, // no data in sheet
        { id: 'noOfHealdWire', name: 'noOfHealdWire', type: 'select', label: 'No. of Heald Wire Supplied/Set', options: [5000,6000,7000,8000,9000,10000,4000,2000,3000] },
        { id: 'noOfDropper', name: 'noOfDropper', type: 'select', label: 'No. of Dropper Supplied', options: [5000,6000,7000,8000,9000,10000,4000,2000,3000] }
      ]
    }
  ]
}


]; 