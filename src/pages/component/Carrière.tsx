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


interface Carrière {
  id: number
  fonction:string
  dateDebut: Date
  dateFin:Date
  service:string
  Categorie:string 
  SupHiear: string
  Dep:string 
  anciennité: string
}

interface C {
  [key: string]: any | null;
}


const Carrière = () => {
  

  const TrierParAnnée = (tab:C[])=>{
    return tab.sort((a, b) => new Date(a.dateAffPoste).getTime() - new Date(b.dateAffPoste).getTime());
  }

  React.useEffect(()=>{
    const Requete = async ()=>{
      await Req() 
    } 
    Requete()
  } ,[])

  const ServiceReq = async (idSer:number)=>{
    try {
    const respSer = await axiosInstance.get<C>(`https://localhost:7113/api/Services/${idSer}`)
    setLibSer(respSer.data.libelleDepartement)
    }catch(error){
      console.error(error)
    }
  }

  const [libSer,setLibSer]=React.useState<string>()

  const DepartementReq = async (idDep:number)=>{
    try {
    const respDep = await axiosInstance.get<C>(`https://localhost:7113/api/Departements/${idDep}`)
    setLibDep(respDep.data.libelleDepartement)
    }catch(error){
      console.error(error)
    }
  }

  const ReferenceReq = async (idRef:number)=>{
    try{
      const respRef = await axiosInstance.get<C>(`https://localhost:7113/api/References/${idRef}`)
    setLibFct(respRef.data.libelle)
    }catch(error){
      console.error(error)
    }
    
  }

  const CategorieReq = async (idCat:number)=>{
    try{const respCat = await axiosInstance.get<C>(`https://localhost:7113/api/Categorie/${idCat}`)
      setLibCat(respCat.data.categorieR)

    }catch(error){
      console.error(error)
    }
    
  } 

  const DataObj = async (tableau:C[])=>{
    setDataObject(tableau)
  }
  const Triage = async (tableau:C[])=>{
    const T=TrierParAnnée(tableau)
    console.log(T)
    SetTabTrié(T)
  }
  

  const Req = async () => {
    try {
      const response = await axiosInstance.get<C[]>(`https://localhost:7113/api/Affectations/GetAffectationByMatricule/${Matricule}`)
       const tableau = response.data
      
      await DataObj(tableau)
      if(dataObject!= undefined){
         await Triage(dataObject)
      }
      
    
     
     
    }catch (error){
      console.error("Error: " + error);
    }
  };
 
  

  const [dataObject, setDataObject] = React.useState<C[]>();
  const [tabTrié,SetTabTrié]=React.useState<C[]>()
  const[libFct,setLibFct]= React.useState<string>()
  const[libDCat,setLibCat]= React.useState<string>()
  const[libDep,setLibDep]= React.useState<string>()
  /*const[idDep,setIdDep]=React.useState<number>()
  const[idCat,setIdCat]=React.useState<number>()
  const[idRef,setIdRef]=React.useState<number>()*/
  

  const [formData,setFormData]=React.useState<C>({})



  const ajouterFonction = ()=>{
    setEtat("Ajou")
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const [idCarr,setIdCarr]=React.useState<number>(-1)
  const [fonction, setFonction] = React.useState<string | null>(null)


  /*fetch api ....*/
  const Data:Carrière[]=[
    /*async function fetch .....  */
    {id:1,fonction:"ingénieur",dateDebut: new Date('2004-05-08'),dateFin: new Date("2007-06-01"),Categorie:"Agnet de maitrise",SupHiear:"0000000",service:"SI",anciennité:"1 ans ",Dep:"Direction"},
    {id:2,fonction:"project manager",dateDebut: new Date('2004-05-08'),dateFin: new Date("2007-06-01"),Categorie:"Agnet de maitrise",SupHiear:"0000000",service:"SI",anciennité:"1 ans ",Dep:"Direction"},
    {id:3,fonction:"dire",dateDebut: new Date('2004-05-08'),dateFin: new Date("2007-06-01"),Categorie:"Agnet de maitrise",SupHiear:"0000000",service:"SI",anciennité:"1 ans ",Dep:"Direction"}
  ]

  const afficherCarr =(id:number)=>{
    if(idCarr === id) {
      setChecked(false)
      setIdCarr(-1)
      
    }
    else {
      setChecked(true)
      setIdCarr(id)
      
    }
  }
  const [etat,setEtat]=React.useState<'Aff' | 'Mod' | 'Supp' | 'Ajou'>("Aff")

const [formAjout,setFormAjout]=React.useState<Carrière>({
  id: Date.now(), //id temporaire
  fonction: '',
  dateDebut: new Date(),
  dateFin: new Date(),
  service: '',
  Categorie: '',
  SupHiear: '',
  Dep: '',
  anciennité: '',
});

  const inputAjout = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormAjout((prevData) => ({
      ...prevData,
      [name]: name.includes('date') ? new Date(value) : value,
    }));
  };


  const Ajouter = (e: React.FormEvent)=>{
    e.preventDefault(); 
    
        
    /* l'api patcha avec formdData*/
    setIdCarr(-1)
    setEtat('Aff')
  }

  const afficherComp =()=> {
    const A:C[]=[{idAffectation:3,idRef:2,dateAffPoste:"2020-06-03T00:00:00.00"},{idAffectation:3,idRef:2,dateAffPoste:"2020-06-03T00:00:00.00"}]
    
    switch (etat) {
      case 'Aff':

        return (
<>               <List className="timeline"sx={{ width: '100%', bgcolor: 'background.paper',padding:"1rem" , maxHeight:"40dvh",overflowY:"scroll"}}>
    {
    
    Data?.map((value) =>    
      {
        let AffecDate=value?.dateDebut ? new Date(value.dateDebut).toLocaleDateString() : 'N/A';
        console.log(value)
       // ReferenceReq(value.idRef)

      return (<ListItem
    
        key={value.id}
        disableGutters
        className="timeline-item"
        secondaryAction={
          <IconButton onClick={()=>afficherCarr(value.id)} aria-label="info">
            <MoreHorizIcon />
          </IconButton>
        }
      >
        
        <ListItemText className={style.SemiBold} primary={`${libFct}`+` `+`.`+`(${AffecDate})`} />
      </ListItem>)
    })}
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
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Fonction</label>
            <input  style={{width:"100%"}} type="text" placeholder={libFct} onChange={handleChangeInput}/>
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Catégorie</label>
            <input  style={{width:"100%"}} type="text" placeholder={libDCat} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Date d'affctation au poste</label>
            <input  style={{width:"100%"}} type="text"  />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Date du fin</label>
            <input style={{width:"100%"}} type="text" />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Supérieur Hiéararchique</label>
            <input style={{width:"100%"}} type="text"  />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Département </label>
            <input style={{width:"100%"}} type="text" placeholder='000000' />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"className={style.SemiBold}>Service</label>
            <input style={{width:"100%"}} type="text" placeholder='000000' />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}> 
            <label  style={{width:"30%"}} htmlFor="Retarite" className={style.SemiBold}>Ancienneté</label>
            <input style={{width:"100%"}} type="text" disabled />
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
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold} >Fonction</label>
            <input  style={{width:"100%"}} type="text" autoFocus onChange={inputAjout} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Catégorie</label>
            <input  style={{width:"100%"}} type="text" onChange={inputAjout} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Date d'affctation au poste</label>
            <input  style={{width:"100%"}} type="text" onChange={inputAjout}/>
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Date du fin</label>
            <input style={{width:"100%"}} type="text" onChange={inputAjout} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Supérieur Hiéararchique</label>
            <input style={{width:"100%"}} type="text" onChange={inputAjout} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Département </label>
            <input style={{width:"100%"}} type="text" onChange={inputAjout}/>
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}>
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Service</label>
            <input style={{width:"100%"}} type="text" onChange={inputAjout} />
          </div>
          <div style={{display:'flex',flexWrap:"nowrap",marginBottom:"1rem"}}> 
            <label  style={{width:"30%"}} htmlFor="Retarite"  className={style.SemiBold}>Ancienneté</label>
            <input style={{width:"100%"}} type="text" onChange={inputAjout} />
          </div>
          <button type="submit" style={{width:"150px"}} className={style.boutton}>
        Ajouter
    <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="blue" height="24" viewBox="0 0 24 24"/>
    
        
    
    
</button>
        </form>
      </>)
      break
    }
  }

 


