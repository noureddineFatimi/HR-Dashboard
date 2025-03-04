import React, { ReactNode, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../assets/Transition.css'

/*Fetch api.........*/

const FormCoor = () => {
  const {Matricule}=useParams()
  const [formData, setFormData] = useState<{ Retraite: string; Nom: string,/*...., ..... */ }>({ Retraite: '', Nom: '' });

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
        <label  style={{width:"30%"}} htmlFor="Retarite">Adresse</label>
        <input  style={{width:"100%"}} type="text" autoFocus placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Lieu de Naissance</label>
        <input  style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Quartier</label>
        <input  style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Commune </label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Code Postal</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Ville </label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Numéro de Téléphone Pérsonnel (e.g, 00212611223344)</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}> 
        <label  style={{width:"30%"}} htmlFor="Retarite">Numéro de Téléphone Profesionnel (e.g, 00212611223344)</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Email</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
        <button type="submit">Modifier</button>

    </form></div>
  )

}

export default FormCoor