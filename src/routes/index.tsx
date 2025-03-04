import { ReactNode } from "react";
import { RouteType } from "./config";
import {Route} from "react-router-dom"
import PageWrapper from "../Components/Layout/PageWrapper";
import appRoutes from "./appRoutes";

const generateRoute = (routes: RouteType[]):ReactNode=>{
    return routes.map((route,index)=> (
        route.index ? (
            <Route 
            index 
            path ={route.path}
            element={<PageWrapper state={route.state}>
                {route.element}

            </PageWrapper>}/>
        ) : (
            <Route 
            path={route.path}
            element ={
               
                    <PageWrapper state={route.child ? undefined : route.state }>{route.element}</PageWrapper>}
                    key={index}>


                {route.child && (generateRoute(route.child))}






                    </Route>
                )
        
        
    ))
}

export const routes: ReactNode = generateRoute(appRoutes)