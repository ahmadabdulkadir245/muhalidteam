import Footer from "../components/Footer"
import Header from "../components/Header"
import NebTedTimetable from "../components/NebTedTimetable"
import WaecTimetable from "../components/WaecTimetable"
function Timetable() {
  return (
    <>
    <Header/>
    <div className="px-[10px] md:px-[25px] lg:px-[100px] m-auto mt-8 lg:mt-10">
        <WaecTimetable/>
        <NebTedTimetable/>
    </div>
    <Footer/>
    </>
  )
}

export default Timetable