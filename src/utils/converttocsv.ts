export const convertToCSV = (data: any[]) => {
    if (data.length === 0) {
      return '';
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row) => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
  };