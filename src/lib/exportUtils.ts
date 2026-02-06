import * as XLSX from 'xlsx';

/**
 * Utility to export JSON data to an Excel file
 * @param data Array of objects to export
 * @param fileName Name of the file (without extension)
 * @param sheetName Name of the worksheet
 */
export const exportToExcel = (data: any[], fileName: string, sheetName: string = 'Sheet1') => {
    if (!data || data.length === 0) {
        console.warn('No data to export');
        return;
    }

    // Create a worksheet from the JSON data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate buffer and trigger download
    XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
};
