import JSZip from 'jszip';
import { downloadFile } from '../helpers/download.helpers';

export const zipFiles = async (folderName = 'example', files) => {
  const zip = new JSZip();
  const folder = zip.folder(folderName);
  files.forEach(({ filename, file }) => {
    folder.file(`${filename}.docx`, file, { base64: true });
  });
  await zip.generateAsync({ type: 'base64' }).then((content) => {
    downloadFile(`data:application/zip;base64,${content}`, 'example', 'zip');
  });
};

export default undefined;
