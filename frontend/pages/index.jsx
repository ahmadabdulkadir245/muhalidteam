import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import {AuthContext} from '../context/authContext'
import Homepage from '../components/Homepage'
import JambSection from '../components/JambSection'
import NecoSection from '../components/NecoSection'
import NebtedSection from '../components/NebtedSection'
import Warning from '../components/Warning'
import WaecTimetable from '../components/WaecTimetable'


export default function Home({products}) {
  const router = useRouter()
  const {authToken} = useContext(AuthContext)
  // console.log(authToken)
  // const [loading, setLoading] = useState(false)
    useEffect(() => {
    // let token = sessionStorage.getItem("Token");
    // if (!token) {
    //   router.push("/login");
    // }
    // setTimeout(() => {
    //   setLoading(true);
    // }, 500)
  }, );
  return (
    <div>
      <Head>
        <title>Muhalid Team</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main>
      <Header/>
      <Homepage/>
      <JambSection/>
      <NecoSection/>
      <NebtedSection/>
      <Warning/>
      <Footer/>
     </main>
    </div>

  )
}


