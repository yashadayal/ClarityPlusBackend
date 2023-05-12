import logo from './logo.svg';
import './App.css';
import { Routes, BrowserRouter,Route } from 'react-router-dom';
import { createTheme, ThemeProvider} from '@mui/material';
import UserFormPage from './components/UserFormPage';
import GuardAddOrderPage from './components/GuardAddOrderPage';
import Footer from './components/Footer';
import GuardLandingPage from './components/GuardLandingPage';
import GuardSearchPage from './components/GuardSearchPage';
import SearchLogByDate from './components/SearchLogByDate';
import Login from './components/Login';


export const theme = createTheme({
  palette: {
   primary:{
     main: '#01579b',
   },
   secondary:{
     main: '#b3e5fc',
   },
   alternate:{
     main: '#81d4fa',
   },
   text:{
     secondary: '#212121',   
   }
  }, 
  typography: {
     fontFamily: "Brygada 1918",
     fontWeightLight: 400,
     fontWeightMedium: 600,
     fontWeightBold: 700,
     fontWeightRegular: 500
  }
})

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/userformpage' element={<UserFormPage/>}/>
        <Route exact path='/guardaddorderpage' element={<GuardAddOrderPage/>}/> 
        <Route exact path='/searchInstituteID' element={<GuardSearchPage/>}/>
        <Route exact path='/guardlandingpage' element={<GuardLandingPage/>}/>
        <Route exact path='/searchlogs' element={<SearchLogByDate/>}/>
      </Routes>
    </BrowserRouter>
    {/* <Footer/> */}
    </>
  );
}

export default App;
