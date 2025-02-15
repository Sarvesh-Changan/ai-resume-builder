import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'

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
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9f5bff]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
                <div className="text-red-500 text-xl mb-4">{error}</div>
                <Button onClick={GetResumeInfo} className="bg-[#9f5bff] hover:bg-[#8347d4]">
                    Try Again
                </Button>
            </div>
        );
    }

    if (!resumeInfo) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="text-xl">Resume not found</div>
            </div>
        );
    }

    return (
        <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
            <div className="min-h-screen">
                {/* No print section */}
                <div id="no-print" className="no-print">
                    <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                        <h2 className='text-center text-2xl font-medium'>
                            Congrats! Your Ultimate AI generates Resume is ready!
                        </h2>
                        <p className='text-center text-gray-400'>
                            Now you are ready to download your resume
                        </p>
                        <div className='flex justify-center my-10'>
                            <Button 
                                onClick={HandleDownload}
                                className="bg-[#9f5bff] hover:bg-[#8347d4] px-8"
                            >
                                Download Resume
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Print section */}
                <div id="print-area" className="print-container">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;