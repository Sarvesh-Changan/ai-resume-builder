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
        <div className='shadow-lg h-full p-14 border-t-[20px]'
            style={{
                borderColor: resumeInfo?.themeColor || '#0D8FCD'
            }}
        >
            {/* Personal Detail */}
            {resumeInfo && <PersonalDetailPreview resumeInfo={resumeInfo} />}
            {/* Summary */}
            {resumeInfo && <SummaryPreview resumeInfo={resumeInfo} />}
            {/* Professional Experience */}
            {resumeInfo && <ExperiencePreview resumeInfo={resumeInfo} />}
            {/* Educational */}
            {resumeInfo && <EducationalPreview resumeInfo={resumeInfo} />}
            {/* Skills */}
            {resumeInfo && <SkillsPreview resumeInfo={resumeInfo} />}
        </div>
    )
}

export default ResumePreview