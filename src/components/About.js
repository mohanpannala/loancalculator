// import React from 'react';
// import { Container, Typography, Box } from '@mui/material';

// const About = () => (
//   <Container maxWidth="md">
//     <Box mt={4}>
//       <Typography variant="h4" gutterBottom>About This App</Typography>
//       <Typography>
//         This Loan EMI Calculator helps users estimate their monthly payments on a loan.
//         It also converts EMI into other currencies and provides an amortization schedule
//         for easy understanding of how the loan gets repaid over time.
//       </Typography>
//     </Box>
//   </Container>
// );

// export default About;
import React from 'react';
import './About.css';

const About = () => (
  <div className="about-container">
    <div className="about-box">
      <h1 className="about-title">About This App</h1>
      <p className="about-text">
        This Loan EMI Calculator helps users estimate their monthly payments on a loan.
        It also converts EMI into other currencies and provides an amortization schedule
        for easy understanding of how the loan gets repaid over time.
      </p>
    </div>
  </div>
);

export default About;
