import HomePage from "../pages/home/HomePage"
import { RouteType } from "./config"
import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import GsetionDesUtilisateursDefaultPage from "../pages/dashboard/GestionDesUtilisateurs/GsetionDesUtilisateursDefaultPage";
import GsetionDesUtilisateursIndex from "../pages/dashboard/GestionDesUtilisateurs/GestionDesUtilisateursIndex";
import GsetionDesUtilisateursSaasPage from "../pages/dashboard/GestionDesUtilisateurs/GsetionDesUtilisateursSaasPage";
import GsetionDesUtilisateursAnanlyticPage from "../pages/dashboard/GestionDesUtilisateurs/GsetionDesUtilisateursAnanlyticPage";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GestionDesDossiersMédicauxAnanlyticPage from "../pages/dashboard/GestionDesDossiersMédicaux/GestionDesDossiersMédicauxAnanlyticPage";
import GestionDesDossiersMédicauxIndex from "../pages/dashboard/GestionDesDossiersMédicaux/GestionDesDossiersMédicaux";
import GsetionDesDossiersMédicauxDefaultPage from "../pages/dashboard/GestionDesDossiersMédicaux/GestionDesDossiersMédicauxDefaultPage";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import EmployésHistoriqueModifcations from "../pages/dashboard/Employés/EmployésHistoriqueModifcations";
import EmployésListeEmployées from "../pages/dashboard/Employés/EmployésListeEmployées";
import EmployésxIndex from "../pages/dashboard/Employés/EmployésxIndex";
import EmployéInformations from "../pages/dashboard/Employés/EmployéInformations";
import ModifierCarr from "../pages/dashboard/Employés/ModifierCarr";
import Detail from "../pages/component/Detail"; 
const appRoutes : RouteType[]=[
    {
        index:true,
        element:<HomePage/>,
        state:"home" 
    },
    {
        path:"/Gestion-des-utilisateurs",
        element:<DashboardPageLayout/>,
        state:"gestionDesUtilisateurs",
        sidebarProps:{
            displayText:"Gestion des utilisateurs",
            icon:<SettingsOutlinedIcon />
        },
        child:[{
            index:true,
            element:<GsetionDesUtilisateursIndex/>,
            state:"gestionDesUtilisateurs.index",
            
        },
        {path:"/Gestion-des-utilisateurs/Element-1",
            element:<GsetionDesUtilisateursDefaultPage/>,
            state:"gestionDesUtilisateurs.Element-1",
            sidebarProps:{
                displayText:"Page 1"
            }
        },
        {path:"/Gestion-des-utilisateurs/analytics",
            element:<GsetionDesUtilisateursAnanlyticPage/>,
            state:"gestionDesUtilisateurs.analytics",
            sidebarProps:{
                displayText:"Page 2"
            }
        },
        {path:"/Gestion-des-utilisateurs/saas",
            element:<GsetionDesUtilisateursSaasPage/>,
            state:"gestionDesUtilisateurs.saas",
            sidebarProps:{
                displayText:"Page 3"
            }
        }
            
        ]
        
    
    },
    
    
    
    {
        path:"/Gestion-des-dossiers-médicaux",
        element:<DashboardPageLayout/>,
        state:"gestionDesDossiersMédicaux",
        sidebarProps:{
            displayText:"Gestion Dossiers Médicaux",
            icon:<MedicalServicesOutlinedIcon />
        },
        child:[{
            index:true,
            element:<GestionDesDossiersMédicauxIndex/>,
            state:"gestionDesUtilisateurs.index",
            
        },
        {path:"/Gestion-des-dossiers-médicaux/Element-1",
            element:<GsetionDesDossiersMédicauxDefaultPage/>,
            state:"gestionDesDossiersMédicaux.Element-1",
            sidebarProps:{
                displayText:"Page 1"
            }
        },
        {path:"/Gestion-des-dossiers-médicaux/analytics",
            element:<GestionDesDossiersMédicauxAnanlyticPage/>,
            state:"gestionDesDossiersMédicaux.analytics",
            sidebarProps:{
                displayText:"Page 2"
            }
        }
            
        ]

        
    
    }
    ,
    {
        path:"/Employés",
        element:<DashboardPageLayout/>,
        state:"employes",
        sidebarProps:{
            displayText:"Les Employés (La Fiche Signalétique)",
            icon:<GroupsOutlinedIcon />
        },
        child:[{
            index:true,
            element:<EmployésxIndex/>,
            state:"employes.index",
            
        },
        {path:"/Employés/Liste-des-employes",
            element:<EmployésListeEmployées/>,
            state:"employes.Element-1",
            sidebarProps:{
                displayText:"Liste des Employés"
            }
        },
        {path:"/Employés/Historique-des-modifications",
            element:<EmployésHistoriqueModifcations/>,
            state:"employes.analytics",
            sidebarProps:{
                displayText:"Historique des Modifications"
            }
        },
        {
            path:"/Employés/:Matricule",
            element:<EmployéInformations/>,
            state:"employes.ficheSignalétique",
        
       
        }
        ]
    }
    
    

    
    
    
    
    
    
];
export default appRoutes;