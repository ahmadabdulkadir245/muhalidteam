import { BiSearchAlt } from "react-icons/bi"

function MobileNav({showSearch, searchWord, searchHandler, pressToSearchHandler}) {
  return (
    <>
         {showSearch ? (
              <div className={`lg:hidden bg-gray-50 pt-2 pb-4 px-[10px] -mt-3 ${searchWord.length > 2 ? '' : 'shadow-lg'} relative`}>
                <div className='flex items-center m-auto h-12 rounded-md flex-grow cursor-pointer bg-black  hover:bg-gray-800'>
                  <input
                    type='text'
                    className='px-2 py-[24px] h-full w-6 flex-grow  flex-shrink rounded-l-md focus:outline-none bg-gray-300 font-primary text-gray-700'
                    placeholder='Enter your pin here'
                    value={searchWord}
                    onChange={searchHandler}
                  />
                  <button className="text-white px-3 text-xs"
                  >Display Answer</button>
                    {/* <BiSearchAlt className='h-12 w-12 p-3  text-gray-500 transition duration-200 ease-in' 
                   onClick={pressToSearchHandler} 
                    /> */}
                </div>
              </div>
            ) : (
              ""
            )}

    </>
  )
}

export default MobileNav