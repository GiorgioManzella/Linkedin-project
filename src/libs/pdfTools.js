import PdfPrinter from "pdfmake";

const generateUserPdfReadableStream = (user) => {
  console.log(user);
  let fonts = {
    Roboto: {
      normal: "Helvetica",
      /*    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
            italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf' */
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      {
        text: "Eyo",
        styles: "header",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
    },
  };
  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  pdfReadableStream.end();

  return pdfReadableStream;
};

export default generateUserPdfReadableStream;
