import Papa from "papaparse";
export async function loadCSV() {
    const response = await fetch("/results.csv");
    const csvText = await response.text();
    return new Promise((resolve) => {
        Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                resolve(results.data);
            }
        });
    });
}