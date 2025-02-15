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

    useEffect(() => {
        console.log('ViewResume mounted, resumeId:', resumeId);
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        console.log('Fetching resume info for id:', resumeId);
        setLoading(true);
        GlobalApi.GetResumeById(resumeId)
            .then(resp => {
                console.log('API Response:', resp);
                if (!resp?.data?.data) {
                    throw new Error('No resume data received');
                }
                setResumeInfo(resp.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading resume:', err);
                setError(err.message || 'Failed to load resume. Please try again later.');
                setLoading(false);
            });
    }

    const HandleDownload = () => {
        window.print();
    }

    console.log('Current state:', { loading, error, resumeInfo });

    if (loading) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9f5bff]"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
                    <div className="text-red-500 text-xl mb-4">{error}</div>
                    <Button onClick={GetResumeInfo}>Try Again</Button>
                </div>
            </div>
        );
    }

    if (!resumeInfo) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                    <div className="text-xl">Resume not found</div>
                </div>
            </div>
        );
    }

    return (
        <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}} >
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