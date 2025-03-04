import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

type Props = {
  idCarr:number
}

const CarrTableau = ({idCarr}: Props) => {
  /* api pour recupêre la carriere convenable ..... */
  const {Matricule}=useParams()
  const [formData, setFormData] = useState<{ fonction: string; datefin: Date/*.....,....,*/ }>({ fonction: '', datefin: new Date });

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
  return (
    <>
      <div style={{overflow:"hidden",padding:"1rem",paddingBottom:0}}> * Laisser les éléments non modifiés vides </div>
    <form  onSubmit={Soumission} style={{overflow:"hidden",padding:"1rem"}} >
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Fonction</label>
        <input  style={{width:"100%"}} type="text" autoFocus placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Catégorie</label>
        <input  style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Date d'affctation au poste</label>
        <input  style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Date du fin</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Supérieur Hiéararchique</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Département </label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
        <label  style={{width:"30%"}} htmlFor="Retarite">Service</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}> 
        <label  style={{width:"30%"}} htmlFor="Retarite">Ancienneté</label>
        <input style={{width:"100%"}} type="text" placeholder='000000' />
      </div>
      
        <button type="submit">Modifier</button>

    </form>
    
    
    
    
    </>
  )
}

export default CarrTableau