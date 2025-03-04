import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CSSTransition } from 'react-transition-group';
import '../../assets/Transition.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CarrCarr from './CarrTableau';
import CarrTableau from './CarrTableau';
import style from '../../configs/Font.module.css'
import axiosInstance from '../../configs/sessionConfig';
import { table } from 'console';
import { blue } from '@mui/material/colors';


interface Diplôme {
  [key: string]: any
}

interface C {
  [key: string]: any | null;
}


const Diplôme = () => {

  React.useEffect( ()=>{
    Req()
  },[]
  )

  let idD:number| undefined = 0
  let Dip:string|undefined =''
  let idI:number|undefined=0
  let Instituion : string|undefined = ''
  const [IdDip,setIdDip]= React.useState<number>()
  const [ville,setVille]=React.useState<string>()
  const [tableauObjetsVilles, setTableauObjetsVilles] = React.useState<Diplôme>({});
  let TabD :Diplôme[] =[]
  let TabI : Diplôme[]=[]

const Req = async () => {
    try {
      const response = await axiosInstance.get<Diplôme>(`https://localhost:7113/api/ExperienceProfs/GetExperiencesByMatricule/${Matricule}`)
      const tableau = response.data;
     
      setDataObject(tableau);
     
    } catch (error) {
      console.error("Error: " + error);
    }
  };
  
 
  const TrierParAnnée = (tab:C[])=>{
    return tab.sort((a, b) => new Date(a.anneObtention).getTime() - new Date(b.anneObtention).getTime());
  }  

  const [dataObject, setDataObject] = React.useState<Diplôme>();
  const [tabTrié,SetTabTrié]=React.useState<C[]>()
  const[libDip,setLibDip]= React.useState<string>()
  const[libDCat,setLibCat]= React.useState<string>()
  const[libDep,setLibDep]= React.useState<string>()
  /*const[idDep,setIdDep]=React.useState<number>()
  const[idCat,setIdCat]=React.useState<number>()
  const[idRef,setIdRef]=React.useState<number>()*/
  

  const [formData,setFormData]=React.useState<C>({})

  const handleSelsect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }


  const ajouterLibDip = ()=>{
    setEtat("Ajou")
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Update= async (Data:Diplôme)=>{

   //Api de modification
  }

  const Add =async ()=>{
    //Api d'ajout
  }

  const Soumission = (e: React.FormEvent) => {
    e.preventDefault();
     Update(formData)
    //await
    setFormData({})
        
    
    setEtat('Aff')
  };
  const PageMod=useNavigate()
  const {Matricule}=useParams()

  const modifierCarr =()=>{
   setEtat("Mod")
  }

  const suppCarr = () => {
    const confirm = window.confirm("Cette opération est irréversible !");
    if (confirm) {
      setEtat("Supp");
    }
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const [idDip,setidDip]=React.useState<number>(-1)
 


  

  const afficherCarr =(id:number)=>{
    if(idDip === id) {
      setChecked(false)
      setidDip(-1)
      
    }
    else {
      setChecked(true)
      setidDip(id)
      
    }
  }
  const [etat,setEtat]=React.useState<'Aff' | 'Mod' | 'Supp' | 'Ajou'>("Aff")

  const [formAjout,setFormAjout]=React.useState<C>({})
  const inputAjout = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormAjout((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormAjout((prevData) => ({
      ...prevData,
      [name] : value,
    }));
  };

  


  const Ajouter = (e: React.FormEvent)=>{
    e.preventDefault(); 
    Add()
      
    /* l'api patcha avec formdData*/
    setidDip(-1)
    setEtat('Aff')
  }

  const afficherComp =()=> {
    
    switch (etat) {
      case 'Aff':

        return (
<>               <List className="timeline"sx={{ width: '100%', bgcolor: 'background.paper',padding:"1rem" , maxHeight:"40dvh",overflowY:"scroll"}}>
  
    <ListItem
    
        key={dataObject?.id}
        disableGutters
        className="timeline-item"
        secondaryAction={
          <IconButton onClick={()=>afficherCarr(dataObject?.id)} aria-label="info">
            <MoreHorizIcon />
          </IconButton>
        }
      >
        
        <ListItemText className={style.SemiBold} primary='Diplome 1 .2020' />
      </ListItem>)
    
    </List>
    <hr style={{margin:"1rem",color:'#a8a8a8'}}/>
    <CSSTransition 
        in={checked}
        timeout={300}
        classNames="table"
        
      >
    <div style={{padding:"1rem"}}>
      {AfficherCarr()}
    </div>
    
    </CSSTransition>
</>
        )
        break
      case 'Mod':
        return (
          <>
          <div style={{overflow:"hidden",padding:"1rem",paddingBottom:0}}> * Laisser les éléments non modifiés vides </div>
        <form  onSubmit={Soumission} style={{overflow:"hidden",padding:"1rem"}} >
        <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Date de saisie</label>
            <input  name="specialite" style={{width:"100%"}} type="text" placeholder="Information ici" onChange={handleChangeInput} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Profil</label>
            <input  name="specialite" style={{width:"100%"}} type="text" placeholder="Information ici" onChange={handleChangeInput} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Date d'affectation</label>
            <input  name="specialite" style={{width:"100%"}} type="text" placeholder="Information ici" onChange={handleChangeInput} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Date de départ</label>
            <input  name="specialite" style={{width:"100%"}} type="text" placeholder="Information ici" onChange={handleChangeInput} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Spécialité</label>
            <input  name="specialite" style={{width:"100%"}} type="text" placeholder="Information ici" onChange={handleChangeInput} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Fonction occupé</label>
            <input  name="specialite" style={{width:"100%"}} type="text" placeholder="Information ici" onChange={handleChangeInput} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Secteur d'activité</label>
            <input  name="specialite" style={{width:"100%"}} type="text" placeholder="Information ici" onChange={handleChangeInput} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Entreprise</label>
            <input  name="specialite" style={{width:"100%"}} type="text" placeholder="Information ici" onChange={handleChangeInput} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Nombre d'année d'expérience</label>
            <input  name="specialite" style={{width:"100%"}} type="text" placeholder="Information ici" onChange={handleChangeInput} />
          </div>
        
          <button type="submit" style={{width:"150px"}} className={style.boutton}>
        Modifier
    <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="#FFFFFF" height="24" width="24" viewBox="0 0 24 24">
    
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
    
</button>
    
        </form> 
        </>
        )
    break
    case 'Supp':
      /* Traitement*/
      setEtat("Aff");
      break;
    
    case 'Ajou':
      return (<>
        <form  onSubmit={Ajouter} style={{overflow:"hidden",padding:"1rem"}} >
          
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Date de saisie</label>
            <input  style={{width:"100%"}} name='specialite' type="text" required onChange={inputAjout} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Profil</label>
            <input  style={{width:"100%"}} name='anneeObtention' type="text" required onChange={inputAjout}/>
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Date d'entré</label>
            <input  style={{width:"100%"}} name='specialite' type="text" required onChange={inputAjout} />
          </div>
          
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Date de départ</label>
            <input  style={{width:"100%"}} name='specialite' type="text" required onChange={inputAjout} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Fonction occupé</label>
            <input  style={{width:"100%"}} name='anneeObtention' type="text" required onChange={inputAjout}/>
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Secteur d'activité</label>
            <input  style={{width:"100%"}} name='specialite' type="text" required onChange={inputAjout} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Entreprise</label>
            <input  style={{width:"100%"}} name='anneeObtention' type="text" required onChange={inputAjout}/>
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Nombre d'années d'expérience</label>
            <input  style={{width:"100%"}} name='specialite' type="text" required onChange={inputAjout} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Nature d'expérience</label>
            <input  style={{width:"100%"}} name='anneeObtention' type="text" required onChange={inputAjout}/>
          </div>
         
         
         
          <button type="submit" style={{width:"150px"}}  onClick={Add} className={style.boutton}>
        Ajouter
    <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="blue" height="24" viewBox="0 0 24 24"/>
    
        
    
    
</button>
        </form>
      </>)
      break
    }
  }

 


const AfficherCarr = ()=> {
 if(idDip !== -1) 
  {
    const enregistrement = tabTrié?.find(row => row.id === idDip)

  return  (<>
 
 <TableContainer component={Paper}>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell style={{ border: '1px solid black', width: '10%' }} align='center'  className={style.SemiBold}>Date de saisie</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align="center"  className={style.SemiBold}>Profil</TableCell>
        <TableCell style={{ border: '1px solid black', width: '20%' }} align="center"  className={style.SemiBold}>Date d'entré</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align="center"  className={style.SemiBold}>Date de départ</TableCell>
        <TableCell style={{ border: '1px solid black', width: '10%' }} align='center'  className={style.SemiBold}>Fonction occupé</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align="center"  className={style.SemiBold}>Secteur d'activité</TableCell>
        <TableCell style={{ border: '1px solid black', width: '20%' }} align="center"  className={style.SemiBold}>Entreprise</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align="center"  className={style.SemiBold}>Nombre d'années d'expérience</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align="center"  className={style.SemiBold}>Nature d'expérience</TableCell>
        
      </TableRow>
    </TableHead>
    <TableBody>
     
        <TableRow>
          <TableCell style={{ border: '1px solid black' }}className={style.Regular} align="center">{Dip}</TableCell>
          <TableCell style={{ border: '1px solid black' }} className={style.Regular}align="center">"Information ici"</TableCell>
          <TableCell style={{ border: '1px solid black' }}className={style.Regular} align="center">{dataObject?.anneeObtention}</TableCell>
          <TableCell style={{ border: '1px solid black' }} className={style.Regular}align="center">{Instituion}</TableCell>
          
        
        </TableRow>
      
    </TableBody>
  </Table>
</TableContainer>

<div style={{display:'flex',gap:"1rem",justifyContent:'flex-end',margin:"1.2rem"}}>
      <button onClick={modifierCarr}  className ={style.Reguley} style={{backgroundColor:"#000", borderRadius:"20px",color:"white",padding:"1rem",}} >Modifier</button>
      <button onClick={suppCarr} className ={style.Reguley} style={{backgroundColor:"red", borderRadius:"20px",color:"white",padding:"1rem",}} >Supprimer</button>
      </div>
     
  </>)
 }
}

React.useEffect(()=>{




  const savedState = sessionStorage.getItem('idDip');
  if (savedState) {
    const idDip=Number(savedState)
    setidDip(idDip); 
}

}

,[])





React.useEffect(() => {
  
    const idDipstring=idDip.toString()
    sessionStorage.setItem('idDip',idDipstring)
  
}, [idDip])



  return (
    <div>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid black',
      padding: '1rem',
      marginBottom:"0.5rem"
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{cursor:"pointer"}}  className={style.Regular} onClick={()=>{setEtat('Aff');setidDip(-1)}}>Diplôme</div>
        {libDip ? (
  <>
    <KeyboardArrowRightIcon />
    <div style={{ cursor: "pointer" }} onClick={() => setEtat("Aff")}>
      {libDip}
    </div>
    {etat === 'Mod' ? (
      <>
        <KeyboardArrowRightIcon />
        <div className={style.Regular}  >Modifier</div>
      </>
    ) : null}
  </>
) : null}
{etat === 'Ajou' ? (<><KeyboardArrowRightIcon/><div className={style.Regular} >Ajouter</div></>): null}
        
        </div>
      
        


    
<button style={{display:etat !=='Ajou' ? 'block': 'none'}} onClick={ajouterLibDip} className={style.addbutton}>
  <span className={style.button__text}>Ajouter un Diplôme</span>
 
</button>

    </div>
   {afficherComp()}
    
    </div>)

}
export default Diplôme