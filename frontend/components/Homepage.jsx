
import {TbCurrencyNaira} from "react-icons/tb"
import Gaurantee from "./Gaurantee"
import PaymentMethod from "./PaymentMethod"
import WaecTimetable from "./WaecTimetable"
function Homepage() {
  return (
    <div className="px-[10px] md:px-[25px] lg:px-[100px] m-auto mt-8 lg:mt-10 ">
        <div>
        <h1 className="text-center text-lg lg:text-2xl font-poppins underline">
        2023 WAEC NIGHT ANSWERS RESOURCES
        </h1>
        <div className="flex flex-wrap items-center 
        justify-between ">

            <div className="w-full md:w-[250px] border-[1px] py-8 rounded-md my-5">
            <h2 className="font-bold text-xl  text-center ">1. Basic Plan</h2>
            <div className="prose leading-4 text-sm md:text-xs">
                <ul>
                    <li>Authorize access pin.</li>
                    <li>8 - 9 Subjects subcription.</li>
                    <li>Practical Answers not included.</li>
                    <li>Available through link only.</li>
                    <li>No paperwork.</li>
                    <li >
                        <span className="flex items-center mb-1">price -  <TbCurrencyNaira  className="w-4 h-3"/>{(5000).toLocaleString()}</span>
                    </li>
                </ul>
            </div>
            <button className="block m-auto mt-5  border-[1px] w-[100px] h-[34px] hover:bg-black hover:text-white transition-all duration-500 ease-out font-changa text-xs rounded-md">BUY NOW</button>
         </div>

            
            <div className="w-full md:w-[250px] border-[1px] py-8 rounded-md my-5">
            <h2 className="font-bold text-xl  text-center ">2. Standard Plan</h2>
            <div className="prose leading-4 text-sm md:text-xs">
                <ul>
                    <li>Authorize access pin.</li>
                    <li>8 - 9 Subjects subcription.</li>
                    <li>Practical Answers.</li>
                    <li>Available through link only.</li>
                    <li>No paperwork.</li>
                    <li >
                        <span className="flex items-center mb-1">price -  <TbCurrencyNaira  className="w-4 h-3"/>{(8000).toLocaleString()}</span>
                    </li>
                </ul>
            </div>
            <button className="block m-auto mt-5  border-[1px] w-[100px] h-[34px] hover:bg-black hover:text-white transition-all duration-500 ease-out font-changa text-xs rounded-md">BUY NOW</button>
    </div>

            
            <div className="w-full md:w-[250px] border-[1px] py-8 rounded-md my-5">
            <h2 className="font-bold text-xl  text-center ">3. Most Bought Plan</h2>
            <div className="prose leading-4 text-sm md:text-xs">
                <ul>
                    <li>Authorize access pin.</li>
                    <li>All Subjects subcription.</li>
                    <li>Practical Answers.</li>
                    <li>Available through link only.</li>
                    <li>No paperwork.</li>
                    <li >
                        <span className="flex items-center mb-1">price -  <TbCurrencyNaira  className="w-4 h-3"/>{(10000).toLocaleString()}</span>
                    </li>
                </ul>
            </div>
            <button className="block m-auto mt-5  border-[1px] w-[100px] h-[34px] hover:bg-black hover:text-white transition-all duration-500 ease-out font-changa text-xs rounded-md">BUY NOW</button>
    </div>

            
            <div className="w-full md:w-[250px] border-[1px] py-8 rounded-md my-5">
            <h2 className="font-bold text-xl  text-center ">4. VIP Plan</h2>
            <div className="prose leading-4 text-sm md:text-xs">
                <ul>
                    <li>Authorize access pin.</li>
                    <li>All Subjects subcription.</li>
                    <li>Practical Answers.</li>
                    <li>Available through link& Whatsapp.</li>
                    <li>Full Paperwork.</li>
                    <li >
                        <span className="flex items-center mb-1">price -  <TbCurrencyNaira  className="w-4 h-3"/>{(15000).toLocaleString()}</span>
                    </li>
                </ul>
            </div>
            <button className="block m-auto mt-5  border-[1px] w-[100px] h-[34px] hover:bg-black hover:text-white transition-background duration-500 ease-out font-changa text-xs rounded-md">BUY NOW</button>
            </div>
        </div>

        <Gaurantee information={`100% Refund Of Your Money If 2023 WAEC/WASSCE Questions & Answers Is Not Delivered/Send To You Midnight Before Exam Time.
                100% Assurance And Authentication Of You Getting Your Question And Answers Midnight before exam.
                Do not Panic We Never Fail To Our Promise. Give It A Try And Enjoy Our Service.
                Once Again Do not Be Deceived By Other Site Or WhatsApp People Or Groups Promising And Telling Stories They will give you Fake Answers.
                For Your Own Good Kindly Subscribe To Us For 100% Assurances. Tell Your Friends About Us Www.ExamKey.Net
                You Can Never Compare Us With Kids Sending You Wrong And Any How Solutions Without Verification! Be Wise And Rush To Us!!!!!`} />

        <PaymentMethod/>

      <WaecTimetable />
        
        </div>
        
    </div>
  )
}

export default Homepage