import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow, { TableRowClasses, TableRowClassKey, TableRowOwnProps, TableRowProps, TableRowTypeMap } from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Spa } from '@mui/icons-material';
import { Link, Route,useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import EmployéInformations from '../Employés/EmployéInformations'
import style from '../../../configs/Font.module.css'
import * as XLSX from 'xlsx'
import axios from 'axios';
import axiosInstance from '../../../configs/sessionConfig';

interface Column {
  id: 'matricule' | 'nom' | 'prenom' | 'fonction' | 'superieurHierarchique' | 'intituleDepartement' | 'categorie' ;
  label: string;
  minWidth?: number;
  align?: string;
  format?: (value: number) => string;
  maxWidth?:string;
}
 
const columns: Column[] = [
  { id: 'matricule', label: 'matricule', minWidth: 70 , align:"center",maxWidth:"8%",format: (value: number) => value.toString()},
  { id: 'nom', label: 'nom', minWidth: 70, align:'center',maxWidth:"8%" },{ id: 'prenom', align:'center',label: 'prenom', minWidth: 70 , maxWidth:"8%"},
  {
    id: 'fonction',
    label: 'fonction',
    minWidth: 70
    , maxWidth:"8%",
    align:'center'
   
  },
  {
    id: 'superieurHierarchique',
    label: 'Supérieur hiérarchique',
    minWidth: 70,align:'center',
    format: (value: number) => value.toString()
    , maxWidth:"8%"
  },
  {
    id: 'intituleDepartement',
    label: 'Inutitulé département',
    minWidth: 70,
   align:'center'
    
  },{
  id: 'categorie',
  label: 'categorie',
  minWidth: 70
 , maxWidth:"8%",align:'center'
}
];

interface Data {
  matricule: number;
  nom: string;
  prenom: string;
  fonction:string;
  superieurHierarchique: number;
  intituleDepartement: string;
  categorie:string;
}

function createData(
  matricule: number,
  nom: string,
  prenom: string,
  fonction:string,
  superieurHierarchique: number,
  intituleDepartement: string,
  categorie: string,
  
): Data {
  return {
    matricule,
    nom,
    prenom,
    fonction,
    superieurHierarchique,
    intituleDepartement,
    categorie,
   
  };
}


const rows = [
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA'),createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAA AAAAAAAA',' AAAAAAAAAAAAAAAAAAAAA'),
  createData(9000000, 'AAAAA','AAAAAAA', 'AAAAAAAA', 3287263,'AAAAAAAAAAAAAAAAAA', 'AAAAAAAAAAAAAAAAAAAAA')
  
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchText, setSearchText] = React.useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  let navigation=useNavigate();

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const [champRecherche, setChampRecherhce] = React.useState<Column['id']>('matricule');

  const redirection = (matricule:number)=>{
    
    
     
        navigation(`/Employés/${matricule}`);
        return true
    
  }
  const handleChange = (event: SelectChangeEvent) => {
    setChampRecherhce(event.target.value as Column['id']);
  };


  const [tableauFiltré, setTableauFiltré] = React.useState<Record<string, any | null>[]>([]);

