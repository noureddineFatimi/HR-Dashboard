import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import InfoCoor from './InfoCoor';
import FormCoor from './FormCoor';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../assets/Transition.css'
import axiosInstance from '../../configs/sessionConfig';
import { stringify } from 'querystring';
import style from '../../configs/Font.module.css'

interface CC {
    [key: string]: any | null;
  }

const Detail = ()=>{
  let id:number| undefined = 0
  let city:string|undefined =''
  const [dataObject, setdataObject] = React.useState<CC>({});
  const [idVille,setIdVille]= React.useState<number>()
  const [ville,setVille]=React.useState<string>()
  const [tableauObjetsVilles, setTableauObjetsVilles] = React.useState<CC>({});

const Req = async () => {
    try {
      const response = await axiosInstance.get<CC>(`https://localhost:7113/api/CoordonneesContacts/GetCoordonneesContactByMatricule/${Matricule}`)
      const tableau = response.data;
      
      setIdVille(tableau.idVille)
      id =tableau.idVille
      setdataObject(tableau);
      const resp = await axiosInstance.get<CC>(`https://localhost:7113/api/Villes/${id}`)
      setVille(resp.data.Ville)
      city=ville
      const responseVille= await axiosInstance.get<CC[]>('https://localhost:7113/api/Villes')
      setTableauObjetsVilles(responseVille.data)
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  const inexString = (info:string)=>{
    if(info === '') {return 'Information manquante'}
    else return info
  }
  
  const inexNumber = (info:number)=>{
    if(info === null) {return 'Information manquante'}
    else{
      const str=`${info}`
      return str
    }
  }


const [status,setStatus]=useState<number>(-1)
  

  const {Matricule}=useParams()
 

  const [mode,setMode]=useState('InfoCoor')
  const changerMode=()=>{
    mode ==='InfoCoor' ? setMode('Modification') : setMode("InfoCoor")
  }
  const afficherInfos = () => {
    if (mode !== 'InfoCoor') {
      setMode('InfoCoor');
      contenu()
    }
  }

  
  const [formData, setFormData] = useState<CC>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
/*{tableauObjetsVilles.map((villeObject:CC)=>{
          return <option value={villeObject.idVille} selected={villeObject.Ville===ville ? true : false }>{villeObject.Ville}</option>
        })} */
  const Update= async (Data:CC)=>{

    try{
      const response = await axiosInstance.put(`https://localhost:7113/api/CoordonneesContacts/${Matricule}`,{matricule:Matricule,retraite:true,...Data})
      const code=response.status
      setStatus(code)
      
      
    }catch(error){
      console.error("Erreur:" + error)
  
    }
  }

  const handleSelsect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }
  const Soumission = async (e: React.FormEvent) => {
    e.preventDefault(); 
    await Update(formData)
    //await
    setFormData({})
    id=idVille
    /*ALERT AFFICCHAGE*/
   
   setMode('InfoCoor')
  };

const contenu = ()=>{
  switch (mode) {
  case 'InfoCoor':
    
    return <InfoCoor/>
    break

  default:
    return (<div>
      <div style={{overflow:"hidden",padding:"1rem",paddingBottom:0}}> * Laisser les éléments non modifiés vides </div>
        <form  onSubmit={Soumission} style={{overflow:"hidden",padding:"1rem"}} >
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite">Adresse</label>
            <input  style={{width:"100%"}} type="text" autoFocus name="adresse" onChange={handleChange} placeholder={inexString(dataObject?.adresse)} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite">Lieu de Naissance</label>
            <input  style={{width:"100%"}} type="text" name= "lieuDeNaissance" onChange={handleChange} placeholder={inexString(dataObject?.lieuDeNaissance)} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite">Quartier</label>
            <input  style={{width:"100%"}} type="text" name="quartier" onChange={handleChange} placeholder={inexString(dataObject?.quartier)} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite">Commune </label>
            <input style={{width:"100%"}} type="text" name='commune' onChange={handleChange} placeholder={inexString(dataObject?.commune)} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite">Code Postal</label>
            <input style={{width:"100%"}} type="text" name='codePostal' onChange={handleChange} placeholder={inexNumber(dataObject?.codePostal)}/>
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite">Ville </label>
            
        <select name="idVille" onChange={handleSelsect} style={{width:"100%",fontSize:"0.9rem"}} >
        {tableauObjetsVilles.map((villeObject:CC)=>{
          return <option value={villeObject.idVille} selected={villeObject.idVille===idVille ? true : false }>{villeObject.ville}</option>
        })}
          </select>
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite">Numéro de Téléphone Pérsonnel (e.g, 00212611223344)</label>
            <input style={{width:"100%"}} type="text" name='numTelephonePerson' onChange={handleChange} placeholder={inexString(dataObject?.numTelephonePerson)} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}> 
            <label  style={{width:"30%"}} htmlFor="Retarite">Numéro de Téléphone Profesionnel (e.g, 00212611223344)</label>
            <input style={{width:"100%"}} type="text" name = 'numTelephonePro' onChange={handleChange} placeholder={inexString(dataObject?.numTelephonePro)} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite">Email</label>
            <input style={{width:"100%"}} type="text" name='email' onChange={handleChange} placeholder={inexString(dataObject?.email)} />
          </div>
          <button type="submit" style={{width:"150px"}} className={style.boutton}>
        Modifier
    <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="#FFFFFF" height="24" width="24" viewBox="0 0 24 24">
    
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
    
</button>
    
        </form></div>)
        break
    
}}

useEffect(() => {
  Req()
  
}, [])
  
  return <>
   <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid black',
      padding: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{cursor:"pointer"}} className={style.Regular} onClick={afficherInfos} >Coordonnées & Contact</div> <KeyboardArrowRightIcon sx={{color: mode !== 'InfoCoor' ? 'black' : "#a8a8a8"}}/> <span style={{ marginLeft: '0.5rem',color: mode !== 'InfoCoor' ? 'black' : "#a8a8a8" }} className={style.Regular} >Modifier</span>
      </div>
    </div>
 <div style={{overflow:"hidden"}}>
   
          <div style={{height:"100%"}}>
          {contenu()}
          </div>
       
      </div>
  <button onClick={changerMode} style={{display:mode ==='InfoCoor' ? 'block': 'none',margin:"1rem"}} className={`${style.Btn} ${style.Regular}`}>Mode modification
  <svg viewBox="0 0 512 512" className={style.svg}>
    <path
      d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
    ></path>
  </svg></button>
  </>
}
export default Detail