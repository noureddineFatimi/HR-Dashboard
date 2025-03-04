import { useParams } from "react-router-dom"
import style from '../../configs/Font.module.css'
import React, { useEffect } from "react";
import axiosInstance from "../../configs/sessionConfig";

interface Employe {
  [key: string]: any | null;
}

const InfoDetail = ()=> {
  useEffect(() => {
    Req()
    
  }, [])
  const [dataObject, setdataObject] = React.useState<Employe>({});

  const Req = async () => {
    try {
      const response = await axiosInstance.get<Employe>(`https://localhost:7113/api/Employee/${Matricule}`);
      
      const tableau = response.data;
      
      setdataObject(tableau);
     
    } catch (error) {
      console.error("Error: " + error);
    }
  };
  const {Matricule}=useParams()
  const retraite = (retraite:boolean)=>{
    if(retraite === true) {return 'Oui'}
    else {if(retraite===false) {return 'Non'}
          else return 'Non déclaré'}
  }
  const AffecDate = (Variable: string)=>{
    const date= new Date(Variable).toLocaleDateString() ;
    return date
  };
  const code = (numero:string)=>{
  if(numero === null) {return 'Non déclaré'}
  else return numero
  }
  
    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"start",gap:"12px",marginTop:"15px", padding:"0.7rem"}}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}} className={style.SemiBold} >Retraite: </div> <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}} className={style.Regular}>{retraite(dataObject?.retraite) }</div>
        </div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}} className={style.SemiBold}>Nom: </div>
        <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}} className={style.Regular}>{dataObject?.nom}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}} className={style.SemiBold}>Prénom: </div>
        <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}} className={style.Regular}>{dataObject?.prenom}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}} className={style.SemiBold}>Date de naissance: </div>
        <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}} className={style.Regular}>{AffecDate(dataObject?.date_naissance)}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}} className={style.SemiBold}>CIN: </div>
        <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}} className={style.Regular}>{dataObject?.cin}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}} className={style.SemiBold}>Sexe: </div>
        <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}} className={style.Regular}>{dataObject?.sexe}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}} className={style.SemiBold}> Situation familiale: </div>
        <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}} className={style.Regular}>{dataObject?.situationFamiliale}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}} className={style.SemiBold}>Nombre d'enfant: </div>
        <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}} className={style.Regular}>{dataObject?.nombreEnfant}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}}className={style.SemiBold}>CIMR </div>
        <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}}className={style.Regular}>{code(dataObject?.cimr)}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw",fontSize:"0.8rem"}}className={style.SemiBold}>CNSS </div>
        <div style={{width:"30vw",textAlign:"center",fontSize:"0.9rem"}}className={style.Regular}>{code(dataObject?.cnss)}</div></div>
      </div>
    )
}
export default InfoDetail
