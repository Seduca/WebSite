'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'
import { writeUserData, removeData } from '@/firebase/utils'
import Select from '@/components/SelectSimple'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import InputFlotante from '@/components/InputFlotante'
import QRCode from "qrcode.react";







export default function Home() {




    const { setUserSuccess, success, trackingDB, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})
    const [data2, setData2] = useState({})

    const [db, setdb] = useState(null)





    function handlerSelectClick3(name, i, index) {
        setData2({ ...data2, [`item${index}`]: { ...data2[`item${index}`], [name]: i } })
        return
    }
    function handlerSelectClick4(e, index, d) {
        console.log(e.target.checked)
        setData2({ ...data2, [`item${index}`]: { ...data2[`item${index}`], [e.target.name]: e.target.checked } })
        return
    }



    function saveFrontPage2(e) {
        e.preventDefault()
        setUserSuccess('Cargando')
        writeUserData(`/Institutos/${query}/carreras`, data2, setUserSuccess)
    }
    function close(e) {
        router.back()
    }
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
        if (trackingDB && trackingDB[query] && trackingDB[query].carreras) {
            setData2({ ...trackingDB[query].carreras, ...data2 })
        }
    }, [cliente, query, trackingDB])
    console.log(trackingDB)
    return (
        <section className='h-screen p-5 md:p-12  bg-white'>

            <div className='flex justify-center'>

                <img src="/logo.jpeg" className='w-[80px]' alt="" />
            </div>
            <h1 className='text-[20px] text-center font-bold'>SEDUCA INFORMA</h1>
            <h2 className='text-center text-[16px]'>Subdireccion de educacion superior de formacion profesional <br /> LA PAZ - 2024</h2>


            {trackingDB && trackingDB[query] && <div className="relative  pt-5 sm:col-span-3 mb-5 pb-5 "  >
                <div className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl  '>

                    <br />
                    <div className='flex flex-col md:flex-row md:justify-between'>
                        Nombre de instituto:  {trackingDB[query]['NOMBRE DE INSTITUTO']}
                        <br />
                        Resolucion Ministerial:  {trackingDB[query]['RESOLUCION MISTERIAL']}
                        <br />
                        Categoria: {trackingDB[query]['PROPIEDAD']}
                        <br />
                        Pagina Web:  {trackingDB[query]['LINK DE PAGINA']}
                        <div className='w-full flex flex-col items-center justify-center md:items-end pt-10 md:pt-0'>
                            <div className='relative h-[150px] w-[150px]'>
                                <QRCode
                                    id={`qr`}
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%", border: '10px', backgroundColor: 'white' }}
                                    value={trackingDB[query]['LINK DE UBICACION']}
                                    level={'H'}
                                    includeMargin={true}
                                    renderAs={'canvas'}
                                    viewBox={`0 0 256 256`}
                                    imageSettings={{ src: '/logo-circle.png', height: 100, width: 100, escavate: false }}
                                />
                            </div>
                            <h4>Escanea la ubicacion en GPS</h4>
                        </div>



                    </div>



                    {trackingDB && trackingDB[query] && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 "  >
                        <div className='relative p-5 my-5 mt-10 bg-white space-y-5   '>

                            <h5 className='text-center font-medium text-[16px]'>CARRERAS<br /> </h5>


                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                    <thead class="text-xs text-gray-800 uppercase bg-gray-50  ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 ">
                                                Carrera
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Tipo de carrera
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Horarios
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data2 && data2 && Object.values(data2).map((item, index) => {
                                            return <tr class="bg-white border-b ">



                                                <td scope="row" class="px-6 py-4">
                                                    {item[`ip`]}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {item[`ic`]}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {data2[`item${index}`].mañana && 'Mañana'} <br />  {data2[`item${index}`].tarde && ', Tarde' + <br />}  {data2[`item${index}`].noche && 'Noche'}
                                                </td>

                                            </tr>





                                        })
                                        }

                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </form>}








                </div>
            </div>}




        </section>
    )
}

