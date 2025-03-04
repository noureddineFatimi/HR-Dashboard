import sizeConfigs from "../../configs/sizeConfigs"
import {Box, Toolbar} from '@mui/material'
import Topbar from '../common/Topbar'
import Sidebar from "../common/Sidebar"
import { matchPath, Outlet, useLocation } from "react-router-dom"
import colorConfigs from "../../configs/colorConfig"

const MainLayout = () => {
  const location=useLocation()
  const noPaddingRoutes=['/Employ%C3%A9s/:Matricule']
  const isNoPadding = noPaddingRoutes.some((pattern) =>
    matchPath(pattern, location.pathname)
  
  );
  
  return (
    <Box sx={{ display : "flex",flexDirection:"row" }}>
    <Topbar/>
      <Box
      component="nav"
      sx={{
        width:sizeConfigs.sidebar.width,
        flexShrink:0
      }}>
        <Sidebar/>
        </Box>
        <Box 
        component="main"
        sx={{
          flexGrow:1,
          p: 0, //isNoPadding ? 0 : 3,
          width: `calc (100% - ${sizeConfigs.sidebar.width})`,
          minHeight:"100vh",
          backgroundColor:colorConfigs.mainBg
        }}>
          <Toolbar/>
          <Outlet/>
        </Box>
    </Box>
  )
}
export default MainLayout