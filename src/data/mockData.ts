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
        "id": "general",
        "name": "General",
        "fields": [
          { "id": "millMachineNo", "name": "millMachineNo", "type": "text", "label": "Mill Machine No", "required": true },
          { "id": "model", "name": "model", "type": "select", "label": "Model", "options": ["JAT 610", "JAT 710", "JAT 810", "JAT 910"], "required": true },
          { "id": "yearOfMfg", "name": "yearOfMfg", "type": "number", "label": "Year of Mfg", "validation": { "min": 2000, "max": new Date().getFullYear(), "message": "Only above 2000" } },
          { "id": "typeOfFabric", "name": "typeOfFabric", "type": "select", "label": "Type Of Fabric", "options": ["Velvet", "Carpet", "Terry", "Label", "Tyre Cord", "Denim", "Grey", "Yarn Dyed", "Jacquard Fabric", "Georget", "Matras Sticking", "Upholsterry", "Kanvas", "Net", "Bed Sheet", "Sarong/Sari"] },
          { "id": "nameplatePhoto", "name": "nameplatePhoto", "type": "file", "label": "Nameplate Photo"}
        ]
      },
      {
        "id": "structuralSpecs",
        "name": "Structural Specifications",
        "fields": [
          { "id": "workingWidth", "name": "workingWidth", "type": "select", "label": "Working Width (cm)", "options": ["150", "170", "190", "210", "230", "250", "280", "340", "360"] },
          { "id": "warpBeamDia", "name": "warpBeamDia", "type": "text", "label": "Warp Beam Dia (mm)", "validation": { "min": 800, "max": 1200, "message": "Only between 800 and 1200" } },
          { "id": "doubleBeam", "name": "doubleBeam", "type": "select", "label": "Double Beam", "options": ["Yes", "No"] },
          { "id": "photoBeamPipe", "name": "photoBeamPipe", "type": "file", "label": "Beam Pipe" }
        ]
      },
      {
        "id": "weftInsertion",
        "name": "Weft Insertion System",
        "fields": [
          { "id": "noOfNozzles", "name": "noOfNozzles", "type": "number", "label": "No of Nozzles", "validation": { "min": 1, "max": 8, "message": "Only between 1 and 8" } },
          { "id": "photoNozzle", "name": "photoNozzle", "type": "file", "label": "Nozzle Photo" },
          { "id": "noOfWeftFeeder", "name": "noOfWeftFeeder", "type": "number", "label": "No. of Weft Feeder", "validation": { "min": 1, "max": 8, "message": "Only between 1 and 8" } },
          { "id": "photoWeftFeeder", "name": "photoWeftFeeder", "type": "file", "label": "Weft Feeder Photo" },
          { "id": "photoWeftStand", "name": "photoWeftStand", "type": "file", "label": "Weft Stand Photo" },
          { "id": "photoWeftBreakSystem", "name": "photoWeftBreakSystem", "type": "file", "label": "Weft Break System Photo" },
        ]
      },
      {
        "id": "sheddingSystem",
        "name": "Shedding System",
        "fields": [
          { "id": "sheddingMechanism", "name": "sheddingMechanism", "type": "select", "label": "Shedding Mechanism", "options": ["Crank", "Cam", "Dobby", "E shedding"] },
          { "id": "photoSheddingMotionModel", "name": "photoSheddingMotionModel", "type": "file", "label": "Shedding Motion Model" },
          { "id": "sheddingMotionMake", "name": "sheddingMotionMake", "type": "select", "label": "Shedding Motion Make", "options": ["Staubli", "Yamada", "Toyota", "Filmtex"] },
          { "id": "sheddingMotionCapacity", "name": "sheddingMotionCapacity", "type": "select", "label": "Shedding Motion Capacity (Lever)", "options": ["24", "10", "20", "12", "16", "8", "6", "4", "7", "14", "9"] },
          { "id": "sheddingMotionInstalled", "name": "sheddingMotionInstalled", "type": "select", "label": "Shedding Motion Installed Capacity (Lever)", "options": ["24", "10", "20", "12", "16", "8", "6", "4", "7", "14", "9"] },
          { "id": "noOfFramesSupplied", "name": "noOfFramesSupplied", "type": "number", "label": "No of Frames Supplied" },
          { "id": "noOfHealdWire", "name": "noOfHealdWire", "type": "number", "label": "No of Heald Wire Supplied/Set" },
          { "id": "noOfDropper", "name": "noOfDropper", "type": "number", "label": "No of Dropper Supplied" }
        ]
      },
      {
        "id": "warpControl",
        "name": "Warp Control",
        "fields": [
          { "id": "easingMotion", "name": "easingMotion", "type": "select", "label": "Easing Motion", "options": ["Available", "Not Available"] },
          { "id": "photoEasingMotion", "name": "photoEasingMotion", "type": "file", "label": "Easing Motion Photo" },
          { "id": "noOfWarpStopBar", "name": "noOfWarpStopBar", "type": "number", "label": "No of Warp Stop Bar" },
          { "id": "photoWarpStopMotion", "name": "photoWarpStopMotion", "type": "file", "label": "Warp Stop Motion Photo" },
          { "id": "noOfWarpBeamSupplied", "name": "noOfWarpBeamSupplied", "type": "number", "label": "No of Warp Beam Supplied" },
          { "id": "warpStopMotionPhoto", "name": "warpStopMotionPhoto", "type": "file", "label": "Warp Stop Motion Photo"}
        ]
      },
      {
        "id": "criticalComponents",
        "name": "Critical Components",
        "fields": [
          { "id": "noOfClothRollSupplied", "name": "noOfClothRollSupplied", "type": "select", "label": "No of Cloth Roll Supplied", "options": ["1", "1.5", "2"] },
          { "id": "clothRollPhoto", "name": "clothRollPhoto", "type": "file", "label": "Cloth Roll Photo"},
          { "id": "selvedgeType", "name": "selvedgeType", "type": "select", "label": "Selvedge Type", "options": ["Rotary Leno", "Leno", "Tuck-in", "E Leno", "Eurotech"] },
          { "id": "photoSelvedgeType", "name": "photoSelvedgeType", "type": "file", "label": "Selvedge Type Photo" },
          { "id": "noOfBackRestRoll", "name": "noOfBackRestRoll", "type": "select", "label": "No of Back Rest Roll", "options": ["1", "2"] },
          { "id": "noOfReedSupplied", "name": "noOfReedSupplied", "type": "number", "label": "No of Reed Supplied" },
          { "id": "clothTakeUpType", "name": "clothTakeUpType", "type": "select", "label": "Cloth Take-Up Type", "options": ["Off loom (batching)", "on loom (cloth roll)"] },
          { "id": "takeUpMotion", "name": "takeUpMotion", "type": "select", "label": "Take up Motion", "options": ["Mechanical", "Electronic"] },
          { "id": "photoTakeUpMotion", "name": "photoTakeUpMotion", "type": "file", "label": "Take up Motion Photo" },
          { "id": "letOffMotion", "name": "letOffMotion", "type": "select", "label": "Let-off Motion", "options": ["Mechanical", "Electronic"] },
          { "id": "photoLetOffMotion", "name": "photoLetOffMotion", "type": "file", "label": "Let-off Motion Photo" },
          { "id": "templeType", "name": "templeType", "type": "select", "label": "Temple Type", "options": ["Normal", "Full width"] },
          { "id": "photoTemple", "name": "photoTemple", "type": "file", "label": "Temple Photo" },
        ]
      },
      {
        "id": "electrical",
        "name": "Electrical",
        "fields": [
          { "id": "inverter", "name": "inverter", "type": "select", "label": "Inverter", "options": ["Group", "Individual", "No inverter supplied"] },
          { "id": "photoInverter", "name": "photoInverter", "type": "file", "label": "Inverter Photo" },
          { "id": "electricPanelBox", "name": "electricPanelBox", "type": "text", "label": "Electric Panel Box" },
          { "id": "voltage", "name": "voltage", "type": "select", "label": "Voltage", "options": ["200", "220", "380", "440", "560"] },
          { "id": "frequency", "name": "frequency", "type": "select", "label": "Frequency", "options": ["50", "60"] }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "fields": [
          { "id": "machineRunningRpm", "name": "machineRunningRpm", "type": "text", "label": "Machine Running RPM" },
          { "id": "beamType", "name": "beamType", "type": "select", "label": "Beam Type", "options": ["Single beam", "Twin beam"] },
          { "id": "autoPickFinder", "name": "autoPickFinder", "type": "select", "label": "Auto Pick Finder", "options": ["Available", "Not Available"] },
          { "id": "underMotionCapacity", "name": "underMotionCapacity", "type": "text", "label": "Under Motion Capacity" },
          { "id": "photoLever", "name": "photoLever", "type": "file", "label": "Lever Photo" },
          { "id": "photoLeverCapacity", "name": "photoLeverCapacity", "type": "file", "label": "Lever Capacity Photo" },
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Picanol',
    sections: [
      {
        "id": "general",
        "name": "General",
        "fields": [
          { "id": "model", "name": "model", "type": "select", "label": "Model", "options": ["OmniPlus", "OmniPlus 800", "Summum", "OmniPlus i Connect"], "required": true },
          { "id": "yearOfMfg", "name": "yearOfMfg", "type": "number", "label": "Year of Mfg", "validation": { "min": 2000, "max": new Date().getFullYear(), "message": "Only above 2000" } },
          { "id": "typeOfFabric", "name": "typeOfFabric", "type": "select", "label": "Type Of Fabric", "options": ["Velvet", "Carpet", "Terry", "Label", "Tyre Cord", "Denim", "Grey", "Yarn Dyed", "Jacquard Fabric", "Georget", "Matras Sticking", "Upholsterry", "Kanvas", "Net", "Bed Sheet", "Sarong/Sari"] },
          { "id": "nameplatePhoto", "name": "nameplatePhoto", "type": "file", "label": "Nameplate Photo"}
        ]
      },
      {
        "id": "sheddingSystem",
        "name": "Shedding System",
        "fields": [
          { "id": "sheddingMechanism", "name": "sheddingMechanism", "type": "select", "label": "Shedding Mechanism", "options": ["Cam", "Crank", "Dobby"] },
          { "id": "sheddingMotionType", "name": "sheddingMotionType", "type": "select", "label": "Shedding Motion Type", "options": ["Mechanical", "Electronic"] },
          { "id": "sheddingMotionMake", "name": "sheddingMotionMake", "type": "select", "label": "Shedding Motion Make", "options": ["Staubli"] },
          { "id": "sheddingMotionCapacity", "name": "sheddingMotionCapacity", "type": "select", "label": "Shedding Motion Capacity", "options": ["24", "10", "20", "12", "16", "8", "6", "4", "7", "14", "9"] },
          { "id": "sheddingMotionInstalled", "name": "sheddingMotionInstalled", "type": "select", "label": "Shedding Motion Installed Capacity", "options": ["24", "10", "20", "12", "16", "8", "6", "4", "7", "14", "9"] },
          { "id": "sheddingMotionModelPhoto", "name": "sheddingMotionModelPhoto", "type": "file", "label": "Shedding Motion Model Photo" },
          { "id": "noOfFramesSupplied", "name": "noOfFramesSupplied", "type": "number", "label": "No of Frames Supplied" },
          { "id": "noOfHealdWire", "name": "noOfHealdWire", "type": "number", "label": "No of Heald Wire Supplied/Set" },
          { "id": "noOfDropper", "name": "noOfDropper", "type": "number", "label": "No of Dropper Supplied" },
        ]
      },
      {
        "id": "structuralSpecifications",
        "name": "Structural Specifications",
        "fields": [
          { "id": "workingWidth", "name": "workingWidth", "type": "select", "label": "Working Width (cm)", "options": ["190", "220", "250", "280", "340"] },
          { "id": "beamType", "name": "beamType", "type": "select", "label": "Beam Type", "options": ["Single beam", "twin beam"] },
          { "id": "topBeam", "name": "topBeam", "type": "select", "label": "Top Beam", "options": ["Yes", "No"] },
          { "id": "numberOfBeamPipes", "name": "numberOfBeamPipes", "type": "number", "label": "Number of Beam Pipes" },
          { "id": "beamPipeDiameter", "name": "beamPipeDiameter", "type": "text", "label": "Beam Pipe Diameter (mm)" },
          { "id": "beamPipePhoto", "name": "beamPipePhoto", "type": "file", "label": "Beam Pipe Photo" },
          { "id": "selvedgeType", "name": "selvedgeType", "type": "select", "label": "Selvedge Type", "options": ["Rotary Leno", "Tuck-in", "Electronic Leno"] },
          { "id": "selvedgePhoto", "name": "selvedgePhoto", "type": "file", "label": "Selvedge Photo" },
          { "id": "templeType", "name": "templeType", "type": "select", "label": "Temple Type", "options": ["Normal", "Full width"] },
          { "id": "templePhoto", "name": "templePhoto", "type": "file", "label": "Photo of Temple" },
        ]
      },
      {
        "id": "weftInsertionSystem",
        "name": "Weft Insertion System",
        "fields": [
          { "id": "noOfNozzles", "name": "noOfNozzles", "type": "select", "label": "No of Nozzles", "options": ["2", "4", "6"] },
          { "id": "nozzlePhoto", "name": "nozzlePhoto", "type": "file", "label": "Nozzle Photo" },
          { "id": "noOfPrewinder", "name": "noOfPrewinder", "type": "select", "label": "No of Prewinder/Set", "options": ["2", "4", "6"] },
          { "id": "weftStandPhoto", "name": "weftStandPhoto", "type": "file", "label": "Weft Stand Photo" },
          { "id": "weftBreakSystemPhoto", "name": "weftBreakSystemPhoto", "type": "file", "label": "Weft Break System Photo" },
          { "id": "weftFeederPhoto", "name": "weftFeederPhoto", "type": "file", "label": "Weft Feeder Photo" },
        ]
      },
      {
        "id": "warpControl",
        "name": "Warp Control",
        "fields": [
          { "id": "noOfWarpStopBar", "name": "noOfWarpStopBar", "type": "number", "label": "No of Warp Stop Bar" },
          { "id": "warpStopMotionPhoto", "name": "warpStopMotionPhoto", "type": "file", "label": "Photo of Warp Stop Motion" },
          { "id": "easingMotion", "name": "easingMotion", "type": "select", "label": "Easing Motion", "options": ["Available", "Not Available"] },
          { "id": "easingMotionPhoto", "name": "easingMotionPhoto", "type": "file", "label": "Easing Motion Photo" },
          { "id": "letOffMotion", "name": "letOffMotion", "type": "select", "label": "Let-off Motion", "options": ["Mechanical", "Electronic"] },
          { "id": "letOffMotionPhoto", "name": "letOffMotionPhoto", "type": "file", "label": "Photo of Let-off Motion" },
        ]
      },
      {
        "id": "criticalComponents",
        "name": "Critical Components",
        "fields": [
          { "id": "clothTakeUpType", "name": "clothTakeUpType", "type": "select", "label": "Cloth Take-Up Type", "options": ["Off loom (batching)", "on loom (cloth roll)"] },
          { "id": "takeUpMotion", "name": "takeUpMotion", "type": "select", "label": "Take Up Motion", "options": ["Mechanical", "Electronic"] },
          { "id": "takeUpMotionPhoto", "name": "takeUpMotionPhoto", "type": "file", "label": "Photo of Take-up Motion" },
          { "id": "numberOfClothRolls", "name": "numberOfClothRolls", "type": "select", "label": "Number of Cloth Rolls", "options": ["1", "1.5", "2"] },
          { "id": "clothRollPhoto", "name": "clothRollPhoto", "type": "file", "label": "Cloth Roll Photo" },
          { "id": "noOfReedSupplied", "name": "noOfReedSupplied", "type": "number", "label": "No of Reed Supplied" },
          { "id": "noOfBackRestRoll", "name": "noOfBackRestRoll", "type": "select", "label": "No of Back Rest Roll", "options": ["1", "2"] },
        ]
      },
      {
        "id": "electrical",
        "name": "Electrical",
        "fields": [
          { "id": "inverter", "name": "inverter", "type": "select", "label": "Inverter", "options": ["Group", "Individual", "No inverter supplied"] },
          { "id": "inverterPhoto", "name": "inverterPhoto", "type": "file", "label": "Inverter Photo" },
          { "id": "voltage", "name": "voltage", "type": "select", "label": "Voltage", "options": ["200", "220", "380", "440", "560"] },
          { "id": "frequency", "name": "frequency", "type": "select", "label": "Frequency", "options": ["50", "60"] }
        ]
      },
      {
        "id": "accessories",
        "name": "Accessories",
        "fields": [
          { "id": "machineRunningRpm", "name": "machineRunningRpm", "type": "text", "label": "Machine Running RPM" },
          { "id": "autoPickFinder", "name": "autoPickFinder", "type": "select", "label": "Auto Pick Finder", "options": ["Available", "Not Available"] },
          { "id": "undermotionCapacity", "name": "undermotionCapacity", "type": "number", "label": "Undermotion Capacity" },
          { "id": "installedLeverPhoto", "name": "installedLeverPhoto", "type": "file", "label": "Installed Lever Photo" },
          { "id": "leverCapacityPhoto", "name": "leverCapacityPhoto", "type": "file", "label": "Lever Capacity Photo" },
        ]
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