"use client";
import { useState, useEffect } from "react";
import { getSheetData } from "@/app/actions/fetchSheetData";

type SheetDataItem = (string | null | undefined)[]; // Define type for rows of sheet data
type SheetData = SheetDataItem[];

export default function Page() {
  const [sheetData, setSheetData] = useState<SheetData>([]); // Typed state for sheet data
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Manage sorting order

  useEffect(() => {
    async function fetchData() {
      const data = await getSheetData();
      setSheetData(data.data || []);
    }

    fetchData();
  }, []);

  const sortedData = [...sheetData]
    .filter((item) => item[2])
    .sort((a, b) => {
      const titleA = a[2]?.toLowerCase() || "";
      const titleB = b[2]?.toLowerCase() || "";
      if (titleA < titleB) return sortOrder === "asc" ? -1 : 1;
      if (titleA > titleB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Título PT {sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th>Título EN</th>
            <th>Data</th>
            <th>Tipologia</th>
            <th>Técnica</th>
            <th>Dimensões</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, i) => (
            <tr key={i}>
              <td>{item[1] && <img src={item[1]} alt={`Imagem ${i}`} />}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
              <td>{item[5]}</td>
              <td>{item[6]}</td>
              <td>{item[7]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
