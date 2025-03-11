
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
import PaymentsIcon from '@mui/icons-material/Payments';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Expense from './pages/Expense';
import Inflow from './pages/Inflow';
import Home from './pages/Home';


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
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2', // Your light theme primary color
        },
        secondary: {
          main: '#9c27b0', // Your light theme secondary color
        },
        background: {
          default: '#f5f5f5', // Your light theme background color
          paper: '#f5f6fa', // Your light theme paper background color
        },
        text: {
          primary: '#333333', // Your light theme text color
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9', // Your dark theme primary color
        },
        secondary: {
          main: '#ce93d8', // Your dark theme secondary color
        },
        background: {
          default: '#05070a', // Your dark theme background color
          paper: '#111317', // Your dark theme paper background color
        },
        text: {
          primary: '#ffffff', // Your dark theme text color
        },
      },
    },
  },
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

  const router = useDemoRouter('/home');

  // Render the appropriate component based on the router's pathname
  const renderPage = () => {
    switch (router.pathname) {
      case '/expenses':
        return <Expense />;
      case '/inflow':
        return <Inflow />;
      case '/home':
        return <Home />;
      default:
        return <DemoPageContent pathname={router.pathname} />;
    }
  };



  return (
    <>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo:  <PaymentsIcon style={{marginTop:'25%',marginLeft: '50%',fill: 'var(--mui-palette-primary-main)'}}/>,
          title: <span style={{ marginLeft: '10%' }}>PersonalFinance</span>,
          homeUrl: '/home',
        }}
        router={router}
        theme={demoTheme}
        styles={{
          navigation: {
            width: '550px', // Set your desired width here (e.g., '250px', '20%', etc.)
          },
        }}
        
      >
        
        <DashboardLayout> 
          {renderPage()}
        </DashboardLayout>
      </AppProvider>
    </>
  )
}

export default App
