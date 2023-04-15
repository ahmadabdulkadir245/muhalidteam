
import {TbCurrencyNaira} from "react-icons/tb"
import Gaurantee from "./Gaurantee"
import PaymentMethod from "./PaymentMethod"
function JambSection() {
  return (
    <div className="px-[10px] md:px-[25px] lg:px-[100px] m-auto mt-8 lg:mt-10 ">
        <div>
        <h1 className="text-center text-lg lg:text-2xl font-poppins underline">
        2023 JAMB CBT ANWSERS (NO FAILURE)
        </h1>
        <div className="flex flex-wrap items-center 
        justify-between ">

            <div className="w-full md:w-[250px] border-[1px] py-8 rounded-md my-5">
            <h2 className="font-bold text-xl  text-center ">1. Basic Plan</h2>
            <div className="prose leading-4 text-sm md:text-xs">
                <ul>
                    <li>Authorize access pin.</li>
                    <li>2 Subjects subcription.</li>
                    <li> Available 30 mins before exams.</li>
                    <li>Minimum score for two subject is 130+. each  is 65 mark.</li>
                    <li> No Training / Lesson / JAMB-CBT MATERIALS for higher scores levels.</li>
                    <li> 100% Refund If You Did Not Score The Promised Score.</li>
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
                    <li>3 Subjects subcription.</li>
                    <li> Available 1 hours 30 mins before exams.</li>
                    <li>Minimum score for two subject is 195+. each  is 65 mark.</li>
                    <li> No Training / Lesson / JAMB-CBT MATERIALS for higher scores levels.</li>
                    <li> 100% Refund If You Did Not Score The Promised Score.</li>
                    <li >
                        <span className="flex items-center mb-1 ">price -  <TbCurrencyNaira  className="w-4 h-3"/>{(8000).toLocaleString()}</span>
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
                    <li> Available 2 hours before exams.</li>
                    <li>Minimum score for two subject is 245+.</li>
                    <li>  Training / Lesson / JAMB-CBT MATERIALS for higher scores levels.</li>
                    <li> 100% Refund If You Did Not Score The Promised Score.</li>
                    <li >
                        <span className="flex items-center mb-1 ">price -  <TbCurrencyNaira  className="w-4 h-3"/>{(8000).toLocaleString()}</span>
                    </li>
                </ul>
            </div>
            <button className="block m-auto mt-5  border-[1px] w-[100px] h-[34px] hover:bg-black hover:text-white transition-all duration-500 ease-out font-changa text-xs rounded-md">BUY NOW</button>
    </div>

            
            <div className="w-full md:w-[250px] border-[1px] py-8 rounded-md my-5">
            <h2 className="font-bold text-xl  text-center ">4. VIP Plan</h2>
            <div className="prose leading-4 text-sm md:text-xs">
                <ul>
                <li>Authorize access pin. (100 Candidate)</li>
                    <li>All Subjects subcription.</li>
                    <li> Available 4 hours before exams.</li>
                    <li>Minimum score for two subject is 245+.</li>
                    <li>  Training / Lesson / JAMB-CBT MATERIALS for higher scores levels.</li>
                    <li> 100% Refund If You Did Not Score The Promised Score.</li>
                    <li >
                        <span className="flex items-center mb-1">price -  <TbCurrencyNaira  className="w-4 h-3"/>{(15000).toLocaleString()}</span>
                    </li>
                </ul>
            </div>
            <button className="block m-auto mt-5  border-[1px] w-[100px] h-[34px] hover:bg-black hover:text-white transition-background duration-500 ease-out font-changa text-xs rounded-md">BUY NOW</button>
            </div>
        </div>

        <Gaurantee information={`  Using this LINK: https://jamb.muhalidteam.netlify.app You will have to Login with your Jamb Reg Number To Access Your JAMB Particular Answers. Once You Subscribe with us and we use your jamb details in getting your exact questions and answers on the jamb database, You Pay to Us, Instantly Your Jamb Reg Number will be Registered By www.muhalidteam.netlify.app!!!
        Mimium score is your plan score above Assured And Guarantee And 100% Refund If You Did Not Score The Promised Score. That Why We Do Advice You All To Pay On time/early.
        Many say it’s impossible to get JAMB CBT questions, but we assure you that it’s a possible fact provided you can meet its demands. We recommend that you go for the VIP Package to avoid delays. Again, for the fact that you have seen this WWW.EXAMKEY.NET it means you are fortunate this year. Yes! we are true and committed to our words. We don’t toil on one’s future by confiding on their hard-earned money. Just give us a one-time trial and see for yourself!`}/>

        </div>
        
    </div>
  )
}

export default JambSection