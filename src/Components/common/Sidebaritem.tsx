import { ListItemIcon,ListItemButton, List } from "@mui/material";
import { RouteType } from "../../routes/config";
import { Link } from "react-router-dom";
import colorConfigs from "../../configs/colorConfig";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import styles from '../../configs/Font.module.css'
type Props={
    item: RouteType;
};

const SidebarItem =({item}:Props)=>{
    const {appState}= useSelector((state: RootState)=>state.appState)
    return ( 
        item.sidebarProps && item.path ? (
            <ListItemButton component={Link}
            to={item.path} sx={{"&: hover":{
                backgroundColor:colorConfigs.sidebar.hoverBg
            },
            color: appState===item.state ? colorConfigs.sidebar.activeTypo: "#a8a8a8", 
            marginLeft:"1rem",
            marginRight:"1rem",
            borderRadius:"20px"
            
            }}>
            <ListItemIcon sx={{color: colorConfigs.sidebar.color,fontSize:"13px"}}>
                {item.sidebarProps.icon && item.sidebarProps.icon}</ListItemIcon><div style={{fontSize:"13px"}}className={styles.SousItems}><span >•</span>{item.sidebarProps.displayText}</div></ListItemButton>):null
                
    )
}
export default SidebarItem