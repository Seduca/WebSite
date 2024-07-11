'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail, writeUserData, removeData } from '@/firebase/utils'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useRouter, usePathname } from 'next/navigation';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

import "animate.css/animate.compat.css"
import 'react-awesome-slider/dist/styles.css';
import QRscanner from '@/components/QRscanner'
import { QRreaderUtils } from '@/utils/QRreader'
import InputFlotante from '@/components/InputFlotante'
import { generateUUID } from '@/utils/UIDgenerator'
import SelectSimple from '@/components/SelectSimple'

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import dynamic from 'next/dynamic'
import parse from 'html-react-parser';




export default function Home() {
  const { user, introVideo, userDB, selectValue, setSelectValue, setUserProfile, languaje, modal, setModal, setUserSuccess, calcValueFCL, setCalcValueFCL, calcValue, setCalcValue, element, setElement, naviera, setNaviera, success, setUserData, postsIMG, setUserPostsIMG, nav, cliente, setCliente, focus, setFocus, seeMore, setSeeMore } = useUser()


  const [code, setCode] = useState('')
  const [filter, setFilter] = useState('')


  const pathname = usePathname()

  const router = useRouter()
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const inputRef = useRef('')
  const inputRef2 = useRef('')


  const redirectHandlerWindow = (ref) => {
    window.open(ref, '_blank')
  }


  function handlerClickSelect2(e) {
    setSelectValue({ ...selectValue, SERVICIO: e })

  }
  function handlerOnChangeQR(e) {
    QRreaderUtils(e, setCode)

  }
  // let data = priceFTL.reduce((acc, i, index) => {
  //   return acc.includes(i.ORIGEN) ? acc : [...acc, i.ORIGEN]
  // }, [])

  async function HandlerCheckOut(e) {

    //  const data =  Object.entries(calcValue).map((i, index) => `${i[0]}: ${i[1]}`)
    router.push('PDF')
    return

    const db = Object.entries(calcValue).reverse().reduce((acc, i, index) => {
      const data = `${i[0]}: ${i[1]}\n`
      return data + '\r\n' + acc
    }, ``)

    var whatsappMessage = "SOLICITUD DE SERVICIO" + "\r\n\r\n" + db
    whatsappMessage = window.encodeURIComponent(whatsappMessage)
    console.log(whatsappMessage)
    // window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')
    window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=${whatsappMessage}`, '_blank')

  }
  async function HandlerCheckOut2(e) {
    const db = Object.entries({ ORIGEN: inputRef.current.value, DESTINO: inputRef2.current.value, ...selectValue }).reverse().reduce((acc, i, index) => {
      const data = `${i[0]}: ${i[1]}\n`
      return data + '\r\n' + acc
    }, ``)

    var whatsappMessage = "SOLICITUD DE SERVICIO" + "\r\n\r\n" + db
    whatsappMessage = window.encodeURIComponent(whatsappMessage)
    console.log(whatsappMessage)
    // window.open(`https://api.whatsapp.com/send?phone=${perfil.whatsapp.replaceAll(' ', '')}&text=${whatsappMessage}`, '_blank')
    window.open(`https://api.whatsapp.com/send?phone=+59169941749&text=${whatsappMessage}`, '_blank')

  }

  function handlerOnChange(e) {
    e.stopPropagation();
    setSelectValue({ ...selectValue, [e.target.name]: e.target.value })

  }

  function reset() {
    setFocus('')
  }

  function handlerSelect(i) {
    inputRef.current.value = i
    inputRef2.current.value = ''

    setFocus('')
  }
  function handlerSelect2(i) {
    inputRef2.current.value = i
    setFocus('')
  }


  function handlerClickSelect(name, i, uuid) {
    let db = { [name]: i }
    setSelectValue({ ...selectValue, ...db })
  }


  function write() {
    writeUserData('Cliente/comisionFTL', {
      [generateUUID()]: {
        de: 1,
        hasta: 1000,
        monto: 20,
      },
      [generateUUID()]: {
        de: 1001,
        hasta: 10000,
        monto: '2%,'
      },
      [generateUUID()]: {
        de: 10001,
        hasta: 20000,
        monto: '1.50%',
      },
      [generateUUID()]: {
        de: 20001,
        hasta: 30000,
        monto: '1.25%',
      },
      [generateUUID()]: {
        de: 30001,
        hasta: 50000,
        monto: '1%',
      },
      [generateUUID()]: {
        de: 50001,
        hasta: 100000,
        monto: '0.75%',
      },
      [generateUUID()]: {
        de: 100001,
        hasta: 1000000000000,
        monto: '0.50%',
      },
    }
    )
  }
 
  
  // function HandlerOnChange(e) {
  //   QRreaderUtils(e, setFilterQR,)
  // }

  return (


    <section className='h-screen p-12 pt-[50px] bg-white '>
      <div className='flex justify-center'>

       <img src="/logo.jpeg" className='w-[80px]' alt="" /> 
      </div>

      <h1 className='text-[20px] text-center font-bold'>SEDUCA INFORMA</h1>
      <h2 className='text-center text-[16px]'>subdireccion de educacion superior de formacion profesional <br /> LA PAZ - 2024</h2>
      <div className='relative h-[80%] fles flex-col space-y-10 md:space-y-0 md:grid md:grid-cols-2 justify-items-center place-items-center gap-5  p-10'>

        <div className='text-[16px] shadow-2xl border p-10 bg-white space-y-5'>
          <p className='mb-5'>
            Informacion de Institutos tecnicos tecnologicos <br />publicos y privados <br /> LA PAZ - EL ALTO <br /> 2024
          </p>
          <Link href='/Info' className=''>
            <button className='flex items-center text-white  bg-gradient-to-r from-blue-900 via-blue-900 to-blue-900 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-800      rounded-[5px] border    text-center  p-2 px-5'>
              Acceder a info
            </button>
          </Link>

        </div>
        <div className='flex flex-col justify-center items-center text-[16px] shadow-2xl border p-10 bg-white space-y-5'>
          <p className='text-[16px] '>Accede facilmente atravez de nuestro QR</p>
          <label htmlFor="qr" className='inline-block  bg-[#F7BE38] border-[2px] border-[#0000002d] p-2 rounded-[5px]'>
            <svg width="100" height="100" viewBox="0 0 323 323" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M138.71 0.669922H12.4399C9.25734 0.669922 6.20509 1.93419 3.95465 4.18463C1.70421 6.43507 0.439941 9.48732 0.439941 12.6699V138.93C0.439941 142.112 1.70421 145.165 3.95465 147.415C6.20509 149.666 9.25734 150.93 12.4399 150.93H138.71C141.893 150.93 144.945 149.666 147.195 147.415C149.446 145.165 150.71 142.112 150.71 138.93V12.6699C150.71 9.48732 149.446 6.43507 147.195 4.18463C144.945 1.93419 141.893 0.669922 138.71 0.669922ZM129.24 43.5999V129.47H21.9099V22.1299H129.24V43.5999Z" fill="black" />
              <path d="M95.7799 43.6001H55.3799C52.1973 43.6001 49.145 44.8644 46.8946 47.1148C44.6442 49.3652 43.3799 52.4175 43.3799 55.6001V96.0001C43.3799 99.1827 44.6442 102.235 46.8946 104.485C49.145 106.736 52.1973 108 55.3799 108H95.7799C98.9625 108 102.015 106.736 104.265 104.485C106.516 102.235 107.78 99.1827 107.78 96.0001V55.6001C107.78 52.4175 106.516 49.3652 104.265 47.1148C102.015 44.8644 98.9625 43.6001 95.7799 43.6001Z" fill="black" />
              <path d="M267.51 43.6001H227.11C223.927 43.6001 220.875 44.8644 218.625 47.1148C216.374 49.3652 215.11 52.4175 215.11 55.6001V96.0001C215.11 99.1827 216.374 102.235 218.625 104.485C220.875 106.736 223.927 108 227.11 108H267.51C270.692 108 273.745 106.736 275.995 104.485C278.246 102.235 279.51 99.1827 279.51 96.0001V55.6001C279.51 52.4175 278.246 49.3652 275.995 47.1148C273.745 44.8644 270.692 43.6001 267.51 43.6001Z" fill="black" />
              <path d="M310.44 0.669922H184.18C180.997 0.669922 177.945 1.93419 175.694 4.18463C173.444 6.43507 172.18 9.48732 172.18 12.6699V138.93C172.18 142.112 173.444 145.165 175.694 147.415C177.945 149.666 180.997 150.93 184.18 150.93H310.44C313.622 150.93 316.675 149.666 318.925 147.415C321.175 145.165 322.44 142.112 322.44 138.93V12.6699C322.44 9.48732 321.175 6.43507 318.925 4.18463C316.675 1.93419 313.622 0.669922 310.44 0.669922ZM301 43.5999V129.47H193.64V22.1299H301V43.5999Z" fill="black" />
              <path d="M178 215.33H193.61V231C193.613 232.552 194.231 234.04 195.33 235.137C196.428 236.234 197.917 236.85 199.47 236.85H209.23C209.998 236.85 210.759 236.699 211.469 236.405C212.178 236.111 212.823 235.68 213.366 235.136C213.91 234.593 214.341 233.948 214.635 233.239C214.929 232.529 215.08 231.768 215.08 231V215.33H230.69C231.459 215.331 232.221 215.181 232.932 214.887C233.643 214.594 234.289 214.163 234.833 213.62C235.377 213.077 235.809 212.431 236.104 211.721C236.398 211.011 236.55 210.249 236.55 209.48V199.72C236.55 198.951 236.398 198.189 236.104 197.479C235.809 196.769 235.377 196.123 234.833 195.58C234.289 195.036 233.643 194.606 232.932 194.312C232.221 194.019 231.459 193.869 230.69 193.87H215.11V178.25C215.11 176.698 214.494 175.21 213.396 174.113C212.299 173.016 210.811 172.4 209.26 172.4H178C176.448 172.4 174.96 173.016 173.863 174.113C172.766 175.21 172.15 176.698 172.15 178.25V209.48C172.15 211.031 172.766 212.519 173.863 213.616C174.96 214.714 176.448 215.33 178 215.33Z" fill="black" />
              <path d="M252.2 215.33H242.43C239.199 215.33 236.58 217.949 236.58 221.18V230.95C236.58 234.181 239.199 236.8 242.43 236.8H252.2C255.431 236.8 258.05 234.181 258.05 230.95V221.18C258.05 217.949 255.431 215.33 252.2 215.33Z" fill="black" />
              <path d="M295.13 215.33H285.36C282.129 215.33 279.51 217.949 279.51 221.18V230.95C279.51 234.181 282.129 236.8 285.36 236.8H295.13C298.361 236.8 300.98 234.181 300.98 230.95V221.18C300.98 217.949 298.361 215.33 295.13 215.33Z" fill="black" />
              <path d="M316.6 236.8H306.83C303.599 236.8 300.98 239.419 300.98 242.65V252.42C300.98 255.651 303.599 258.27 306.83 258.27H316.6C319.831 258.27 322.45 255.651 322.45 252.42V242.65C322.45 239.419 319.831 236.8 316.6 236.8Z" fill="black" />
              <path d="M316.59 172.4H263.9C262.348 172.4 260.859 173.016 259.76 174.113C258.661 175.21 258.043 176.697 258.04 178.25V209.48C258.043 211.032 258.661 212.52 259.76 213.617C260.859 214.714 262.348 215.33 263.9 215.33H273.66C275.212 215.33 276.7 214.714 277.797 213.616C278.894 212.519 279.51 211.031 279.51 209.48V193.87H316.59C317.359 193.87 318.121 193.718 318.831 193.424C319.541 193.129 320.187 192.697 320.73 192.153C321.273 191.609 321.704 190.963 321.998 190.252C322.291 189.541 322.441 188.779 322.44 188.01V178.25C322.44 176.698 321.824 175.21 320.727 174.113C319.63 173.016 318.142 172.4 316.59 172.4Z" fill="black" />
              <path d="M215.11 285.59C215.111 284.821 214.961 284.059 214.667 283.348C214.374 282.637 213.943 281.991 213.4 281.447C212.857 280.902 212.211 280.471 211.501 280.176C210.791 279.881 210.029 279.73 209.26 279.73H193.64V242.65C193.64 241.098 193.024 239.61 191.926 238.513C190.829 237.416 189.341 236.8 187.79 236.8H178C176.448 236.8 174.96 237.416 173.863 238.513C172.766 239.61 172.15 241.098 172.15 242.65V316.81C172.149 317.579 172.299 318.341 172.592 319.052C172.886 319.762 173.316 320.409 173.86 320.953C174.403 321.497 175.049 321.929 175.759 322.224C176.469 322.518 177.231 322.67 178 322.67H187.76C188.529 322.67 189.291 322.518 190.001 322.224C190.711 321.929 191.357 321.497 191.9 320.953C192.443 320.409 192.874 319.762 193.167 319.052C193.461 318.341 193.611 317.579 193.61 316.81V301.2H209.23C210.781 301.2 212.269 300.583 213.366 299.486C214.464 298.389 215.08 296.901 215.08 295.35L215.11 285.59Z" fill="black" />
              <path d="M316.59 279.73H301V264.12C301 263.351 300.848 262.589 300.554 261.879C300.259 261.169 299.827 260.523 299.283 259.98C298.739 259.437 298.093 259.006 297.382 258.712C296.671 258.419 295.909 258.269 295.14 258.27H285.39C284.621 258.269 283.859 258.419 283.148 258.712C282.437 259.006 281.791 259.437 281.247 259.98C280.703 260.523 280.271 261.169 279.976 261.879C279.682 262.589 279.53 263.351 279.53 264.12V279.73H258V264.12C258 262.568 257.384 261.08 256.287 259.983C255.19 258.886 253.702 258.27 252.15 258.27H221C220.231 258.269 219.469 258.419 218.758 258.712C218.047 259.006 217.401 259.437 216.857 259.98C216.313 260.523 215.881 261.169 215.586 261.879C215.292 262.589 215.14 263.351 215.14 264.12V273.88C215.14 274.649 215.292 275.411 215.586 276.121C215.881 276.831 216.313 277.477 216.857 278.02C217.401 278.564 218.047 278.994 218.758 279.288C219.469 279.581 220.231 279.731 221 279.73H236.61V295.35C236.61 296.901 237.226 298.389 238.324 299.487C239.421 300.584 240.909 301.2 242.46 301.2H258V316.81C258 318.364 258.617 319.855 259.716 320.954C260.815 322.053 262.306 322.67 263.86 322.67H273.62C274.389 322.67 275.151 322.518 275.861 322.224C276.572 321.929 277.217 321.497 277.76 320.953C278.304 320.409 278.734 319.763 279.028 319.052C279.321 318.341 279.471 317.579 279.47 316.81V301.2H301V316.81C300.999 317.579 301.149 318.341 301.443 319.052C301.736 319.763 302.167 320.409 302.71 320.953C303.253 321.497 303.899 321.929 304.609 322.224C305.32 322.518 306.081 322.67 306.85 322.67H316.61C317.379 322.67 318.141 322.518 318.851 322.224C319.562 321.929 320.207 321.497 320.75 320.953C321.294 320.409 321.724 319.763 322.018 319.052C322.311 318.341 322.461 317.579 322.46 316.81V285.59C322.461 284.819 322.31 284.056 322.016 283.344C321.721 282.631 321.289 281.984 320.743 281.44C320.198 280.895 319.55 280.464 318.837 280.17C318.125 279.877 317.361 279.727 316.59 279.73Z" fill="black" />
              <path d="M230.73 301.2H220.96C217.729 301.2 215.11 303.819 215.11 307.05V316.82C215.11 320.051 217.729 322.67 220.96 322.67H230.73C233.961 322.67 236.58 320.051 236.58 316.82V307.05C236.58 303.819 233.961 301.2 230.73 301.2Z" fill="black" />
              <path d="M95.7799 215.33H55.3799C52.1973 215.33 49.145 216.594 46.8946 218.845C44.6442 221.095 43.3799 224.147 43.3799 227.33V267.73C43.3799 270.913 44.6442 273.965 46.8946 276.215C49.145 278.466 52.1973 279.73 55.3799 279.73H95.7799C98.9625 279.73 102.015 278.466 104.265 276.215C106.516 273.965 107.78 270.913 107.78 267.73V227.33C107.78 224.147 106.516 221.095 104.265 218.845C102.015 216.594 98.9625 215.33 95.7799 215.33Z" fill="black" />
              <path d="M138.71 172.4H12.4399C9.25734 172.4 6.20509 173.664 3.95465 175.915C1.70421 178.165 0.439941 181.217 0.439941 184.4V310.67C0.439941 313.852 1.70421 316.905 3.95465 319.155C6.20509 321.406 9.25734 322.67 12.4399 322.67H138.71C141.893 322.67 144.945 321.406 147.195 319.155C149.446 316.905 150.71 313.852 150.71 310.67V184.4C150.71 181.217 149.446 178.165 147.195 175.915C144.945 173.664 141.893 172.4 138.71 172.4ZM129.24 215.33V301.2H21.9099V193.87H129.24V215.33Z" fill="black" />
            </svg>
            <input id="qr" type="file" className='hidden' onChange={HandlerOnChange} accept="image/* " />
          </label>
        </div>
      </div>
    </section>







  )
}




