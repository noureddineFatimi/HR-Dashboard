import {AppBar, Toolbar, Typography} from "@mui/material"
import sizeConfigs from "../../configs/sizeConfigs"
import colorConfigs from "../../configs/colorConfig"
import assets from "../../assets"
import styles from "../../configs/Font.module.css"
import { useEffect, useRef, useState } from "react"

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <AppBar
    position="fixed"
    sx={{
      width:`calc(100% - ${sizeConfigs.sidebar.width})`,
      ml: sizeConfigs.sidebar.width,
      boxShadow:'unset',
      backgroundColor:'#fff',
      borderBottom:"2px solid #f4f4fc"
    }}
    >
      <Toolbar>
<div style={
  {
    width:"100%",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  }



}>
        <div style={{width:"1rem"}}></div>
        <img width='80px' height='auto' src={assets.images.logoAuto}  />
        
        <div style={{position:"relative",display:"inline-block"}}  ref={dropdownRef}>
          <div onClick={toggleDropdown} className={styles.home} style={{display:"flex",alignItems:"center", gap:"2px"}} ><img src={assets.images.flèche} width='10px' height='auto' style={{transform:"rotate(90deg)"}}/>
<img src={assets.images.profil} width="20px"  height="auto"/></div>

<div>
{isOpen && (
        <div style={{
          display:"block",
          position: "absolute",
          right:"0",
          zIndex:"1",
          padding:"10px",
          top:"1.5rem",
          borderRadius:"4px",
          backgroundColor:"#d3d3d3"
        }}>
          <button className="dropdown-item " style={{color:"white",backgroundColor:"red",borderRadius:"5px",fontFamily:"Regular",border:'1px solid gray'}} onClick={handleLogout}>Déconnexion</button>
        </div>
      )}


</div>

        </div>
       








        </div>
      </Toolbar>
      </AppBar>
  )
}

export default Topbar