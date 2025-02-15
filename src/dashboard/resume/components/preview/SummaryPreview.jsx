import React from 'react'

function SummaryPreview({resumeInfo}) {
  const themeColor = resumeInfo?.themeColor || '#0D8FCD';
  
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{
          color: themeColor,
          printColor: 'inherit'
        }}
      >Summary</h2>
      <hr style={{
        borderColor: themeColor
      }} />
      <p className='text-xs my-2'>
        {resumeInfo?.summary}
      </p>
    </div>
  )
}

export default SummaryPreview