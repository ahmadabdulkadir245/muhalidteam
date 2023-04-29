import Link from 'next/link'
function Timetable() {
  return (
    <div className="bg-gray-300 my-5 rounded-md p-[25px]">
         <h2 className="text-xl font-poppins uppercase text-center mb-1
        ">TIME TABLE</h2>
        <div className="text-xs">
        THIS ARE THE TIME TABLE LINK -- <Link href={'/timetable'} className='text-blue-500'>
        Click me
        </Link>
        </div>
    </div>
  )
}

export default Timetable