import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

function EditUser() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {userId, email, examPassword, isAdmin} = router.query;
    const [user, setUser] = useState({
        email: "",
        examPassword: "",
        isAdmin: ""
    })
    const userHandler = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}))
      }
    const [error, setError] = useState('')
      const [message, setMessage] = useState({
        state: false,
        message: ''
      })

    useEffect(() => {
        if(userId) {
          setUser({
            email: email,
            examPassword: examPassword,
            isAdmi: isAdmin
          })
        }
      }, [userId, email, examPassword, isAdmin])

      const updateAnswerHandler = (e) => {
        e.preventDefault()
        setLoading(true)
          let graphqlQuery = {
            query: `
            mutation UpdateUser($id: Int!, $isAdmin: Boolean, $examPassword: String) {
              updateUser(id: $id, userInput: {isAdmin: $isAdmin, examPassword: $examPassword}) {
                id
               isAdmin
               examPassword
              }
            }
          `,
            variables: {
              id: Number(userId),
              examPassword: user.examPassword,
              isAdmin: Number(user.isAdmin),
            }
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
          .then(result => {
            setTimeout(() => {
              setLoading(false)
            }, 2000);
            setMessage({
              state:true,
              message: 'User Updated Successfully redirecting to Admin Users'
            })
            setTimeout(() => {
              router.replace('/admin/users')
              setMessage({
                state: false,
                message: ''
              })
            }, 3000);
          })
          .catch(err => {
            setLoading(false)
            setError('Failed to update Question & Answer')
            setTimeout(()=> {
              setError(false)
            }, 4000)
            console.log(err)
          })
      }
      console.log(user)

      if(loading) {
        return <Loading />
      }

  return (
    <div>
         <Header/>
      <h2 className="text-center text-xl uppercase text-gray-500  my-5 [word-spacing: 10px] ">
        update answer
        <div className="w-[120px] h-[1px] bg-black m-auto"></div>
      </h2>
      {message.state &&
          <p className="text-center text-xs text-green-400 mt-2 mb-1 transition-all duration-300 ease-out">{message.message} </p>
      }
      {error !== '' &&  <p className="text-center text-xs text-red-400 mt-2 mb-2 transition-all duration-300 ease-out">{error} </p>}
         <form  className="px-[10px]" onSubmit={updateAnswerHandler}>

      <select name="isAdmin" id="" className='bg-gray-200 lg:border-[1px] rounded-lg  outline-none px-4 py-[16px] w-full  m-auto flex mb-5 lg:my-5' value={user.isAdmin} onChange={userHandler} required>
          <option value="true">TRUE</option>
          <option value="false">FALSE</option>
      </select>

        <input
        type='text'
        className='bg-gray-200 lg:border-[1px] rounded-lg  outline-none px-4 py-[16px] w-full  m-auto flex mb-5 lg:my-5'
        placeholder='Exam Password'
        required
        name="examPassword"
        value={user.examPassword}
        onChange={userHandler}
      />


        <button
        type='submit'
          className='flex justify-center m-auto mt-5 lg:mt-5  bg-gray-500 w-56 rounded-full text-white  px-2 py-3 2xl:p-3 outline-none transition-all duration-300 ease-in-out hover:bg-[#ffcb05] 2xl:w-[300px] mb-20'
          onClick={updateAnswerHandler}
        >
          Update
        </button>
      
    </form>

    </div>
  )
}

export default EditUser