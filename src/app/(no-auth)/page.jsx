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

    <section className='relative min-h-screen p-5 md:p-12 pt-[50px] flex flex-col justify-around bg-[#2cdcffb4] '>
      

        <div className='flex flex-col items-center justify-center'>
          <img src="/logo.jpeg" className='w-[150px] md:w-[250px] md:h-[200px] ' alt="" />
          <h1 className='text-[27px] text-center font-bold  '>SEDUCA INFORMA</h1>
          <h2 className='text-center text-[20px] uppercase'>subdirección de educación superior de formación profesional <br /> LA PAZ - 2024</h2>
        </div>
      


      <div className='relative h-[80%] flex flex-col max-h-[300px] space-y-10 md:space-y-0 md:flex-row gap-5 p-5 md:p-10'>

        <div className='text-[16px] w-full flex flex-col justify-center items-center shadow-2xl border p-12 bg-white space-y-12'>
          <p className='font-bold text-[16px] uppercase leading-relaxed '>
            Información de Institutos <br /> técnicos tecnológicos <br />públicos y privados <br /> LA PAZ - EL ALTO <br /> 2024

            <br />
            <Link href='/Info' className=''>
              <button className='mt-5 flex items-center text-white  bg-[#3d57d6] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-800      rounded-[5px] border    text-center  p-2 px-5'>
                Acceder a info
              </button>
            </Link>
          </p>


        </div>
        <div className='flex flex-col w-full justify-center items-center text-[16px] shadow-2xl border p-10 bg-white space-y-5'>
          <p className='text-[18px] font-bold'>Accede fácilmente a travez de nuestro código QR</p>
          <img src="/qr.png" className='h-[150px]' alt="" />
        </div>
      </div>
    </section>

  


  )
}




