/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = "project-5f5d1b7e-3a3e-476a-ba3";
const location = "us"; // Format is 'us' or 'eu'
const processorId = "34420d66c4a344dc"; // Create processor in Cloud Console

const { DocumentProcessorServiceClient } =
  require("@google-cloud/documentai").v1;

// Instantiates a client
// apiEndpoint regions available: eu-documentai.googleapis.com, us-documentai.googleapis.com (Required if using eu based processor)
// const client = new DocumentProcessorServiceClient({apiEndpoint: 'eu-documentai.googleapis.com'});
const client = new DocumentProcessorServiceClient();

async function quickstart(encodedImage, mimeType) {
  // The full resource name of the processor, e.g.:
  // projects/project-id/locations/location/processor/processor-id
  // You must create new processors in the Cloud Console first
  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  const request = {
    name,
    rawDocument: {
      content: encodedImage,
      mimeType: mimeType,
    },
  };

  // Recognizes text entities in the PDF document
  const [result] = await client.processDocument(request);
  const { document } = result;

  const datosExtraidos = {};
  for (const entity of document.entities) {
    // entity.type es el nombre de la etiqueta
    // entity.mentionText es el texto que la IA extrajo para esa etiqueta
    const tipo = entity.type;
    const texto = entity.mentionText;

    // Limpiamos un poco el texto (quitamos saltos de línea)
    datosExtraidos[tipo] = texto.replace(/\n/g, " ").trim();
  }

  return datosExtraidos;
}

module.exports = {
  quickstart,
};
