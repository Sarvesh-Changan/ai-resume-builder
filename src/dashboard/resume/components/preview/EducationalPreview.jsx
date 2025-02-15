import React from 'react'

function EducationalPreview({resumeInfo}) {
  const themeColor = resumeInfo?.themeColor || '#0D8FCD';

  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2'
    style={{
        color: themeColor,
        printColor: 'inherit'
    }}
    >Education</h2>
    <hr style={{
        borderColor: themeColor
    }} />

    {resumeInfo?.education?.map((education,index)=>(
        <div key={index} className='my-5'>
            <h2 className='text-sm font-bold'
                style={{
                    color: themeColor
                }}
            >{education?.universityName}</h2>
            <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}
            <span>{education?.startDate} To {education?.endDate}</span>
            </h2>
            <p className='text-xs my-2'>
                {education?.description}
            </p>
        </div>
    ))}

    </div>
  )
}

export default EducationalPreview