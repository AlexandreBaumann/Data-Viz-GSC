import Papa from "papaparse";

async function fetchCsvData() {
  return new Promise((resolve, reject) => {
    Papa.parse("/GSC_DTG_perWeek_annee2023.csv", {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
}

export default fetchCsvData;
