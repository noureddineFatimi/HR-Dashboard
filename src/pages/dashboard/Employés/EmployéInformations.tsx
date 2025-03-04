import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import sizeConfigs from '../../../configs/sizeConfigs';
import colorConfigs from '../../../configs/colorConfig';
import assets from '../../../assets';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import Banque from '../../component/Banque';
import Carrière from '../../component/Carrière';
import CoordonnéesContacts from '../../component/CoordonnéesContacts';
import Detail from '../../component/Detail';
import ExpériencePro from '../../component/ExpériencePro';
import Famille from '../../component/Famille';
import Diplôme from '../../component/Diplôme';
import '../../../assets/itemActive.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import style from '../../../configs/Font.module.css'
import axiosInstance from '../../../configs/sessionConfig';

interface Employe {
  [key: string]: any | null;
}

const EmployéInformations = () => {
  useEffect(() => {
    Req()
    
  }, [])

  const { Matricule } = useParams();

  const [dataObject, setdataObject] = React.useState<Employe[]>([]);

  const Req = async () => {
    try {
      const response = await axiosInstance.get<Employe[]>('https://localhost:7113/api/Employes/GetAllEmployes');
      const tableau = response.data;
      const data= tableau.filter((employe)=>employe.matricule == Matricule)
      setdataObject(data);
     
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  const naviagation = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [elementSecelctionne, setElementSecelctionne] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const ul = useRef<HTMLUListElement | null>(null);

  const afficherAutreComp = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const comp = event.currentTarget;
    const contenu = comp.textContent ?? "";

    setLoading(true);
    setElementSecelctionne(contenu);

    if (ul.current) {
      const items = ul.current.children;
      for (let i = 0; i < items.length; i++) {
        if (items[i].textContent !== contenu) {
          items[i].classList.remove('active');
          items[i].classList.add('desactive');
        }
      }
    }
    comp.classList.remove('desactive');
    comp.classList.add('active');

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    const savedState = sessionStorage.getItem('Etat');
    if (savedState) {
      setElementSecelctionne(savedState);

      if (ul.current) {
        const items = ul.current.children;
        for (let i = 0; i < items.length; i++) {
          if (items[i].textContent !== savedState) {
            items[i].classList.remove('active');
            items[i].classList.add('desactive');
          }
        }
        const comp = Array.from(items).find((li) =>
          li.textContent === savedState
        );

        comp?.classList.remove('desactive');
        comp?.classList.add('active');
      }
    }
  }, []); // vide === pour le premier return === lors de first refreching de la page

  useEffect(() => {
    sessionStorage.setItem('Etat', elementSecelctionne);
  }, [elementSecelctionne]);

  const changerComp = () => {
    if (loading) {
      return (<Box   sx={{
        display: 'flex',
        width: '100%',
        height: '500px',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        opacity: opacity,
        transition: 'opacity 0.6s ease-in-out',
      }}>
        <CircularProgress />
      </Box>);
    }
    switch (elementSecelctionne) {
      case 'Coordonnées & Contact':
        return <CoordonnéesContacts />;
      case 'Banque':
        return <Banque />;
      case 'Famille':
        return <Famille />;
      case 'Carrière':
        return <Carrière />;
      case 'Diplôme(s)':
        return <Diplôme />;
      case 'Expérience Pro avant Auto Hall':
        return <ExpériencePro />;
      case 'Détail':
        return <Detail />;
      default:
        return <Detail />;
    }
  };
  const [opacity, setOpacity] = useState<number>(1);

  useEffect(() => {
    if (loading) {
      setIsVisible(false);
      setOpacity(0);
    } else {
      setIsVisible(true);
      setOpacity(1);
    }
  }, [loading]);

  
  const AffecDate=dataObject[0]?.dateEmbaucheSociété ? new Date(dataObject[0]?.dateEmbaucheSociété).toLocaleDateString() : 'N/A';

  return <>
    <div style={{ width: "100%", borderBottom: "0.001px solid #a8a8a8", flexDirection: "row", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "end", height: "100px" }}>
      <ul ref={ul} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "end", gap: "16px", listStyle: "none", marginBottom: 0 }}>
        <li onClick={afficherAutreComp} className='active'><span className={style.ItemsEmployé}>Détail</span></li>
        <li onClick={afficherAutreComp} className='desactive' ><span className={style.ItemsEmployé}>Coordonnées & Contact</span></li>
        <li onClick={afficherAutreComp} className='desactive'><span className={style.ItemsEmployé}>Banque</span></li>
        <li onClick={afficherAutreComp} className='desactive'><span className={style.ItemsEmployé}>Famille</span></li>
        <li onClick={afficherAutreComp} className='desactive'><span className={style.ItemsEmployé}>Carrière</span></li>
        <li onClick={afficherAutreComp} className='desactive'><span className={style.ItemsEmployé}>Diplôme(s)</span></li>
        <li onClick={afficherAutreComp} className='desactive'><span className={style.ItemsEmployé}>Expérience Pro avant Auto Hall</span></li>
      </ul>
    </div>
    <div style={{ display: "flex", padding: "1rem", flexDirection: 'row', gap: '22px', justifyContent: "space-between", alignItems: "start", width: "100%", height: "100%" }}>
      <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "1rem", gap: "15px", width: "40%", maxWidth: "350px", borderRadius: "10px" }}>
        <img src={assets.images.employeImage} width="120px" height="auto" style={{borderRadius:"20%",objectFit:"cover"}} />
        <div style={{fontSize:"0.75rem"}} className={style.SemiBold}>{dataObject[0]?.nom} {dataObject[0]?.prenom}</div>
        <div style={{ textAlign: "center" }} className={style.Light}>{dataObject[0]?.societe} / {dataObject[0]?.site} / {dataObject[0]?.service}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "15px" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}><div style={{ width: "160px",fontSize:"0.80rem" }} className={style.Medium}>Matricule: </div> <div style={{fontSize:"0.8rem"}} className={style.Regular}>{dataObject[0]?.matricule}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}><div style={{ width: "160px" ,fontSize:"0.80rem" }} className={style.Medium}>Téléphone: </div>
            <div  style={{fontSize:"0.8rem"}} className={style.Regular}>{dataObject[0]?.numTelephone}</div></div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}><div style={{ width: "160px" ,fontSize:"0.80rem" }} className={style.Medium}>Email: </div>
            <div  className={style.Regular} style={{fontSize:"0.8rem"}} >{dataObject[0]?.email}</div></div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}><div style={{ width: "160px" ,fontSize:"0.80rem",flexShrink:"0" }} className={style.Medium}>Fonction: </div>
            <div  className={style.Regular} style={{fontSize:"0.8rem"}} >{dataObject[0]?.fonction}</div></div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}><div style={{ width: "160px" ,fontSize:"0.80rem" }} className={style.Medium}>Catégorie: </div>
            <div  className={style.Regular} style={{fontSize:"0.8rem"}} >{dataObject[0]?.categorie}</div></div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}><div style={{ width: "160px",fontSize:"0.80rem"  }} className={style.Medium}>Supérieur hiéararchique: </div>
            <div  className={style.Regular} style={{fontSize:"0.8rem"}} >{dataObject[0]?.superieurHierarchique}</div></div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}><div style={{ width: "160px" ,fontSize:"0.80rem" }} className={style.Medium}>Date d'afffectation: </div>
            <div className={style.Regular} style={{fontSize:"0.8rem"}} >{AffecDate}</div></div>
        </div>
      </div>
      <div style={{
          backgroundColor: 'white',
          width: '100%',
          borderRadius: '10px',
          opacity: opacity,
          transition: 'opacity 0.3s ease-in-out',
        }} >
      
            {changerComp()}
         
      </div>
    </div>
  </>;

}

export default EmployéInformations;
