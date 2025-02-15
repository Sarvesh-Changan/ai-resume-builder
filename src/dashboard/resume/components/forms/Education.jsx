import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

function Education() {

  const [loading,setLoading]=useState(false);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const params=useParams();
  const [educationalList,setEducationalList]=useState([{
    universityName:'',
    degree:'',
    major:'',
    startDate:'',
    endDate:'',
    description:''
  }]);

  // Only update when education data changes
  useEffect(()=>{
    if(resumeInfo?.education && resumeInfo.education.length > 0 && 
       JSON.stringify(educationalList) !== JSON.stringify(resumeInfo.education)) {
      setEducationalList(resumeInfo.education);
    }
  },[resumeInfo?.education]) // Only depend on education array

  const handleChange=(event,index)=>{
    const {name,value}=event.target;
    setEducationalList(prev => {
      const newEntries = [...prev];
      newEntries[index] = {...newEntries[index], [name]: value};
      return newEntries;
    });
  }

  // Debounced context update
  useEffect(()=>{
    const timer = setTimeout(() => {
      setResumeInfo(prev => ({
        ...prev,
        education: educationalList
      }));
    }, 300);
    return () => clearTimeout(timer);
  },[educationalList]);

  const AddNewEducation=()=>{
    setEducationalList([...educationalList,
      {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
  }
  const RemoveEducation=()=>{
    setEducationalList(educationalList=>educationalList.slice(0,-1))

  }

  const onSave=()=>{
    if(loading) return; // Prevent multiple saves
    setLoading(true);

    const data={
      data:{
        education: educationalList.map(edu => ({
          universityName: edu.universityName || '',
          degree: edu.degree || '',
          major: edu.major || '',
          startDate: edu.startDate || '',
          endDate: edu.endDate || '',
          description: edu.description || ''
        }))
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId,data)
      .then(resp=>{
        setLoading(false);
        toast('Details updated!')
      })
      .catch(error=>{
        console.error(error);
        setLoading(false);
        toast('Server Error, Please try again!')
      });
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-[#9f5bff] border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add Your educational details</p>

    <div>
      {educationalList.map((item,index)=>(
        <div>
          <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>University Name</label>
              <Input name="universityName" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.universityName}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input name="degree" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.degree} />
            </div>
            <div>
              <label>Major</label>
              <Input name="major" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.major} />
            </div>
            <div>
              <label>Start Date</label>
              <Input type="date" name="startDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.startDate} />
            </div>
            <div>
              <label>End Date</label>
              <Input type="date" name="endDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.endDate} />
            </div>
            <div className='col-span-2'>
              <label>Description</label>
              <Textarea name="description" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.description} />
            </div>

          </div>
       
        </div>
      ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewEducation} className="text-[#9f5bff]"> + Add More Education</Button>
            <Button variant="outline" onClick={RemoveEducation} className="text-[#9f5bff]"> - Remove</Button>

            </div>
            <Button className='bg-[#9f5bff] hover:bg-[#1E3A5A] text-white' disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Education