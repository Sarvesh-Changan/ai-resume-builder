import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/ui/custom/Header";
import { Toaster } from "sonner";

function App() {
  const {user,isLoaded,isSignedIn}=useUser();
  if(!isSignedIn && isLoaded){
    return <Navigate to={'auth/sign-in'} />
  }
  return (
    <>
      <div className="no-print">
        <Header />
      </div>
      <Outlet />
      <Toaster/>
    </>
  );
}

export default App;
