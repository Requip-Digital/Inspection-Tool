const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

interface KeyValueData {
  [key: string]: string | number;
}

interface Machine {
  id: string;
  name: string;
  sections: Array<{
    id: string;
    name: string;
    fields: Array<{
      id: string;
      name: string;
      type: string;
      label: string;
      value: any;
    }>;
  }>;
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
  };
  machines: Machine[];
  templateId: string;
}

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

async function generatePDF(project: Project): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      let currentPage = 1;
      const doc = new PDFDocument({ margin: 50 });
      const outputPath = `inspection_report_${project.name}.pdf`;
      const writeStream = fs.createWriteStream(outputPath);

      // Store watermark buffer at the top level
      let watermarkBuffer: Buffer | null = null;

      // Define watermark function
      const addWatermark = () => {
        if (!watermarkBuffer) return;
        
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;

        // Set very low opacity for watermark
        doc.save();
        doc.opacity(0.2);

        // Calculate center point for rotation
        const centerX = pageWidth / 2;
        const centerY = pageHeight / 2;

        // Add timestamp text
        const timestamp = new Date().toLocaleString();

        // Translate to center, rotate, then translate back
        doc.translate(centerX, centerY)
           .rotate(-45)
           .translate(-centerX, -centerY);

        // Draw image
        doc.image(watermarkBuffer, (pageWidth - 300) / 2, (pageHeight) / 2, {
          width: 300,
          align: 'center',
          valign: 'center'
        });

        // Add timestamp text below the image
        doc.font("Helvetica")
           .fontSize(12)
           .fillColor("black")
           .text(timestamp, 
                (pageWidth - 300) / 2, 
                (pageHeight) / 2 + 60, 
                { width: 300, align: 'center' });

        doc.restore();
      };

      // Handle stream errors
      writeStream.on('error', (error: Error) => {
        console.error('Error writing PDF:', error);
        reject(error);
      });

      // Handle stream finish
      writeStream.on('finish', () => {
        resolve(outputPath);
      });

      doc.pipe(writeStream);

      addWatermark();

      // Helper function to handle page breaks
      const addNewPage = () => {
        addWatermark();
        doc.addPage();
        currentPage++;
      };

      const sectionTitle = (title: string) => {
        // Check if we need a new page
        if (doc.y > doc.page.height - 150) {
          addNewPage();
        }

        // Add padding above section title
        doc.moveDown(1);
        
        // Calculate title box dimensions
        const titleBoxWidth = doc.page.width - 100;
        const titleBoxHeight = 30;
        const titleX = doc.page.margins.left;
        const titleY = doc.y;

        // Draw title box
        doc
          .fillColor("#003366")
          .rect(titleX, titleY, titleBoxWidth, titleBoxHeight)
          .fill();

        // Add title text
        doc
          .font("Helvetica-Bold")
          .fontSize(14)
          .fillColor("white")
          .text(title, titleX + 10, titleY + 8);

        // Move down after title
        doc.moveDown(1);
      };

      const addKeyValueTable = (data: KeyValueData) => {
        // Table configuration
        const colWidth = (doc.page.width - 100) / 2;
        const rowHeight = 25;
        const startX = doc.page.margins.left;
        let currentY = doc.y;

        Object.entries(data).forEach(([key, value], index) => {
          // Check if we need a new page
          if (currentY > doc.page.height - rowHeight - 50) {
            addNewPage();
            currentY = doc.y;
          }

          // Draw cell backgrounds
          doc
            .fillColor('#f5f5f5')
            .rect(startX, currentY, colWidth, rowHeight)
            .fill()
            .rect(startX + colWidth, currentY, colWidth, rowHeight)
            .fill();

          // Draw cell borders
          doc
            .strokeColor('#000000')
            .lineWidth(0.5)
            .rect(startX, currentY, colWidth, rowHeight)
            .stroke()
            .rect(startX + colWidth, currentY, colWidth, rowHeight)
            .stroke();

          // Add text
          doc
            .font("Helvetica-Bold")
            .fillColor("black")
            .text(key, startX + 5, currentY + 7, { width: colWidth - 10 })
            .font("Helvetica")
            .text(value.toString(), startX + colWidth + 5, currentY + 7, { width: colWidth - 10 });

          currentY += rowHeight;
        });

        // Move down after table
        doc.y = currentY + 20;
      };

      const addImage = (imgPath: string, maxWidth = 250) => {
        if (fs.existsSync(imgPath)) {
          // Check if we need to add a new page based on remaining space
          const imgHeight = 200; // Reduced height for image
          if (doc.y + imgHeight > doc.page.height - 50) {
            addNewPage();
          }

          // Use the left margin for consistent left alignment
          const imgX = doc.page.margins.left;
          const imgTop = doc.y;
          doc.image(imgPath, imgX, imgTop, { width: maxWidth });
          
          // Ensure we move down enough after the image
          doc.y = imgTop + imgHeight + 20;
        } else {
          doc
            .font("Helvetica")
            .fillColor("red")
            .text("Image not found: " + imgPath);
        }
      };

      // Load Logo
      const logoPath = "https://i.ibb.co/XfX0jj52/requip.png";
      try {
        const response = await axios.get(logoPath, { responseType: 'arraybuffer' });
        doc.image(Buffer.from(response.data), (doc.page.width - 100) / 2, 20, { width: 100 });
        watermarkBuffer = Buffer.from(response.data);
      } catch (error) {
        console.error('Error loading logo:', error);
        // Continue without the logo if it fails to load
      }

      // Title
      doc
        .font("Helvetica-Bold")
        .fontSize(20)
        .fillColor("#003366")
        .text("Inspection Project Report", { align: "center" })

      // Project Details
      sectionTitle("Project Information");
      const projectData: KeyValueData = {
        "Project Name": project.name,
        "Inspection Date": formatDate(project.details.inspectionDate) || "N/A",
        "City": project.details.city || "N/A",
        "Originally Bought": project.details.originallyBought || "N/A",
        "Nearest Airport": project.details.nearestAirport || "N/A",
        "Condition": project.details.condition || "N/A",
      };

      // Add Picanol specific fields if applicable
      if (project.templateId === "Picanol") {
        Object.assign(projectData, {
          "Mill Name": project.details.millName || "N/A",
          "Country": project.details.country || "N/A",
          "Delivery": project.details.delivery || "N/A",
          "Asking Price": project.details.askingPrice || "N/A",
        });
      }

      addKeyValueTable(projectData);

      // Machines Section
      project.machines.forEach((machine, index) => {
        sectionTitle(machine.name);
        
        // Add machine sections and fields
        machine.sections.forEach(section => {
          // Add section title
          doc.font("Helvetica-Bold")
             .fontSize(12)
             .fillColor("#003366")
             .text(section.name, doc.page.margins.left)
             .moveDown(0.5);

          // Add fields as key-value pairs
          const sectionData: KeyValueData = {};
          section.fields.filter(field => field.type !== "file").forEach(field => {
            sectionData[field.label] = field.value || "N/A";
          });
          addKeyValueTable(sectionData);
        });

        // Add some spacing between machines
        doc.moveDown(2);
      });

      // Finalize the PDF
      doc.end();

    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(error);
    }
  });
}

export { generatePDF };
