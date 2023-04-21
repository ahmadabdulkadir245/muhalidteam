import Link from "next/link"
import { useState } from "react"

function AdminAnswersList({key, id, exam, subject , answer, setLoading}) {
    const deleteHandler = (id, e) => {
        e.preventDefault()
        setLoading(true)
        let graphqlQuery = {
          query: `
          mutation DeleteAnswer($id: Int) {
            deleteAnswer(id: $id)
          }
        `,
        variables: {
          id: Number(id)
        }
        }
        fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(graphqlQuery)
        })
          .then(res => {
            return res.json();
          })
          .then(result => {
                setTimeout(() => {
                  setLoading(false)
                }, 3000)
          })
      }

  return (
    <>
       <div>
            <p className="text-center">{exam}</p>
       </div>

       <div>
            <p className="text-center">{subject}</p>
       </div>
        <div className="hidden lg:inline-block col-span-2">
       <div className="line-clamp-2 pr-2">
       <div className="lowercase" dangerouslySetInnerHTML={{ __html: answer }} />
       </div>
        </div>

       <div className="hidden lg:block">
        <Link href={{ pathname: `/admin/add-answer`, query: { prodId: id, exam: exam, subject: subject, prevAns: answer }}}> 
        <button className="capitalize w-[90%] h-[38px] rounded-sm  border-[1px]  bg-transparent  m-auto tracking-wide cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out">EDIT</button>
        </Link>
        </div>

        <div className="space-y-3 lg:space-y-0">
        <div className="lg:hidden">
        <Link href={{ pathname: `/admin/add-answer`, query: { prodId: id, exam: exam, subject: subject, prevAns: answer }}}> 
        <button className="capitalize w-[90%] h-[38px] rounded-sm  border-[1px]  bg-transparent  m-auto tracking-wide cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out">EDIT</button>
        </Link>
        </div>
        
        <button className="capitalize w-[90%] h-[38px] rounded-sm  border-[1px] bg-transparent  m-auto tracking-wide cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out" onClick={deleteHandler.bind(this, id)}>DELETE</button>
        </div>
        <div className="w-full h-[1px] bg-gray-300 col-span-full"></div>

    </>
  )
}

export default AdminAnswersList