const AfficherCarr = ()=> {
 if(idCarr !== -1) 
  {
    const enregistrement = tabTrié?.find(row => row.id === idCarr)
    ReferenceReq(enregistrement?.idRef)
    DepartementReq(enregistrement?.idDepartement)
    CategorieReq(enregistrement?.idCategorie)
    ServiceReq(enregistrement?.idService)
    const annee1 = enregistrement?.dateAffPoste.getFullYear();
    const mois1 = enregistrement?.dateAffPoste.getMonth();
    const mois2 = enregistrement?.dateFin.getMonth();
    const annee2=enregistrement?.dateFin.getFullYear();
    const nombreDeMois = (annee2 - annee1) * 12 + (mois2 - mois1);

  return  (<>
 
 <TableContainer component={Paper}>
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell style={{ border: '1px solid black', width: '10%' }} align='center'  className={style.SemiBold}>Fonction</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align="center"  className={style.SemiBold}>Catégorie</TableCell>
        <TableCell style={{ border: '1px solid black', width: '20%' }} align="center"  className={style.SemiBold}>Date d'affectation au poste</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align="center"  className={style.SemiBold}>Date de fin</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align='center'  className={style.SemiBold}>Supérieur Hiérarchique</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align="center"  className={style.SemiBold}>Département</TableCell>
        <TableCell style={{ border: '1px solid black', width: '15%' }} align="center"  className={style.SemiBold}>Service</TableCell>
        <TableCell style={{ border: '1px solid black', width: '10%' }} align="center" className={style.SemiBold}>Ancienneté</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
     
        <TableRow>
          <TableCell style={{ border: '1px solid black' }}className={style.Regular} align="center">{libFct}</TableCell>
          <TableCell style={{ border: '1px solid black' }} className={style.Regular}align="center">{libDCat}</TableCell>
          <TableCell style={{ border: '1px solid black' }} className={style.Regular}align="center">{enregistrement?.dateAffPoste.toDateString()}</TableCell>
          <TableCell style={{ border: '1px solid black' }} className={style.Regular}align="center">{enregistrement?.dateFin.toDateString()}</TableCell>
          <TableCell style={{ border: '1px solid black' }} className={style.Regular}align="center">{enregistrement?.superieurHierarchique}</TableCell>
          <TableCell style={{ border: '1px solid black' }} className={style.Regular}align="center">{libDep}</TableCell>
          <TableCell style={{ border: '1px solid black' }} className={style.Regular}align="center">{libSer}</TableCell>
          <TableCell style={{ border: '1px solid black' }} className={style.Regular}align="center">{`${nombreDeMois}`+` `+`mois`}</TableCell>
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
React.useEffect(() => {
  const row = Data.find(row => row.id === idCarr);
  if (row) {
    setFonction(row.fonction);
  } else {
    setFonction(null);
  }
}, [idCarr]);

React.useEffect(()=>{




  const savedState = sessionStorage.getItem('idCarr');
  if (savedState) {
    const idCarr=Number(savedState)
    setIdCarr(idCarr); 
}

}

,[])





React.useEffect(() => {
  
    const idCarrstring=idCarr.toString()
    sessionStorage.setItem('idCarr',idCarrstring)
  
}, [idCarr])



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
        <div style={{cursor:"pointer"}}  className={style.Regular} onClick={()=>{setEtat('Aff');setIdCarr(-1)}}>Carrière</div>
        {fonction ? (
  <>
    <KeyboardArrowRightIcon />
    <div style={{ cursor: "pointer" }} onClick={() => setEtat("Aff")}>
      {fonction}
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
      
        <button style={{display:etat !=='Ajou' ? 'block': 'none'}} onClick={ajouterFonction} className={style.addbutton}>
  <span className={style.button__text}>Ajouter une Carrière</span>
  
</button>
    

    </div>
   {afficherComp()}
    
    </div>)

}
export default Carrière