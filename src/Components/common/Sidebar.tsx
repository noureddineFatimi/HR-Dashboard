import { Avatar, Drawer, List, ListItemButton, ListItemIcon, Stack, Toolbar } from "@mui/material"
import sizeConfigs from "../../configs/sizeConfigs"
import colorConfigs from "../../configs/colorConfig"
import assets from "../../assets"
import appRoutes
 from "../../routes/appRoutes"
import SidebarItem from "./Sidebaritem"
import SideBarItemCollapse from "./SideBarItemCollapse"
import styles from  '../../configs/Font.module.css'
import { Link } from "react-router-dom"

const Sidebar = () => {
    
    return (
        <Drawer 
        variant="permanent"
        sx={{
            width:sizeConfigs.sidebar.width,
            flexShrink: 0,
            "& .MuiDrawer-paper":{
                width:sizeConfigs.sidebar.width,
                boxSizing:"border-box",
                borderRight:"0px",
                backgroundColor:colorConfigs.sidebar.bg
            } 
        }}>
            <List disablePadding>
                <Toolbar sx={{marginBottom:"20px"
                ,borderBottom:"1px solid"
                    ,borderImage:"linear-gradient(to right, white, grey, white) 1"
                    
                }}>
                    <Stack 
                    sx={{width:"100%",
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center",
                    gap:"12px"}}>
                        
                        <Link to="/"><img width="40px" height="auto" src={assets.images.logo}className={styles.home}/></Link>
                        <div className={styles.TableauDeBord}><Link to="/" style={{ color: 'inherit', textDecoration: 'inherit', fontSize:"20px"}} className={styles.home}>Tableau de bord</Link></div>
                    </Stack>
                    
                </Toolbar>
                        {appRoutes.map((route,index)=> (
                            route.sidebarProps ? (
                             route.child ?(
                                <SideBarItemCollapse item={route} key ={index}/>

                             ) : (
                                <SidebarItem item={route} key={index}/>
                             )  
                            ):null
                        ))}

                           

            </List>

        </Drawer>
    )
}

export default Sidebar