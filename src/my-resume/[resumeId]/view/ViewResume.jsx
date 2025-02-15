import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import Header from '@/components/ui/custom/Header'
import { RWebShare } from 'react-web-share'

function ViewResume() {

    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {resumeId} = useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[])

    const GetResumeInfo=()=>{
        setLoading(true);
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
            setLoading(false);
        }).catch(err => {
            console.error('Error loading resume:', err);
            setError('Failed to load resume. Please try again later.');
            setLoading(false);
        });
    }

    const HandleDownload=()=>{
        window.print();
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9f5bff]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-500 text-xl mb-4">{error}</div>
                <Button onClick={GetResumeInfo}>Try Again</Button>
            </div>
        );
    }

    if (!resumeInfo) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Resume not found</div>
            </div>
        );
    }

    return (
        <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
            <div id="no-print">
            <Header/>

            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <h2 className='text-center text-2xl font-medium'>
                    Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                        resume url with your friends and family </p>
            <div className='flex justify-between px-44 my-10'>
                <Button onClick={HandleDownload}>Download</Button>
               
                <RWebShare
        data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
      > <Button>Share</Button>
      </RWebShare>
            </div>
        </div>
            
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
                <ResumePreview/>
            </div>
            </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume