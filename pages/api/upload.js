import { IncomingForm } from 'formidable';
import csvtojson from 'csvtojson';
import { getWordFileFromTemplate } from '../../libraries/Doc.libraries';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(req, res) {
  // parse form with a Promise wrapper
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      return resolve({ fields, files });
    });
  });

  const parsedCsvContents = await csvtojson().fromFile(
    data?.files?.csvData?.path,
  );
  const parsedTemplate = data?.files?.template?.path;

  const files = parsedCsvContents.map((content) => {
    const filename = Object.values(content).slice(0, 2).join('_');

    return {
      file: getWordFileFromTemplate(parsedTemplate, content),
      filename,
    };
  });
  res.send({ files });
}
