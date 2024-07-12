export function formatFileName(filename: string) {
  const formatOriginalNameFull = filename.split('.');
  const extensionFile = formatOriginalNameFull.pop();
  const formatOriginalName = formatOriginalNameFull.join('.');

  return {
    formatOriginalName,
    extensionFile,
  };
}
