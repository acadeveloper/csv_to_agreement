export const downloadFile = (file, filename = 'file', extention = 'docx') => {
  const url = file;
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${filename}.${extention}`;
  document.body.appendChild(a);
  a.click();
};

export default undefined;
