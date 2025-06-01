const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

interface KeyValueData {
  [key: string]: string | number;
}

async function generatePDF() {
  let currentPage = 1;
  const doc = new PDFDocument({ margin: 50 });
  const outputPath = "inspection_report_with_images.pdf";
  doc.pipe(fs.createWriteStream(outputPath));

  // Helper function to handle page breaks
  const addNewPage = () => {
    doc.addPage(); // Add new page
    currentPage++; // Increment page counter
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
  const logoPath = path.join(__dirname, "requip.png");
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, (doc.page.width - 100) / 2, 20, { width: 100 });
  }

  // Title
  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor("#003366")
    .text("Inspection Project Report", { align: "center" });

}

generatePDF()
  .then((path) => console.log(`PDF saved to: ${path}`))
  .catch((err) => console.error("Failed to generate PDF:", err));
