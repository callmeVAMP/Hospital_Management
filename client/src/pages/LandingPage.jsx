// import React from 'react';
// import { AppBar, Toolbar, Button, Typography, Box, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   header: {
//     backgroundColor: '#0D47A1',
//     color: 'white',
//   },
//   logo: {
//     marginRight: theme.spacing(2),
//     fontWeight: 'bold',
//     fontSize: '24px',
//   },
//   menuButton: {
//     marginLeft: 'auto',
//     marginRight: theme.spacing(2),
//   },
//   banner: {
//     backgroundImage: 'url("https://www.example.com/hospital-banner.jpg")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     height: '500px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     textAlign: 'center',
//   },
//   bannerText: {
//     fontSize: '3rem',
//     fontWeight: 'bold',
//   },
//   sectionTitle: {
//     marginBottom: theme.spacing(3),
//     fontWeight: 'bold',
//     fontSize: '2rem',
//   },
//   card: {
//     maxWidth: 345,
//   },
// }));

// function LandingPage() {
//   const classes = useStyles();

//   return (
//     <div>
//       {/* App Bar */}
//       <AppBar position="static" className={classes.header}>
//         <Toolbar>
//           <Typography variant="h6" className={classes.logo}>
//             HospitalName
//           </Typography>
//           <Button color="inherit" className={classes.menuButton}>
//             Home
//           </Button>
//           <Button color="inherit" className={classes.menuButton}>
//             About Us
//           </Button>
//           <Button color="inherit" className={classes.menuButton}>
//             Services
//           </Button>
//           <Button color="inherit" className={classes.menuButton}>
//             Contact Us
//           </Button>
//           <Button color="inherit" className={classes.menuButton}>
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Banner Section */}
//       <Box className={classes.banner}>
//         <Typography variant="h2" className={classes.bannerText}>
//           Welcome to HospitalName
//         </Typography>
//       </Box>

//       {/* About Us Section */}
//       <Container maxWidth="md">
//         <Typography variant="h4" className={classes.sectionTitle}>
//           About Us
//         </Typography>
//         <Typography paragraph>
//           HospitalName is a state-of-the-art healthcare provider offering exceptional services to patients. Our mission is to provide high-quality, compassionate care in a safe and comfortable environment.
//         </Typography>
//         <Typography paragraph>
//           We offer a wide range of services, from emergency care to specialized treatments, delivered by experienced medical professionals.
//         </Typography>
//       </Container>

//       {/* Services Section */}
//       <Container maxWidth="lg">
//         <Typography variant="h4" className={classes.sectionTitle}>
//           Our Services
//         </Typography>
//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card className={classes.card}>
//               <CardMedia
//                 component="img"
//                 alt="Emergency Services"
//                 height="140"
//                 image="https://www.example.com/emergency-service.jpg"
//               />
//               <CardContent>
//                 <Typography variant="h5" component="div">
//                   Emergency Services
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   We provide 24/7 emergency care, ensuring prompt and reliable treatment.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card className={classes.card}>
//               <CardMedia
//                 component="img"
//                 alt="Specialist Care"
//                 height="140"
//                 image="https://www.example.com/specialist-care.jpg"
//               />
//               <CardContent>
//                 <Typography variant="h5" component="div">
//                   Specialist Care
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Our specialists are experts in their fields, providing comprehensive care.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card className={classes.card}>
//               <CardMedia
//                 component="img"
//                 alt="Surgical Services"
//                 height="140"
//                 image="https://www.example.com/surgical-service.jpg"
//               />
//               <CardContent>
//                 <Typography variant="h5" component="div">
//                   Surgical Services
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Our advanced surgical procedures ensure the highest success rates and patient safety.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default LandingPage;
