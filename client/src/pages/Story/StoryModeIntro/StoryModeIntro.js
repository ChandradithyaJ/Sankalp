const StoryModeIntro = ({ mode }) => {
    return(
    <div className={`story-mode-intro-${mode}`}>
      <div className='text-white'>
        <div className='max-w-[800px] mt-[-90px] w-full h-screen max-auto text-center flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold p-4'>GROWING WITH DATA ANALYSIS</p>
          <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Grow with data</h1>
          <div>
            <p className='md:text-5xl sm:text-4xl text-xl font-bold'>Fast , flexible and financial for </p>
            <Typed></Typed>
          </div>

        </div>
        Hero
      </div>
    </div>
    )
}

export default StoryModeIntro