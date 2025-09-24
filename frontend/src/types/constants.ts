export const MACHINE_CATEGORIES = {
  AIRJET: 'airjet',
  RAPIER: 'rapier'
} as const;

export type MachineCategory = typeof MACHINE_CATEGORIES[keyof typeof MACHINE_CATEGORIES];

// Template to category mapping  
export const TEMPLATE_CATEGORIES: Record<string, MachineCategory> = {
  '1': MACHINE_CATEGORIES.AIRJET,    // Toyota
  '2': MACHINE_CATEGORIES.AIRJET,    // Picanol
  '3': MACHINE_CATEGORIES.RAPIER,    // Picanol Rapier
  '4': MACHINE_CATEGORIES.RAPIER,    // Somet Rapier
  '5': MACHINE_CATEGORIES.RAPIER,    // Vamatex Rapier
  '6': MACHINE_CATEGORIES.RAPIER,    // SMIT Rapier
  '7': MACHINE_CATEGORIES.RAPIER,    // Itema Rapier
};