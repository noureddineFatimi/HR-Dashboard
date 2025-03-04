import { useEffect, useState } from "react"
import { RouteType } from "../../routes/config"
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import colorConfigs from "../../configs/colorConfig"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SidebarItem from "./Sidebaritem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "../../configs/Font.module.css"
type Props = {
    item:RouteType
}

const SideBarItemCollapse = ({item}: Props) => {
    const [open,setOpen]= useState(false)
    
    const {appState}= useSelector((state:RootState)=> state.appState);

    const isChildSelected = item.child?.some(route => route.state === appState);

  useEffect(()=> {
    if(appState.includes(item.state) || isChildSelected){
        setOpen(true)
    }
  },[appState,item,isChildSelected])
  
  
    return (
    item.sidebarProps ? (<><div style={{display:"flex",alignItems:"center"}}><ListItemButton
        onClick={()=> setOpen(!open)}
        sx={{"&: hover":{
            backgroundColor:colorConfigs.sidebar.hoverBg
        },
        backgroundColor: isChildSelected ? "white" : "unset",
        paddingY:"15px",
        paddingX:"20px",
        margin:"10px",
        marginTop:"20px",
        marginBottom:"0",
        borderRadius:"20px"
        }}>
        
        <ListItemIcon sx={{ color: isChildSelected ? "#000" : "#a8a8a8" }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}</ListItemIcon>
            
            <ListItemText
            disableTypography
            primary = {
                <div style={{color:isChildSelected ? "black" : "#a8a8a8",fontSize:"0.90rem"}} className={styles.Item}>
{item.sidebarProps.displayText}
                </div>
            }
            
            
            />
            
            
            {open ? <ExpandLessIcon sx={{color:isChildSelected ? "black" : "#a8a8a8"}}/> : <ExpandMoreIcon sx={{color:isChildSelected ? "black" : "#a8a8a8"}}/>}
            
            </ListItemButton>
            </div>
            
            <Collapse in={open} timeout="auto">
            <List>
           { item.child?.map((route,index)=> (
                            route.sidebarProps ? (
                             route.child ?(
                                <SideBarItemCollapse item={route} key ={index}/>

                             ) : (
                                <SidebarItem item={route} key={index}/>
                             )  
                            ):null
                        ))
                    }



            </List>
            
            
            
            </Collapse>


            
            
            
            </>


    ) : null
  )
}

export default SideBarItemCollapse