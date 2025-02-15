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
        if (!resumeId) {
            setError('No resume ID provided');
            setLoading(false);
            return;
        }
        GetResumeInfo();
    }, [resumeId]);

    const GetResumeInfo = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await GlobalApi.GetResumeById(resumeId);
            
            if (!response?.data?.data) {
                throw new Error('Resume not found');
            }
            
            setResumeInfo(response.data.data);
        } catch (err) {
            console.error('Error fetching resume:', err);
            setError(err.message || 'Failed to load resume');
        } finally {
            setLoading(false);
        }
    };

    const HandleDownload = () => {
        if (!resumeInfo) return;
        window.print();
    };

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
                    <Button onClick={GetResumeInfo} className="bg-[#9f5bff] hover:bg-[#8347d4]">
                        Try Again
                    </Button>
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
        <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
            <div className="min-h-screen">
                <div id="no-print">
                    <Header/>
                    <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                        <h2 className='text-center text-2xl font-medium'>
                            Congrats! Your Ultimate AI generates Resume is ready!
                        </h2>
                        <p className='text-center text-gray-400'>
                            Now you are ready to download your resume and you can share unique 
                            resume url with your friends and family
                        </p>
                        <div className='flex justify-between px-44 my-10'>
                            <Button 
                                onClick={HandleDownload}
                                className="bg-[#9f5bff] hover:bg-[#8347d4]"
                            >
                                Download
                            </Button>
                            <RWebShare
                                data={{
                                    text: "Hello Everyone, This is my resume please open url to see it",
                                    url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
                                    title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
                                }}
                                onClick={() => console.log("shared successfully!")}
                            >
                                <Button className="bg-[#9f5bff] hover:bg-[#8347d4]">
                                    Share
                                </Button>
                            </RWebShare>
                        </div>
                    </div>
                </div>
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <div id="print-area">
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;