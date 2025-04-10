// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

// export default function SxProp() {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 20,
//     maxColumns: 5,
//   });

//   return (
//     <Box sx={{ height: 300, width: '100%' }}>
//       <DataGrid
//         {...data}
//         sx={{
//           boxShadow: 10,
//           border: 2,
//           borderColor: 'primary.light',
//           '& .MuiDataGrid-cell:hover': {
//             color: 'blue',
//           },
//         }}
//       />
//     </Box>
//   );
// }


import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function SxProp() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 20,
    maxColumns: 5,
  });

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        {...data}
        sx={{
          border: '2px solid #2196f3',
          borderRadius: 3,
          boxShadow: 5,
          fontFamily: 'Segoe UI, sans-serif',
          backgroundColor: '#fafafa',
          '& .MuiDataGrid-columnHeaders': {
            background: 'linear-gradient(to right, #2196f3, #21cbf3)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
          },
          '& .MuiDataGrid-cell': {
            transition: 'all 0.3s ease-in-out',
            fontSize: '0.95rem',
          },
          '& .MuiDataGrid-cell:hover': {
            color: '#1a237e',
            backgroundColor: '#e3f2fd',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f1f8e9', // light green
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#fce4ec', // light pink
          },
          '& .MuiCheckbox-root.Mui-checked': {
            color: '#e91e63 !important',
          },
          '& .MuiDataGrid-selectedRowCount': {
            visibility: 'hidden',
          },
          '& .MuiDataGrid-footerContainer': {
            background: '#f3e5f5',
            color: '#6a1b9a',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-toolbarContainer': {
            background: '#ede7f6',
          },
          '& .MuiDataGrid-virtualScroller': {
            overflowX: 'hidden',
          },
        }}
        paginationModel={{ pageSize: 10, page: 0 }}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
