import React, { SelectHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import InfoDetail from './InfoDetail';
import FormDetail from './FormDetail';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../assets/Transition.css'
import style from '../../configs/Font.module.css'
import axiosInstance from '../../configs/sessionConfig';

interface Employe {
  [key: string]: any | null;
}
const Detail = ()=>{
  


  const [status,setStatus]=useState<number>()

  useEffect(() => {
    Req()
    
  }, [])

  const [dataObject, setdataObject] = React.useState<Employe>();
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
  const boutton=useRef<HTMLButtonElement>

  
  const [mode,setMode]=useState('InfosDétail')
  const changerMode=()=>{
    mode ==='InfosDétail' ? setMode('Modification') : setMode("InfosDétail")
  }
  const afficherInfos = () => {
    if (mode !== 'InfosDétail') {
      setMode('InfosDétail');
      contenu()
    }
  }
  const retraiteDeafault= dataObject?.retraite === null ? 'Non déclaré' : dataObject?.retraite === true ? "Oui" : "Non"

  const [formData, setFormData] = useState<Employe>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelsect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
      let Bvalue=false
     
      if(value === 'true'){
        Bvalue = true
      }
      else {
        Bvalue=false
      }
      
  
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Soumission = (e: React.FormEvent) => {
    e.preventDefault(); 
   /* const filledData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '') 
     
    ) as Employe */

    Update(formData)
    console.log(formData)
    if(status===201){alert("Modifications enregistrées")}
    setFormData({})
setMode('InfosDétail')
  };
  const AffecDate = (Variable: string)=>{
    const date= new Date(Variable).toLocaleDateString() ;
    return date
  };
  const code = (numero:string)=>{
    if(numero === null) {return 'Non déclaré'}
    else return numero
    }
    const retraite = (retraite:string)=>{
      if(retraite=='true') {return 'Oui'}
      else {if(retraite=='false') {return 'Non'}
            else return 'Non déclaré'}
    }

    const selectT = () => {
      return dataObject?.retraite === true ? 'selected' : '';
    };
  
    const selectF = () => {
      return dataObject?.retraite === false ? 'selected' : '';
    };

 
const contenu = ()=>{
  switch (mode) {
  case 'InfosDétail':
    return <InfoDetail/>

  default:
    return (
      <div>
  <div style={{overflow:"hidden",padding:"1rem",paddingBottom:0,fontSize:"0.69rem",fontWeight:"bold",color:"gray"}} className={style.Italic}> * Laisser les éléments non modifiés vides </div>
    <form  onSubmit={Soumission} style={{overflow:"hidden",padding:"1rem"}} >
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold} >Retraite</label>
       
        <select name="retraite" id="retraite" style={{width:"100%",fontSize:"0.9rem"}} className={style.Regular} onChange={handleSelsect}>
        <option value="true" selected={selectT() === 'selected'} >Oui</option>
        <option value="false" selected={selectF() === 'selected'} >Non</option>
          </select>
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold} >Nom</label>
        <input style={{width:"100%",fontSize:"0.9rem"}} disabled type="text" className={style.Regular} placeholder={dataObject?.nom} />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold} >Prénom</label>
        <input style={{width:"100%",fontSize:"0.9rem"}} disabled type="text" className={style.Regular} placeholder={dataObject?.prenom} />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold} >Date de naissance </label>
        <input style={{width:"100%",fontSize:"0.9rem"}} type="text" disabled className={style.Regular} placeholder={AffecDate(dataObject?.date_naissance)} />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold} >CIN</label>
        <input style={{width:"100%",fontSize:"0.9rem"}} type="text" disabled className={style.Regular} placeholder={code(dataObject?.cin)} />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold} >Sexe </label>
        <input style={{width:"100%",fontSize:"0.9rem"}} type="text" disabled className={style.Regular} placeholder={dataObject?.sexe} />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold} >Situation Familiale</label>
        <input style={{width:"100%",fontSize:"0.9rem"}} name="situationFamiliale"  onChange={handleChange} type="text" className={style.Regular} placeholder={dataObject?.situationFamiliale} />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}> 
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold}>Nombre d'enfants</label>
        <input style={{width:"100%",fontSize:"0.9rem"}} name ="nombreEnfant" onChange={handleChange} type="text" className={style.Regular} placeholder={dataObject?.nombreEnfant} />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold} >CIMR</label>
        <input style={{width:"100%",fontSize:"0.9rem"}} type="text" name='cimr' onChange={handleChange} className={style.Regular} placeholder={code(dataObject?.cimr)} />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%",fontSize:"0.8rem"}} className={style.SemiBold} >CNSS</label>
        <input style={{width:"100%",fontSize:"0.9rem"}} type="text" name='cnss' onChange={handleChange} className={style.Regular} placeholder={code(dataObject?.cnss)} />
      </div>
        
        <button type="submit" style={{width:"150px"}} className={style.boutton}>
        Modifier
    <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="#FFFFFF" height="24" width="24" viewBox="0 0 24 24">
    
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
    
</button>

    </form></div>
    )
    break
    
}}













const Update= async (Data:Employe)=>{

  try{
    const response = await axiosInstance.put(`https://localhost:7113/api/Employee/modifier/${Matricule}`,{matricule:Matricule,retraite:true,...Data})
    const code=response.status
    setStatus(code)
    
    
  }catch(error){
    console.error("Erreur:" + error)

  }
}











  return <>
   <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid black',
      padding: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{cursor:"pointer"}} className={style.Regular} onClick={afficherInfos}>Détail</div> <KeyboardArrowRightIcon sx={{color: mode !== 'InfosDétail' ? 'black' : "#a8a8a8"}}/> <span style={{ marginLeft: '0.1rem',color: mode !== 'InfosDétail' ? 'black' : "#a8a8a8" }} className={style.Regular} >Modifier</span>
      </div>
    </div>
 <div style={{overflow:"hidden"}}>
   
          <div style={{height:"100%"}}>
          {contenu()}
          </div>
       
      </div>
  
  


  <button  onClick={changerMode} style={{display:mode ==='InfosDétail' ? 'block': 'none',margin:"1rem"}} className={`${style.Btn} ${style.Regular}`}>
  Mode modification
  <svg viewBox="0 0 512 512" className={style.svg}>
    <path
      d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
    ></path>
  </svg>
</button>





  </>
}

export default Detail