import Link from "next/link"
import { BsWhatsapp } from "react-icons/bs"
import { ImTwitter } from "react-icons/im"
import { RiFacebookFill } from "react-icons/ri"
import {  TfiEmail } from "react-icons/tfi"
import { TiArrowRight } from "react-icons/ti"
import { RxInstagramLogo } from "react-icons/rx"

function Footer() {
  return (
    <div className="relative left-0 bottom-0 bg-gray-300  py-5 px-5 text-gray-500  mt-16 shadow-xl min-h-full">

                    <div className="h-[1px] w-full my-4 bg-gray-700">

                    </div>
                    <p className="font-poppins px-1 text-center">Muhalid Team &#169; 2023 - All Rights Reserved</p>
    </div>
  )
}

export default Footer