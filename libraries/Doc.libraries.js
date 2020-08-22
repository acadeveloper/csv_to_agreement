import PizZip from 'pizzip';
import fs from 'fs';
import Docxtemplater from 'docxtemplater';

export function getWordFileFromTemplate(template, data) {
  const content = fs.readFileSync(template, 'binary');
  const zip = new PizZip(content);
  let doc;

  try {
    doc = new Docxtemplater(zip);
  } catch (error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    throw new Error(error);
  }

  // set the templateVariables
  doc.setData(data);

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render();
  } catch (error) {
    throw new Error(error);
  }

  const buf = doc.getZip().generate({ type: 'base64' });
  return buf;
}

export default undefined;
