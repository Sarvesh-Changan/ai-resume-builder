import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import GlobalApi from "./../../../service/GlobalApi";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTile] = useState();
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  const navigation=useNavigate();

  const onCreate = async() => {
    setLoading(true)
    const uuid = uuidv4();
    const data={
        data:{
        title:resumeTitle,
        resumeId:uuid,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName
        }
    }
    
    GlobalApi.CreateNewResume(data).then(resp=>{
        console.log(resp.data.data.documentId);
        if(resp){
            setLoading(false);
            navigation('/dashboard/resume/'+resp.data.data.documentId+'/edit')
        }
    },(error)=>{
        setLoading(false);
    })
  };
  return (
    <div>
      <div
        className="p-14 py-24 border 
        items-center flex 
        justify-center bg-secondary
        rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack resume"
                onChange={(e) => setResumeTile(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} className="bg-[#2B547E] hover:bg-[#1E3A5A]" onClick={() => onCreate()}>
                {
                    loading?
                    <Loader2 className="animate-spin" />:'Create'
                }
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
