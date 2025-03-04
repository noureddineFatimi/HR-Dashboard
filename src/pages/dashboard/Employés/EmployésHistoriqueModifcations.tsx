import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import axiosInstance from '../../../configs/sessionConfig';
import style from '../../../configs/Font.module.css'

interface C {
  [key: string]: any | null;
}

export default function CustomizedAccordions() {

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  
  const Req = async ()=>{
    const Resp = await axiosInstance.get<C[]>('https://localhost:7113/api/HistoriqueModifGnrqs')
    const D = Resp.data
    setDonnes(D)
   
  }
 
  React.useEffect(()=>{
    Req()
  }, [])

  const enString = (n: number | undefined) => {
    return n !== undefined ? n.toString() : '';
  }

  const [donnes, setDonnes] = React.useState<C[]>([]);
  
  const [expanded, setExpanded] = React.useState<string | false>(enString(donnes[0]?.idModifHisto));
  
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{padding:"1rem"}}>
      {
        donnes?.map((ModificationObject) => {
          const idModifHisto = enString(ModificationObject?.idModifHisto);
          return (
            <Accordion
              key={idModifHisto}
              expanded={expanded === idModifHisto}
              onChange={handleChange(idModifHisto)}
            >
              <AccordionSummary
                aria-controls={`${idModifHisto}d-content`}
                id={`${idModifHisto}d-header`}
              >
                <Typography className={style.bold}>{ModificationObject?.nomTableModif}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <ul>
                    <li><span className={style.SemiBold}>Modifié par: </span><span className={style.Regular}>{ModificationObject?.nomModificateur}</span></li>
                    <li><span className={style.SemiBold}>Matricule du Modificateur: </span><span className={style.Regular}>{ModificationObject?.matriculeModificateur}</span></li>
                    <li><span className={style.SemiBold}>Nom du champ modifié: </span><span className={style.Regular}>{ModificationObject?.nomChampsModif}</span></li>
                    <li><span className={style.SemiBold}>Ancien valeur: </span><span className={style.Regular}>{ModificationObject?.ancienVal}</span></li>
                    <li><span className={style.SemiBold}>Nouveau valeur: </span><span className={style.Regular}>{ModificationObject?.nouvVal}</span></li>
                  </ul>
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })
      }
    </div>
  );
}
