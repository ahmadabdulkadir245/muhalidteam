import Header from '../../components/Header'
// import auth from '../api/auth';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

import 'react-quill/dist/quill.snow.css';
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { AuthContext } from '../../context/authContext';



function AddQuestion() {
    const [answer, setAnswer] = useState({
      exam: '',
      subject: '',
    })
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const answerHandler = (e) => {
      setAnswer(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const [error, setError] = useState('')
    const [message, setMessage] = useState({
      state: false,
      message: ''
    })
    const [isUpdate, setIsUpdate] = useState(false)
    const {authToken, userId} = useContext(AuthContext)
    const router = useRouter()
    const {prodId, exam, subject, prevAns} = router.query;
    console.log(userId)


    useEffect(() => {
      if(prodId) {
        setIsUpdate(true)
        setAnswer({
          exam: exam,
          subject: subject,
        })
        setContent(prevAns)
      }
    }, [prodId, exam, subject, prevAns])


    const examValid = answer.exam.length > 1
    const subjectValid = answer.subject.length > 1
    const contentValid = content.length > 1

    const addAnswerHandler = (e) => {
    e.preventDefault()
    setLoading(true)
      let graphqlQuery = {
        query: `
        mutation CreateAnswer($exam: String!, $subject: String!, $answer: String!, $userId: Int!) {
          createAnswer(answerInput: {exam: $exam, subject: $subject, answer: $answer, userId: $userId}) {
            exam
            subject
            answer
            userId
          }
        }
      `,
        variables: {
          exam: answer.exam,
          subject: answer.subject,
          answer: content,
          userId: Number(userId),
        }
      };
      if(examValid && subjectValid && contentValid) {
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
          setAnswer({
            exam: "",
            subject: "",
          })
          setContent("")
          setTimeout(() => {
            setLoading(false)
          }, 2000);
          setMessage({
            state:true,
            message: 'Question & Answer Added Successfully redirecting to Admin Answer'
          })
          setTimeout(() => {
            router.back()
            setMessage({
              state: false,
              message: ''
            })
          }, 7000);
        })
        .catch(err => {
          setLoading(false)
          setError('Failed to create Answer')
          setTimeout(()=> {
            setError(false)
          }, 7000)
          console.log(err)
        })
      }else {
        setError('Inputs cannot be empty')
        setTimeout(()=> {
          setError(false)
        }, 7000)
        setLoading(false)
      }
    }

    const updateAnswerHandler = (e) => {
      e.preventDefault()
      setLoading(true)
        let graphqlQuery = {
          query: `
          mutation UpdateAnswer($id: Int!, $exam: String!, $subject: String!, $answer: String!, $userId: Int!) {
            updateAnswer(id: $id, answerInput: {exam: $exam, subject: $subject, answer: $answer, userId: $userId}) {
              id
              exam
              subject
              answer
              userId
            }
          }
        `,
          variables: {
            id: Number(prodId),
            exam: answer.exam,
            subject: answer.subject,
            answer: content,
            userId: Number(userId),
          }
        };
      if(examValid && subjectValid && contentValid) {

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
          setAnswer({
            exam: "",
            subject: "",
          })
          setContent("")
          setTimeout(() => {
            setLoading(false)
          }, 2000);
          setMessage({
            state:true,
            message: 'Question & Answer Updated Successfully redirecting to Admin Answer'
          })
          setTimeout(() => {
          
            router.back()
            setMessage({
              state: false,
              message: ''
            })
          }, 7000);
        })
        .catch(err => {
          setLoading(false)
          setError('Failed to update Question & Answer')
          setTimeout(()=> {
            setError(false)
          }, 7000)
          console.log(err)
        })
    }else {
      setError('Inputs cannot be empty')
      setTimeout(()=> {
        setError(false)
      }, 7000)
      setLoading(false)
    }
  }

  // if(!authToken) {
  //   return router.push('/login')
  // }

    if(loading) {
      return <Loading/>
    }

  return (
    <div>
      <Header/>
      <h2 className="text-center text-xl uppercase text-gray-500  my-5 [word-spacing: 10px] ">
        {isUpdate ? 'update answer' : 'add anwser'}
        <div className="w-[120px] h-[1px] bg-black m-auto"></div>
      </h2>
      {message.state &&
          <p className="text-center text-xs text-green-400 mt-2 mb-1 transition-all duration-300 ease-out">{message.message} </p>
      }
      {error !== '' &&  <p className="text-center text-xs text-red-400 mt-2 mb-2 transition-all duration-300 ease-out">{error} </p>}
         <form  className="px-[10px]" onSubmit={isUpdate ? updateAnswerHandler : addAnswerHandler}>

      <select name="exam" id="" className='bg-gray-200 lg:border-[1px] rounded-lg  outline-none px-4 py-[16px] w-full  m-auto flex mb-5 lg:my-5' value={answer.exam} onChange={answerHandler} required>
          <option value="">select exam</option>
          <option value="JAMB">JAMB</option>
          <option value="NECO">NECO</option>
          <option value="WAEC">WAEC</option>
          <option value="NEBTED">NEBTED</option>
      </select>

        <input
        type='text'
        className='bg-gray-200 lg:border-[1px] rounded-lg  outline-none px-4 py-[16px] w-full  m-auto flex mb-5 lg:my-5'
        placeholder='subject name'
        required
        name="subject"
        value={answer.subject}
        onChange={answerHandler}
      />

      <div className="  font-semibold text-gray-500 h-[300px] overflow-y-scroll shadow-md border border-gray-400 rounded-md overflow-hidden">
      <QuillNoSSRWrapper modules={modules} onChange={setContent} value={content} theme="snow"  required
        />
      </div>

      {isUpdate ? (
        <button
        type='submit'
          className='flex justify-center m-auto mt-5 lg:mt-5  bg-gray-500 w-56 rounded-full text-white  px-2 py-3 2xl:p-3 outline-none transition-all duration-300 ease-in-out hover:bg-[#ffcb05] 2xl:w-[300px] mb-20'
          // onClick={updateAnswerHandler}
        >
          Update
        </button>
      ) : (
        <button 
        type="submit"
          className='flex justify-center m-auto mt-5 lg:mt-5  bg-black w-full h-[48px] rounded-md text-white  px-2 py-3 2xl:p-3 outline-none transition-all duration-300 ease-in-out hover:bg-yellow-500 2xl:w-[300px] mb-20'
          // onClick={addAnswerHandler}
        >
          Add
        </button>
      )}
    </form>

    </div>
  )
}

export default AddQuestion

// export async function getServerSideProps(context) {
//   await auth(context.req, context.res, null);
//   return { props: {} };
// }