import  { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ReactPaginate from "react-paginate";
import { useEffect } from 'react';
import Loading from '../../components/Loading';
import AdminAnswersList from '../../components/AdminAnswersList';

let globalPage = 1

function AminAnswers() {
  const perPage = 4
  const [answers, setAnswers] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const graphqlQuery = {
      query: `
      {
        answers(page: ${page}, perPage: ${perPage}) {
          answers{
            id
           exam
           subject
            answer
          }
          totalPages
        }
      }
      `
    };
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
      .then(answerData => {
        const recievedData = answerData.data?.answers?.answers || []
        recievedData.reverse()
        const asnwerPages = answerData.data?.answers?.totalPages
        setAnswers(recievedData)
        setTotalPages(asnwerPages)
      })
  }, [page])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [loading])

  if(loading) {
    return <Loading/>
  }
  return (
    <>
    <Header/>
       <div className='px-[10px] lg:px-[50px] min-h-screen'>
       <h2 className='text-center font-semibold text-2xl  py-6 tracking-wide font-changa text-gray-500'>ALL answers</h2>
    <div className="grid grid-cols-3 lg:grid-cols-6 items-center uppercase bg-gray-300 p-2 text-gray-700 text-xs font-semibold text-center">
        <div className="">
          <p><span className='hidden lg:inline-block'>EXAM </span> TYPE</p>
        </div>
        <div className="">
          <p><span className='hidden lg:inline-block'>EXAM  </span> SUBJECT</p>
        </div>
        <div className="hidden lg:inline-flex  items-center space-x-2 col-span-2">
        <p><span className='hidden lg:inline-block'>EXAM </span> ASNWER</p>
        </div>
        <div className="'hidden lg:inline-block">
          <p><span className='hidden lg:inline-block'>EDIT  </span> EXAM ANSWER</p>
        </div>
        <div className="hidden lg:inline-block">
          <p><span className='hidden lg:inline-block'>DELETE</span> EXAM ANSWER</p>
        </div>
    </div>

    <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-4 items-center uppercase  text-gray-700 text-xs font-semibold mt-3">
      {answers.map(({ id, exam, subject, answer}) => (
    <AdminAnswersList
        key={id}
        id={id}
        exam={exam}
        subject={subject}
        answer={answer}
        setLoading={setLoading}
    />
      ))}
    </div>
    
        <div className="mt-5">
        <ReactPaginate
          breakLabel='...'
          previousLabel='PREV'
          nextLabel='NEXT'
          pageRangeDisplayed={1}
          pageCount={totalPages}
          onPageChange={({ selected }) => setPage(selected + 1)}
          renderOnZeroPageCount={null}
          previousClassName='flex items-center justify-center capitalize   w-[70px] h-[30px] rounded-sm  border-[1px]  bg-transparent   tracking-wide cursor-pointer  text-xs '
          nextClassName='flex items-center justify-center capitalize   w-[70px] h-[30px] rounded-sm  border-[1px]  bg-transparent   tracking-wide cursor-pointer text-xs'
          containerClassName='flex justify-center items-center mx-auto space-x-2'
          pageLinkClassName='flex items-center justify-center capitalize   w-[30px] h-[30px] rounded-sm  border-[1px]  bg-transparent text-xs'
          activeClassName='bg-gray-200  transition-all duration-300 ease-in-out'
        />
  </div>
    </div>
    <Footer/>
    </>
  )
}

export default AminAnswers
