import React, { useEffect } from "react";
import { useParams } from "react-router-dom"
import axiosInstance from "../../configs/sessionConfig";
import axios from "axios";


interface CC {
  [key: string]: any | null;
}




const InfoCoor = ()=> {
  const {Matricule}=useParams()
  useEffect(() => {
    Req()
    
  }, [])
  const [dataObject, setdataObject] = React.useState<CC>({});
  const [idVille,setIdVille]= React.useState<number>()
  const [ville,setVille]=React.useState<string>()

  const inexString = (info:string)=>{
    if(info === '') {return 'Information manquante'}
    else return info
  }
  
  const inexNumber = (info:number)=>{
    if(info === null) {return 'Information manquante'}
    else return info
  }

  const Req = async () => {
    try {
      const response = await axiosInstance.get<CC>(`https://localhost:7113/api/CoordonneesContacts/GetCoordonneesContactByMatricule/${Matricule}`)
    
      const tableau = response.data;
    
      setIdVille(tableau.idVille)
      const id= tableau.idVille
      setdataObject(tableau);
      
      const resp = await axios.get<CC>(`https://localhost:7113/api/Villes/${id}`)
      setVille(resp.data.ville)
      
    } catch (error) {
      console.error("Error: " + error);
    }
  };

    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"start",gap:"12px",marginTop:"15px", padding:"0.7rem"}}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw"}} >Adresse: </div> <div style={{width:"30vw",textAlign:"center"}}>{inexString(dataObject?.adresse)}</div>
        </div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw"}} >Lieu de Naissance: </div> <div style={{width:"30vw",textAlign:"center"}}>{inexString(dataObject?.lieuDeNaissance)}</div>
        </div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw"}}>Quartier: </div>
        <div style={{width:"30vw",textAlign:"center"}}>{inexString(dataObject?.quartier)}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw"}}>Commune: </div>
        <div style={{width:"30vw",textAlign:"center"}}>{inexString(dataObject?.commune)}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw"}}>Code Postal: </div>
        <div style={{width:"30vw",textAlign:"center"}}>{inexNumber(dataObject?.codePostal)}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw"}}>Ville: </div>
        <div style={{width:"30vw",textAlign:"center"}}>{ville}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw"}}>Numéro de Téléphone Pérsonnel:</div>
        <div style={{width:"30vw",textAlign:"center"}}>{inexString(dataObject?.numTelephonePerson)}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw"}}>Numéro de Téléphone Profesionnel: </div>
        <div style={{width:"30vw",textAlign:"center"}}>{inexString(dataObject?.numTelephonePro)}</div></div>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}><div style={{width:"20vw"}}>Email: </div>
        <div style={{width:"30vw",textAlign:"center"}}>{inexString(dataObject?.email)}</div></div>
      </div>
    )
}
export default InfoCoor
