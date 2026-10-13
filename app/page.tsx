"use client";
import { useState, useEffect } from "react";
import { getSheetData } from "@/app/actions/fetchSheetData";

type SheetDataItem = (string | null | undefined)[]; // Define type for rows of sheet data
type SheetData = SheetDataItem[];

export default function Page() {
  const [sheetData, setSheetData] = useState<SheetData>([]); // Typed state for sheet data
  const [sortConfig, setSortConfig] = useState<{
    column: number;
    order: "asc" | "desc";
  }>({ column: 2, order: "asc" });

  useEffect(() => {
    async function fetchData() {
      const data = await getSheetData();
      setSheetData(data.data || []);
    }

    fetchData();
  }, []);

  // const sortedData = [...sheetData]
  //   .filter((item) => item[0])
  //   .sort((a, b) => {
  //     const valA = a[sortConfig.column]?.toLowerCase() || "";
  //     const valB = b[sortConfig.column]?.toLowerCase() || "";
  //     if (valA < valB) return sortConfig.order === "asc" ? -1 : 1;
  //     if (valA > valB) return sortConfig.order === "asc" ? 1 : -1;
  //     return 0;
  //   });

  // console.log("data", sortedData);

  const handleSort = (column: number) => {
    setSortConfig(
      (prev) =>
        prev.column === column
          ? { column, order: prev.order === "asc" ? "desc" : "asc" } // inverte se mesma coluna
          : { column, order: "asc" }, // reset para asc se coluna nova
    );
  };

  const getSortIcon = (column: number) => {
    if (sortConfig.column !== column) return "↕️";
    return sortConfig.order === "asc" ? "▲" : "▼";
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort(0)} style={{ cursor: "pointer" }}>
              ID {getSortIcon(0)}
            </th>
            <th>Imagem</th>
            <th onClick={() => handleSort(2)} style={{ cursor: "pointer" }}>
              Title PT {getSortIcon(2)}
            </th>
            <th onClick={() => handleSort(3)} style={{ cursor: "pointer" }}>
              Title EN {getSortIcon(3)}
            </th>
            <th>Year</th>
            <th>Tipologia</th>
            <th>Technique PT</th>
            <th>Technique EN</th>
            <th>Dimensions</th>
            <th>Frame</th>
            <th>Ownership</th>
            <th>Location</th>
            <th>Publication</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {sheetData.map((item, i) => (
            <tr key={i}>
              <td>{item[0]}</td>
              <td>
                {item[1] && (
                  <img
                    src={`http://images.sarabichao.com/${item[1]}`}
                    alt={`Imagem ${i}`}
                  />
                )}
              </td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
              <td>{item[5]}</td>
              <td>{item[6]}</td>
              <td>{item[7]}</td>
              <td>{item[8]}</td>
              <td>{item[9]}</td>
              <td>{item[10]}</td>
              <td>{item[11]}</td>
              <td>{item[12]}</td>
              <td>{item[13]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
