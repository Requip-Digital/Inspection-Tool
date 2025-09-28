const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

interface KeyValueData {
  [key: string]: string | number;
}

interface Field {
  id: string;
  name: string;
  type: string;
  label: string;
  value: any;
}

interface Section {
  id: string;
  name: string;
  fields: Field[];
}

interface Machine {
  _id: string;
  name: string;
  sections: Section[];
}

interface MachineData {
  id: string | Machine;
  name?: string;
  sections?: Section[];
}

interface Project {
  _id: string;
  name: string;
  details: {
    inspectionDate?: string;
    city?: string;
    originallyBought?: string;
    nearestAirport?: string;
    condition?: string;
    millName?: string;
    country?: string;
    delivery?: string;
    askingPrice?: string;
    noOfMachines?: string;
  };
  machines: MachineData[];
  templateId: string;
}

/**
 * Format date string to Indian locale format
 * @param dateString - ISO date string
 * @returns Formatted date string or 'N/A' if invalid
 */
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Type guard to check if machine is a Machine object
 * @param machine - string or Machine object
 * @returns boolean indicating if it's a Machine object
 */
function isMachineObject(machine: string | Machine): machine is Machine {
  return typeof machine !== 'string' && (machine as Machine)._id !== undefined;
}

/**
 * Load local image file from assets directory
 * @param imagePath - Relative path to the image
 * @returns Buffer containing image data or null if not found
 */
