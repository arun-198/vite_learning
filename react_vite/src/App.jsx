
// import './App.css'
// import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
// import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Expense from './pages/Expense';
import Inflow from './pages/Inflow';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <DescriptionIcon />,
  },
  {
    segment: 'expenses',
    title: 'Expense',
    icon: <AddIcon />,
  },
  {
    segment: 'inflow',
    title: 'Inflow',
    icon: <AttachMoneyIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <BarChartIcon />,
    
  },
  
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function App() {

  const router = useDemoRouter('/dashboard');

  // Render the appropriate component based on the router's pathname
  const renderPage = () => {
    switch (router.pathname) {
      case '/expenses':
        return <Expense />;
      case '/inflow':
        return <Inflow />;
      default:
        return <DemoPageContent pathname={router.pathname} />;
    }
  };



  return (
    <>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo:  <AccountBalanceIcon style={{marginTop:'25%',marginLeft: '50%',fill: 'var(--mui-palette-primary-main)'}}/>,
          title: <span style={{ marginLeft: '10%' }}>Finance Tracker</span>,
          homeUrl: '/home',
        }}
        router={router}
        theme={demoTheme}
      >
        
        <DashboardLayout> 
          {renderPage()}
        </DashboardLayout>
      </AppProvider>
    </>
  )
}

export default App
