import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enabledNext,setEnableNext]=useState(false);
  const {resumeId}=useParams();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={'/dashboard'}>
          <Button className='bg-[#2B547E] hover:bg-[#9f5bff]'><Home/></Button>
          </Link>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex>1
          && <Button className='bg-[#9f5bff] hover:bg-[#1E3A5A]' onClick={()=>setActiveFormIndex(activeFormIndex-1)} size='sm'> <ArrowLeft/> </Button>}
          <Button disabled={!enabledNext} className='flex gap-2 bg-[#9f5bff] hover:bg-[#1E3A5A]' onClick={()=>setActiveFormIndex(activeFormIndex+1)} size='sm'> Next <ArrowRight/> </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex==1? <PersonalDetail enabledNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==2? <Summary enabledNext={(v)=>setEnableNext(v)} />
      :activeFormIndex==3?
      <Experience/>
      :activeFormIndex==4?
      <Education/>
      :activeFormIndex==5?
      <Skills/>
      :activeFormIndex==6?
      <Navigate to={'/my-resume/'+resumeId+'/view'}/>
      :null}
    </div>
  )
}

export default FormSection