const loadLocalImage = (imagePath: string): Buffer | null => {
  try {
    const absolutePath = path.resolve(process.cwd(), imagePath);
    if (fs.existsSync(absolutePath)) {
      return fs.readFileSync(absolutePath);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Generate PDF inspection report for a project
 * @param project - Project data with machines and details
 * @returns Promise resolving to the PDF file path
 */
async function generatePDF(project: Project): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Initialize PDF document with A4 size and margins
      const doc = new PDFDocument({ 
        margin: 50,
        size: 'A4'
      });
      
      // Create output filename by replacing special characters with underscores
      const outputPath = `inspection_report_${project.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      const writeStream = fs.createWriteStream(outputPath);

      // Handle stream errors
      writeStream.on('error', (error: Error) => {
        reject(error);
      });

      // Handle stream completion
      writeStream.on('finish', async () => {
        resolve(outputPath);
      });

      doc.pipe(writeStream);

      /**
       * Add header with logo and title to the current page
       */
      const addHeader = () => {
        const topMargin = 30;
        
        try {
          // Load and display company logo
          const mainLogoPath = "src/assets/logo.png";
          const mainLogoBuffer = loadLocalImage(mainLogoPath);
          
          if (mainLogoBuffer) {
            doc.image(mainLogoBuffer, 50, topMargin, { width: 80 });
          }
          
          // Add report title
          doc
            .font("Helvetica-Bold")
            .fontSize(16)
            .fillColor("#003366")
            .text("REQUIP INSPECTION PROJECT REPORT", 140, topMargin + 10);
          
          // Add decorative header line
          doc
            .moveTo(50, topMargin + 40)
            .lineTo(doc.page.width - 50, topMargin + 40)
            .strokeColor("#003366")
            .lineWidth(1)
            .stroke();
          
        } catch (error) {
          // Fallback header without logo
          doc
            .font("Helvetica-Bold")
            .fontSize(16)
            .fillColor("#003366")
            .text("REQUIP INSPECTION PROJECT REPORT", 50, topMargin, { align: "center" });
        }
      };

      // Add header to first page and set initial position
      addHeader();
      doc.y = 100; // Start content below header

      /**
       * Create a section title with blue background
       * @param title - Section title text
       */
      const sectionTitle = (title: string) => {
        // Add new page if not enough space for section
        if (doc.y > doc.page.height - 200) {
          doc.addPage();
          addHeader();
          doc.y = 100;
        }

        doc.moveDown(0.5);
        
        // Section title styling
        const titleBoxWidth = doc.page.width - 100;
        const titleBoxHeight = 25;
        const titleX = 50;
        const titleY = doc.y;

        // Draw title background
        doc
          .fillColor("#003366")
          .rect(titleX, titleY, titleBoxWidth, titleBoxHeight)
          .fill();

        // Add title text
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .fillColor("white")
          .text(title.toUpperCase(), titleX + 10, titleY + 7);

        // Position cursor after title
        doc.y = titleY + titleBoxHeight + 15;
      };

      /**
       * Create a key-value table from data object
       * @param data - Object containing key-value pairs to display
       */
      const addKeyValueTable = (data: KeyValueData) => {
        // Handle empty data case
        if (Object.keys(data).length === 0) {
          doc.font("Helvetica")
             .fontSize(9)
             .fillColor("#666666")
             .text("No data available for this section", { indent: 10 })
             .moveDown(0.5);
          return;
        }

        // Table configuration
        const colWidth = (doc.page.width - 100) / 2;
        const rowHeight = 20;
        const startX = 50;
        let currentY = doc.y;

        // Create table rows for each key-value pair
        Object.entries(data).forEach(([key, value]) => {
          // Add new page if not enough space for next row
          if (currentY + rowHeight > doc.page.height - 50) {
            doc.addPage();
            addHeader();
            currentY = 100;
          }

          // Draw alternating row backgrounds
          doc
            .fillColor('#f8f9fa')
            .rect(startX, currentY, colWidth, rowHeight)
            .fill()
            .rect(startX + colWidth, currentY, colWidth, rowHeight)
            .fill();

          // Draw cell borders
          doc
            .strokeColor('#dee2e6')
            .lineWidth(0.3)
            .rect(startX, currentY, colWidth, rowHeight)
            .stroke()
            .rect(startX + colWidth, currentY, colWidth, rowHeight)
            .stroke();

          // Add key (left column) and value (right column)
          doc
            .font("Helvetica-Bold")
            .fontSize(8)
            .fillColor("#2c3e50")
            .text(key, startX + 5, currentY + 6, { 
              width: colWidth - 10,
              align: 'left'
            })
            .font("Helvetica")
            .fillColor("#34495e")
            .text(
              value.toString(), 
              startX + colWidth + 5, 
              currentY + 6, 
              { 
                width: colWidth - 10,
                align: 'left'
              }
            );

          currentY += rowHeight;
        });
        
        // Position cursor after table
        doc.y = currentY + 15;
      };

      /**
       * Create a subsection title with underline
       * @param title - Subsection title text
       */
      const subsectionTitle = (title: string) => {
        // Add new page if not enough space
        if (doc.y > doc.page.height - 100) {
          doc.addPage();
          addHeader();
          doc.y = 100;
        }
        
        // Add underlined subsection title
        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .fillColor("#2c3e50")
          .text(title, 50, doc.y, { underline: true })
          .moveDown(0.3);
      };

      // ==================== MAIN CONTENT GENERATION ====================

      // Project Information Section
      sectionTitle("PROJECT INFORMATION");
      
      // Collect project data for display
      const projectData: KeyValueData = {
        "Project Name": project.name,
        "Inspection Date": formatDate(project.details.inspectionDate) || "N/A",
        "City": project.details.city || "N/A",
        "Originally Bought": project.details.originallyBought || "N/A",
        "Nearest Airport": project.details.nearestAirport || "N/A",
        "Condition": project.details.condition || "N/A",
      };

      // Add Picanol-specific fields if applicable
      if (project.templateId === "Picanol") {
        Object.assign(projectData, {
          "Mill Name": project.details.millName || "N/A",
          "Country": project.details.country || "N/A",
          "Delivery": project.details.delivery || "N/A",
          "Asking Price": project.details.askingPrice || "N/A",
        });
      }

      // Add machine count
      Object.assign(projectData, {
        "No. of Machines": project.details.noOfMachines || "N/A"
      });

      // Filter out 'N/A' values and display project data
      const filteredProjectData: KeyValueData = Object.fromEntries(
        Object.entries(projectData).filter(([_, value]) => value !== 'N/A')
      );
      
      addKeyValueTable(filteredProjectData);
      doc.moveDown(0.5);

      // Machines Section - Process each machine in the project
      project.machines.forEach((machineData: MachineData, machineIndex: number) => {
        // Handle nested machine object structure
        let machine: Machine;
        
        if (isMachineObject(machineData.id)) {
          machine = machineData.id;
        } else {
          // Check if machineData itself contains machine properties
          if ((machineData as any)._id && (machineData as any).name && (machineData as any).sections) {
            machine = machineData as unknown as Machine;
          } else {
            // Skip invalid machine data
            return;
          }
        }
        
        // Add machine section title
        sectionTitle(`MACHINE: ${machine.name.toUpperCase()}`);

        // Skip if no sections configured
        if (!machine.sections || machine.sections.length === 0) {
          doc.font("Helvetica")
             .fontSize(9)
             .fillColor("#666666")
             .text("No sections configured for this machine", { indent: 10 })
             .moveDown(0.5);
          return;
        }

        // Process each section in the machine
        machine.sections.forEach((section: Section) => {
          // Add subsection title
          subsectionTitle(section.name);

          // Skip if no fields in section
          if (!section.fields || section.fields.length === 0) {
            doc.font("Helvetica")
               .fontSize(9)
               .fillColor("#666666")
               .text("No fields configured in this section", { indent: 10 })
               .moveDown(0.5);
            return;
          }

          // Collect section data for display
          const sectionData: KeyValueData = {};
          section.fields.forEach((field: Field) => {
            if (field.value !== undefined && field.value !== null && field.value !== '' && field.value !== 'N/A') {
              sectionData[field.label] = field.value;
            } else {
              sectionData[field.label] = "Not Set";
            }
          });

          // Display section data in table format
          addKeyValueTable(sectionData);
        });
        
        // Add space between machines or new page if needed
        if (machineIndex < project.machines.length - 1) {
          if (doc.y > doc.page.height - 150) {
            doc.addPage();
            addHeader();
            doc.y = 100;
          } else {
            doc.moveDown(1);
          }
        }
      });

      // Finalize PDF generation
      doc.end();

    } catch (error) {
      reject(error);
    }
  });
}

export { generatePDF };