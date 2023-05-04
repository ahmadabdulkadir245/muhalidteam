import Link from "next/link"

function AdminUsersList({id, email, examPassword, isAdmin, setLoading}) {
    const deleteHandler = (id, e) => {
        e.preventDefault()
        setLoading(true)
        let graphqlQuery = {
          query: `
          mutation DeleteAnswer($id: Int) {
            deleteUser(id: $id)
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
       <div className="text-center my-2">
        {email}
        </div> 
       <div className="text-center my-2">
        {examPassword}
        </div> 
       <div className="text-center my-2">
        {isAdmin == 1 ? "true" : "false"}
        </div> 
       <div className="text-center my-2">
       <Link href={{ pathname: `/admin/edit-user`, query: { userId: id, email: email , examPassword: examPassword, isAdmin: isAdmin }}}> 
        <button className="capitalize w-[90%] h-[38px] rounded-sm  border-[1px]  bg-transparent  m-auto tracking-wide cursor-pointer hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out">EDIT</button>
        </Link>
        </div> 
       <div className="text-center my-2">
       <button className="capitalize w-[90%] h-[38px] rounded-sm  border-[1px] bg-transparent  m-auto tracking-wide cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out"
        onClick={deleteHandler.bind(this, id)}
       >DELETE</button>
        </div> 
        <div className="w-full h-[1px] bg-gray-300 col-span-full"></div>


    </>
  )
}

export default AdminUsersList