const Req = async () => {
    try {
      const response = await axiosInstance.get('https://localhost:7113/api/Employes/GetAllEmployes')
      console.log(response.data)
      const tableau=response.data
     
      setTableauFiltré(tableau)
      console.log(tableau[0].nom)
    } catch (error) {
     console.error("Error: "+ error)
    }
};




  const filteredRows = tableauFiltré.filter(row => 
    row[champRecherche as keyof Data].toString().toLowerCase().includes(searchText.toLowerCase())
  );
 

  
  


  

  const exportToExcel = () => {
    if(tableauFiltré !== null){
      const worksheet = XLSX.utils.json_to_sheet(tableauFiltré);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Employés");
      XLSX.writeFile(workbook, "Employés.xlsx");
    };
    }
    

  React.useEffect(() => {
   Req()
  
    
  }, [])
  





  return (
   <> 
   
   <div style={{padding:"1rem"}}> <span style={{fontSize:"2.2rem"}} className={style.Regular}>Liste des Employés</span>
   <div  style={{width:"100%",display:"flex",justifyContent:"flex-end"}}><button  onClick={exportToExcel} className={style.ExcelButton} >Exporter sous forme Excel</button></div>
<div style={{display:'flex',flexDirection:"row",gap:"0.5rem",marginTop:"1rem"}}>
      <div style={{width:"22%",padding:"1.5rem",paddingTop:"1rem",display:"flex",flexDirection:"column",gap:"1.1rem",backgroundColor:"white",borderBottomLeftRadius:"8px",borderBottomRightRadius:"8px",paddingBottom:"1rem",height:"100%",boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"}}>
        <div style={{borderBottom:"1px solid"
                    ,borderImage:"linear-gradient(to right, white, grey, white) 1",paddingBottom:"0.5rem", marginBottom:"1.5rem",width:"100%",textAlign:"center",height:"auto",fontSize:"1.1rem"}} className={style.Medium}>Filtre</div>
       
        <div style={{width:"auto", marginBottom:"1rem"}}>
      <FormControl sx={{width:"auto",display:"flex",flexDirection:"column",gap:"0.6rem"}} >
        <label htmlFor="" className={style.Medium}>Filtrer par</label>
        <Select 

          id="demo-simple-select"
          value={champRecherche}
         
          onChange={handleChange}
        
          sx={{
            height:"2rem",
            '& .MuiSelect-select': {
              padding: '1rem 14px', 
            },
            fontSize:"0.9rem"
           
          }} 
          MenuProps={{
            PaperProps: {
              className: style.Light, 
            },
          }}
           
          
        >
          {columns.map((selectChoise)=>(
             <MenuItem value={selectChoise.id}>{selectChoise.id}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      <div style={{width:"auto",height:"auto",display:"flex",flexDirection:"column",gap:"0.6rem"}}>
        <div><label htmlFor="" className={style.Medium}>Chercher </label></div>
        <div> <TextField
        placeholder='Tapez ici ...'
        value={searchText}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
        className={style.Light}
        sx={{ marginBottom: '16px',
          '& .MuiInputBase-root': {
            height: '2rem', 
            fontSize:"0.9rem"
          },
         }}
      /></div></div>
      </div>

    <Paper sx={{ width: '100%' ,height:"100%"}}>
     
      <TableContainer sx={{ maxHeight: "65dvh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth,maxWidth:column.maxWidth, fontSize:"0.8rem" ,backgroundColor:"#F0EBE3",borderRight:"1px solid #a8a8a8",lineHeight:0,fontWeight:"bold"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {(rowsPerPage > 0
              ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredRows
            ).map((row, index) => {
              
              return (
                <TableRow hover role="checkbox" sx={{cursor:"pointer"}} tabIndex={-1} key={index} onClick={() => redirection(row.matricule)}>
                  {columns.map((column) => {
                    
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} style={{fontSize:"0.7rem",borderRight:"1px solid #a8a8a8",}} align="center">
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );  
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]} 
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes affichées :"
        sx={{ backgroundColor:"#F0EBE3", fontWeight:"bold",
          '.MuiTablePagination-toolbar': {
            justifyContent: 'flex-end',
          },
          '.MuiTablePagination-actions': {
            display: 'none', 
          },
          '.MuiTablePagination-displayedRows': {
            display: 'none',
          },
          
          '.MuiTablePagination-selectLabel' : {
              fontWeight:"bold",marginTop:0,marginBottom:0
          },
          '.MuiInputBase-root' :{
            fontWeight:"bold"
          }
          ,

          '.MuiTablePagination-root': {
            lineHeight:0,
            height:"1rem",
            padding:0
          }
          ,
          '.css-15qoto3-MuiTablePagination-root':{
            height:"1rem",
            lineHeight:0,padding:0
          }


        }}

        style={{height:"100%",padding:0,lineHeight:0}}
      />
    </Paper></div> </div></>
  );
}