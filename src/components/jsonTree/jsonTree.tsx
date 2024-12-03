


// import React from 'react';
// import { JsonToTable } from "react-json-to-table";
// import './JsonTreeDisplay.css';

// interface JsonTreeDisplayProps {
//   data: Record<string, any>;
// }

// const JsonTreeDisplay: React.FC<JsonTreeDisplayProps> = ({ data }) => {
//   return (
//     <div className="json-table-container">
//       <JsonToTable json={data} />
//     </div>
//   );
// };

// export default JsonTreeDisplay;


import React from 'react';
import { JsonToTable } from "react-json-to-table";
import './JsonTreeDisplay.css';

interface JsonTreeDisplayProps {
  data: Record<string, any>;
  depthColors?: string[]; // Array of colors for depths
}

const JsonTreeDisplay: React.FC<JsonTreeDisplayProps> = ({ data, depthColors = ["#e53e3e", "#718096", "#ecc94b", "#48bb78", "#6b46c1"] }) => {
  // Recursive function to render rows with depth-based styles
  // const renderRows = (obj: Record<string, any>, depth: number = 0): JSX.Element[] => {
  //   const rows: JSX.Element[] = [];
  //   const color = depthColors[depth % depthColors.length]; // Cycle through colors

  //   Object.entries(obj).forEach(([key, value]) => {
  //     rows.push(
  //       <tr key={`${depth}-${key}`}>
  //         <td style={{ color, fontWeight: 'bold' }}>{key}</td>
  //         <td>{typeof value === 'object' ? renderNestedTable(value, depth + 1) : value}</td>
  //       </tr>
  //     );
  //   });

  //   return rows;
  // };

  // const renderRows = (obj: Record<string, any>, depth: number = 0): JSX.Element[] => {
  //   const rows: JSX.Element[] = [];
  //   const color = depthColors[depth % depthColors.length]; // Cycle through colors
  
  //   Object.entries(obj).forEach(([key, value]) => {
  //     rows.push(
  //       <tr key={`${depth}-${key}`}>
  //         <td
  //           style={{
  //             color,
  //             fontWeight: 'bold',
  //             fontSize: '20px', // Increase font size
  //             width: '300px', // Increase width of key cells
  //           }}
  //         >
  //           {key}
  //         </td>
  //         <td>{typeof value === 'object' ? renderNestedTable(value, depth + 1) : value}</td>
  //       </tr>
  //     );
  //   });
  
  //   return rows;
  // };
  
  const renderRows = (obj: Record<string, any>, depth: number = 0): JSX.Element[] => {
    const rows: JSX.Element[] = [];
    const color = depthColors[depth % depthColors.length]; // Cycle through colors
  
    Object.entries(obj).forEach(([key, value]) => {
      rows.push(
        <tr key={`${depth}-${key}`}>
          <td
            style={{
              color,
              fontWeight: 'bold',
              fontSize: '20px', // Increased font size for keys
              width: '300px', // Increased width of key cells
            }}
          >
            {key}
          </td>
          <td
            style={{
              fontSize: '18px', // Increased font size for values
              color: '#E8E8E8', // Slightly lighter color for values
            }}
          >
            {typeof value === 'object' ? renderNestedTable(value, depth + 1) : value}
          </td>
        </tr>
      );
    });
  
    return rows;
  };

  
  const renderNestedTable = (nestedObj: Record<string, any>, depth: number): JSX.Element => (
    <table className="nested-table" style={{ marginLeft: depth * 20 }}>
      <tbody>{renderRows(nestedObj, depth)}</tbody>
    </table>
  );

  return (
    <div className="json-table-container">
      <table>
        <tbody>{renderRows(data)}</tbody>
      </table>
    </div>
  );
};

export default JsonTreeDisplay;
