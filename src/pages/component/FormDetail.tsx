import React, { ReactNode, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../assets/Transition.css'

/*Fetch api.........*/

const FormDetail = () => {
  const {Matricule}=useParams()
  const [formData, setFormData] = useState<{ Retraite: string; Nom: string }>({ Retraite: '', Nom: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Soumission = (e: React.FormEvent) => {
    e.preventDefault(); 
    const filledData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    ); 
/* l'api patcha avec filledData*/
   
  };

  return (<div>
  <div style={{overflow:"hidden",padding:"1rem",paddingBottom:0}}> * Laisser les éléments non modifiés vides </div>
    <form  onSubmit={Soumission} style={{overflow:"hidden",padding:"1rem"}} >
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Retarite</label>
        <input  style={{width:"100%"}} type="text" autoFocus placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Nom</label>
        <input  style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Prénom</label>
        <input  style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Date de naissance </label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">CIN</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Sexe </label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Situation Familiale</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}> 
        <label  style={{width:"30%"}} htmlFor="Retarite">Nombre d'enfants</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">CIMR</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">CNSS</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
        <button type="submit">Modifier</button>

    </form></div>
  )

}

export default FormDetail