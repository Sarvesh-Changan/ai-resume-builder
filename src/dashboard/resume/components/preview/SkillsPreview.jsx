import React from 'react'

function SkillsPreview({resumeInfo}) {
  const themeColor = resumeInfo?.themeColor || '#0D8FCD';

  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2'
    style={{
        color: themeColor,
        printColor: 'inherit'
    }}
    >Skills</h2>
    <hr style={{
        borderColor: themeColor
    }} />

    <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills?.map((item,index)=>(
            <div key={index} className='flex items-center justify-between gap-2'>
                <h2 className='text-xs min-w-[80px]'>{item.name}</h2>
                <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div className='h-full rounded-full transition-all duration-300'
                        style={{
                            backgroundColor: themeColor,
                            width: `${(item?.rating || 0) * 20}%`,
                            WebkitPrintColorAdjust: 'exact',
                            printColorAdjust: 'exact',
                            colorAdjust: 'exact'
                        }}
                    >
                    </div>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default SkillsPreview