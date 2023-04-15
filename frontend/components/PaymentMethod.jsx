
function PaymentMethod() {
  return (
    <div className="bg-gray-300 my-5 rounded-md p-[25px]">
        <h2 className="text-xl font-poppins uppercase text-center mb-1
        ">Payment Method</h2>

    <div className="mt-3">  
        <h3 className="uppercase font-semibold font-poppins underline mb-2
        ">pament through banks procedure</h3>
        <div  className="prose text-xs">
        <ol>
            <li>Chat us on Whatsapp to get Bank details by linking the link below</li>
            <li>Whatsapp Link - <a href="" className="text-blue-400">Click me</a></li>
            <li>Text the Message - Send bank details for Waec/Neco/Nabteb/Jamb.</li>
        </ol>
        </div>
        </div>

        <div className="mt-5">
        <h3 className="capitalize font-semibold font-poppins underline mb-2 
        ">PAYMENT THROUGH MTN RECHARGE CARD</h3>
        <div  className="prose text-xs">
            <p>SEND THE FOLLOWING To 09061641620 VIA WHATSAPP</p>
            <p>Or use Whatsapp link  - <a href="" className="text-blue-400">Click me</a> </p>
        <ol>
            <li>Your Name</li>
            <li>MTN CARD PIN</li>
            <li>Amount Paid</li>
            <li>Amount Paid</li>
            <li>Your Subjects List</li>
            <li>Your Phone number</li>
            <li>Indicate if Waec/Neco/Nabteb/Jamb</li>
        </ol>
        </div>
        </div>


        </div>
  )
}

export default PaymentMethod