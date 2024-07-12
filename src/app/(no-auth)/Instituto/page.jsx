'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'
import QRCode from "qrcode.react";
import Link from 'next/link';

export default function Home() {
    const { setUserSuccess, success, trackingDB, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const [query, setQuery] = useState('')
    const [data2, setData2] = useState({})


    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1].replaceAll('%20', ' '))
        }
        if (trackingDB && trackingDB[query] && trackingDB[query].carreras) {
            setData2({ ...trackingDB[query].carreras, ...data2 })
        }
    }, [cliente, query, trackingDB])
    console.log(trackingDB)
    return (
        <section className='min-h-screen p-5 md:p-12  bg-[#ffefef]'>

            <div className='flex justify-center'>

                <img src="/logo.jpeg" className='w-[80px]' alt="" />
            </div>
            <h1 className='text-[20px] text-center font-bold'>SEDUCA INFORMA</h1>
            <h2 className='text-center text-[16px] uppercase'>Subdireccion de educacion superior de formacion profesional <br /> LA PAZ - 2024</h2>


            {trackingDB && trackingDB[query] && <div className="relative  pt-5 sm:col-span-3 mb-5 pb-5 "  >
                <div className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl  '>

                    <br />
                    <div className='flex w-full  flex-col md:flex-row md:justify-between'>
                        <div className='flex flex-col w-full md:w-[50%] '>
                            <div>
                                <span className='font-bold'>Nombre de instituto: </span> {trackingDB[query]['NOMBRE DE INSTITUTO']}
                            </div>
                            <div>
                                <span className='font-bold'> Resolucion Ministerial: </span>{trackingDB[query]['RESOLUCION MISTERIAL']}
                            </div>
                            <div>
                                <span className='font-bold'> Tipo de instituto: </span>{trackingDB[query]['TIPO DE INSTITUTO']}
                            </div>
                            <div>
                                <span className='font-bold'>Categoria:</span>   {trackingDB[query]['PROPIEDAD']}
                            </div>
                            <div>
                                <span className='font-bold'>Pagina Web:</span>   {trackingDB[query]['LINK DE PAGINA']}
                            </div>
                        </div>
                        <div className='w-full md:w-[50%] flex flex-col items-center justify-center md:items-end pt-10 md:pt-0'>

                            <div className='flex flex-col items-center justify-center md:items-center pt-10 md:pt-0'>
                                <h4 className='text-center'>Escanea la ubicacion con Google LENS <br /> y ubicanos en GPS MAPS</h4>

                                <div className='relative  h-[150px] w-[150px]'>
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
                                <Link href={trackingDB[query]['LINK DE UBICACION']} className=''>
                                    <button className='flex items-center text-white  bg-[#ff5b5b] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-800      rounded-[5px] border    text-center  p-2 px-5'>
                                        Ubicar directamente
                                    </button>
                                </Link>
                            </div>

                        </div>

                    </div>



                    {trackingDB && trackingDB[query] && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 "  >
                        <div className='relative  my-5 mt-10 bg-[white] space-y-5   '>
                            {/* <h5 className='text-center text-[16px] font-bold'>CARRERAS<br /> </h5> */}
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-700 ">
                                    <thead class="text-[12px] font-bold text-gray-800 uppercase bg-[#ff5b5b]  ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 font-bold">
                                                Carreras
                                            </th>
                                            <th scope="col" class="px-6 py-3 font-bold">
                                                Nivel
                                            </th>
                                            <th scope="col" class="px-6 py-3 font-bold">
                                                Turnos
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data2 && data2 && Object.values(data2).map((item, index) => {
                                            return <tr class="bg-[#ffe1e1] border-b text-[12px] ">
                                                <td scope="row" class="px-6 py-4">
                                                    {item[`ip`]}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {item[`ic`]}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {data2[`item${index}`].mañana && 'Mañana'} <br />  {data2[`item${index}`].tarde && 'Tarde'} {data2[`item${index}`].tarde && <br />}  {data2[`item${index}`].noche && 'Noche'}
                                                </td>

                                            </tr>
                                        })}
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

