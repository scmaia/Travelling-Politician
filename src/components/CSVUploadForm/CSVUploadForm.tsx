/**
 * Todo: Decouple this component so that it is agnostic
 * about reading and parsing. We can do this by having it accept methods
 * for parsing.
 */
import React, { useState } from "react";
import { City } from "../../types";
import "./CSVUploadForm.scss";

interface ICSVUploadFormProps {
  // Callback that receives parsed cities object array from csv
  setCities: React.Dispatch<React.SetStateAction<City[]>>;
}

const CSVUploadForm: React.FC<ICSVUploadFormProps> = ({ setCities }) => {
  const [file, setFile] = useState<File>();

  const fileReader = new FileReader();

  const handleOnChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    setFile(file);
  };

  const fileToArray = (csvOutput: string) => {
    const lines = csvOutput.split("\n");
    const result: City[] = [];

    lines.forEach((line, lineIndex) => {
      let values = line.split(",");
      const city: City = {
        city: values[0],
        state: values[1],
        latitude: parseFloat(values[2]),
        longitude: parseFloat(values[3]),
      };
      // Only add object if it is not the first row (headers) and if the row is not empty
      if (lineIndex !== 0 && Object.values(city)[0]) {
        result.push(city);
      }
    });
    return result;
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event?.target?.result;
        setCities(fileToArray(csvOutput as string));
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <section className="form">
      <h2>IMPORT CSV FILE</h2>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
          disabled={!file}
        >
          IMPORT CSV
        </button>
      </form>
    </section>
  );
};

export default CSVUploadForm;
