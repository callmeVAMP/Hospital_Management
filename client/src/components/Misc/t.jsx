// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';

// // const columns = [
// //   { field: 'id', headerName: 'ID', width: 90 },
// //   {
// //     field: 'firstName',
// //     headerName: 'First name',
// //     width: 150,
// //     editable: true,
// //   },
// //   {
// //     field: 'lastName',
// //     headerName: 'Last name',
// //     width: 150,
// //     editable: true,
// //   },
// //   {
// //     field: 'age',
// //     headerName: 'Age',
// //     type: 'number',
// //     width: 110,
// //     editable: true,
// //   },
// //   {
// //     field: 'fullName',
// //     headerName: 'Full name',
// //     description: 'This column has a value getter and is not sortable.',
// //     sortable: false,
// //     width: 160,
// //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
// //   },
// // ];

// const columns = [
//     { field: 'PID', headerName: 'PID', width: 90 },
//     { field: 'PName', headerName: 'Name', width: 150 },
//     { field: 'PAddr', headerName: 'Address', width: 200 },
//     { field: 'PPhNo', headerName: 'Phone Number', width: 150 },
//     { field: 'PGender', headerName: 'Gender', width: 100 },
//   ];
  

//   const rows = [
//     { id: 1, PID: 1, PName: 'Jon Snow', PAddr: 'Winterfell, North', PPhNo: '9876543210', PGender: 'Male' },
//     { id: 2, PID: 2, PName: 'Arya Stark', PAddr: 'Braavos, Free Cities', PPhNo: '9823456789', PGender: 'Female' },
//     { id: 3, PID: 3, PName: 'Daenerys Targaryen', PAddr: 'Dragonstone', PPhNo: '9812345678', PGender: 'Female' },
//     { id: 4, PID: 4, PName: 'Tyrion Lannister', PAddr: 'Casterly Rock', PPhNo: '9988776655', PGender: 'Male' },
//     { id: 5, PID: 5, PName: 'Brienne of Tarth', PAddr: 'Sapphire Isle', PPhNo: '9911223344', PGender: 'Female' },
//     { id: 6, PID: 6, PName: 'Samwell Tarly', PAddr: 'Horn Hill', PPhNo: '9876123450', PGender: 'Male' },
//     { id: 7, PID: 7, PName: 'Sansa Stark', PAddr: 'Winterfell', PPhNo: '9845612398', PGender: 'Female' },
//     { id: 8, PID: 8, PName: 'Jorah Mormont', PAddr: 'Bear Island', PPhNo: '9798451230', PGender: 'Male' },
//     { id: 9, PID: 9, PName: 'Ygritte', PAddr: 'Beyond the Wall', PPhNo: '9734567890', PGender: 'Female' },
//   ];
  

// export default function DataGridExample() {
//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'PID', headerName: 'PID', width: 90 },
  { field: 'PName', headerName: 'Name', width: 150 },
  { field: 'PAddr', headerName: 'Address', width: 200 },
  { field: 'PPhNo', headerName: 'Phone Number', width: 150 },
  { field: 'PGender', headerName: 'Gender', width: 100 },
];

const rows = [
  { id: 1, PID: 1, PName: 'Jon Snow', PAddr: 'Winterfell, North', PPhNo: '9876543210', PGender: 'Male' },
  { id: 2, PID: 2, PName: 'Arya Stark', PAddr: 'Braavos, Free Cities', PPhNo: '9823456789', PGender: 'Female' },
  { id: 3, PID: 3, PName: 'Daenerys Targaryen', PAddr: 'Dragonstone', PPhNo: '9812345678', PGender: 'Female' },
  { id: 4, PID: 4, PName: 'Tyrion Lannister', PAddr: 'Casterly Rock', PPhNo: '9988776655', PGender: 'Male' },
  { id: 5, PID: 5, PName: 'Brienne of Tarth', PAddr: 'Sapphire Isle', PPhNo: '9911223344', PGender: 'Female' },
  { id: 6, PID: 6, PName: 'Samwell Tarly', PAddr: 'Horn Hill', PPhNo: '9876123450', PGender: 'Male' },
  { id: 7, PID: 7, PName: 'Sansa Stark', PAddr: 'Winterfell', PPhNo: '9845612398', PGender: 'Female' },
  { id: 8, PID: 8, PName: 'Jorah Mormont', PAddr: 'Bear Island', PPhNo: '9798451230', PGender: 'Male' },
  { id: 9, PID: 9, PName: 'Ygritte', PAddr: 'Beyond the Wall', PPhNo: '9734567890', PGender: 'Female' },
];

export default function DataGridExample() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          border: 2,
          borderColor: '#1976d2',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1976d2',
            color: 'white',
            fontSize: 16,
          },
          '& .MuiDataGrid-cell': {
            color: '#333',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e3f2fd',
          },
          '& .Mui-selected': {
            backgroundColor: '#bbdefb !important',
          },
        }}
      />
    </Box>
  );
}

