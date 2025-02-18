import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {
    const {resumeInfo} = useContext(ResumeInfoContext);

    if (!resumeInfo) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading resume...</div>
            </div>
        );
    }

    return (
        <div 
            className='resume-preview w-[21cm] mx-auto bg-white shadow-lg p-8 border-t-[20px] print:shadow-none print:border-none'
            style={{
                borderColor: resumeInfo?.themeColor || '#0D8FCD'
            }}
        >
            <div className="resume-content">
                {/* Personal Detail */}
                <PersonalDetailPreview resumeInfo={resumeInfo} />
                {/* Summary */}
                <SummaryPreview resumeInfo={resumeInfo} />
                {/* Professional Experience */}
                <ExperiencePreview resumeInfo={resumeInfo} />
                {/* Educational */}
                <EducationalPreview resumeInfo={resumeInfo} />
                {/* Skills */}
                <SkillsPreview resumeInfo={resumeInfo} />
            </div>
        </div>
    );
}

export default ResumePreview;