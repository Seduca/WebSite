'use client';

import { PDFDownloadLink, Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font, Link, dataUrl } from "@react-pdf/renderer";
import { useState, useRef, useEffect } from 'react'
import Button from './Button'
import { useUser } from '@/context/Context'
import QRCode from "qrcode.react";
// Font.register({
//     family: "Inter",
//     fonts: [
//         { src: "/roboto/roboto-v30-latin-300.ttf", fontWeight: 'light' },
//         { src: "/roboto/roboto-v30-latin-300italic.ttf", fontStyle: 'italic' },
//         { src: "/roboto/roboto-v30-latin-500.ttf", fontWeight: 'medium' },
//         { src: "/roboto/roboto-v30-latin-700.ttf", fontWeight: 'bold' },
//         { src: "/roboto/roboto-v30-latin-500italic.ttf", fontStyle: 'italic', fontWeight: 'bold' },

//     ]
// })

Font.register({
    family: "Inter",
    fonts: [
        { src: "/Montserrat/static/Montserrat-Light.ttf", fontWeight: 'light' },
        { src: "/Montserrat/static/Montserrat-Medium.ttf", fontWeight: 'medium' },
        { src: "/Montserrat/static/Montserrat-Bold.ttf", fontWeight: 'bold' },
        { src: "/Montserrat/static/Montserrat.ttf", fontStyle: 'italic', fontWeight: 'bold' },

    ]
})

const styles = StyleSheet.create({
    body: {
        padding: ".8cm",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#ffffff",
        fontSize: "10px",
        fontWeight: "100",
    },
    container: {
        position: 'relative',
        width: "100%",
    },
    inViewo: {
        position: 'relative',
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: '20px 0px'
    },
    box: {
        position: 'relative',
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#294B98",


    },
    img: {
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
    },

    logo: {
        position: "relative",
        height: "",
        width: "300px",
        marginLeft: "35px",
    },
    title: {
        margin: "0px",
        width: "50%",
        padding: "5px 1px 2px 10px ",
        border: "1px solid #294B98",
        borderRight: "none",
        color: "white",
        textAlign: 'center',
        fontSize: '10px',
        fontFamily: 'Inter',
        fontWeight: 'medium',
    },
    key: {
        margin: "0px",
        width: "50%",
        padding: "5px 1px 2px 10px ",
        border: "1px solid #294B98",
        borderRight: "none",
        backgroundColor: "#D9E8EE",
        color: "black",
        fontSize: "10px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        fontFamily: 'Inter',
        fontWeight: 'medium',
    },
    value: {
        margin: "0px",
        width: "50%",
        padding: "5px 1px 2px 10px ",
        border: "1px solid #294B98",
        // backgroundColor: "#D9E8EE",
        color: "black",
        fontSize: "10px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        fontFamily: 'Inter',
        fontWeight: 'light',

    },
    textBox: {
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Inter',
        fontWeight: 'bold',
    },
    textExtraBold: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
    },
    textBold: {
        fontFamily: 'Inter',
        fontWeight: 'medium',
    },
    textLight: {
        fontFamily: 'Inter',
        fontWeight: 'light',
    },
})






const PDFView = ({ click }) => {
    // const { pdfData, setUserPdfData, calcValueFCL, setCalcValueFCL, naviera, calcValue, setCalcValue, element, setElement, cliente } = useUser()

    const { setUserSuccess, success, trackingDB, queryDB, cliente, dataUrl, setDataUrl, } = useUser()
    const [data2, setData2] = useState({})

    const [isCliente, setisCliente] = useState(false);

    const Br = () => "\n";

    // useEffect(() => {
    //     if (window && typeof window !== "undefined") {
    //         setQuery(window.location.href.split('=')[1].replaceAll('%20', ' '))
    //     }

    // }, [cliente, query, trackingDB])


    let query = 'Don Bosco'


    console.log(data2)


    useEffect(() => {
        setisCliente(true)
        if (trackingDB && trackingDB[query] && trackingDB[query].carreras) {
            setData2({ ...trackingDB[query].carreras, ...data2 })
        }
        // setUserPdfData({ tarifa: [''], oViewosGastos: [''], incluye: [''], excluye: [''], notas: [''], ...pdfData })
    }, [cliente, query, trackingDB]);


    return (
        <div style={{ display: 'block', width: '100vw', textAlign: 'center', zIndex: '50' }} className="-[#505050]">
            <PDFViewer style={{ width: '100vw', height: '100vh', }}>
                <Document style={{ width: '100vw' }}>
                    <Page style={styles.body} size="A4" fixed  >

                        {/* <View style={styles.container}>
                            <View style={styles.box}>
                                <Text style={styles.title}>COTIZACIÓN</Text>
                            </View>

                            <View style={styles.inViewo}>

                                <Image style={styles.logo} src="/logo-horizontal.png" />

                            </View>



                            {element === 'FTL' && calcValue &&
                                <>
                                    <View style={styles.box}>
                                        <Text style={styles.title}>DETALLES</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.key}>ORIGEN</Text><Text style={styles.value}>{calcValue['ORIGEN']}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.key}>DESTINO</Text><Text style={styles.value}>{calcValue['DESTINO']}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.key}>MERCACIA</Text><Text style={styles.value}>{calcValue['MERCANCIA']}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.key}>PESO</Text><Text style={styles.value}>{calcValue['PESO (KG)']}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.key}>VOLUMEN</Text><Text style={styles.value}>{calcValue['VOLUMEN M3']}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.key}>TIPO DE UNIDAD</Text><Text style={styles.value}>{calcValue['TIPO DE UNIDAD']}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.key}>SERVICIO</Text><Text style={styles.value}>{calcValue['SERVICIO']}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.key}>FLETE USD</Text><Text style={styles.value}>{calcValue['FLETE USD']}</Text>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={styles.key}>SERVICIOS LOGISTICOS USD</Text><Text style={styles.value}>{calcValue['SERVICIOS LOGISTICOS USD']}</Text>
                                    </View>
                                </>
                            }




                            {element === 'FCL' && calcValueFCL &&
                                <>
                                    {calcValueFCL !== 'NO DATA' &&
                                        calcValueFCL.map((item) => {

                                            return naviera === item.NAVIERA && <>
                                                <View style={styles.box}>
                                                    <Text style={styles.title}>DETALLES</Text>
                                                </View>
                                                <View style={styles.content}>
                                                    <Text style={styles.key}>Origen</Text><Text style={styles.value}>{item.ORIGEN}</Text>
                                                </View>
                                                <View style={styles.content}>
                                                    <Text style={styles.key}>Destino</Text><Text style={styles.value}>{item.DESTINO}</Text>
                                                </View>
                                                <View style={styles.content}>
                                                    <Text style={styles.key}>Equipo</Text><Text style={styles.value}>{item.EQUIPO}</Text>
                                                </View>
                                                <View style={styles.content}>
                                                    <Text style={styles.key}>TT</Text><Text style={styles.value}>{item.TT}</Text>
                                                </View>
                                                {item.flete && <View style={styles.box}>
                                                    <Text style={styles.title}>FLETE</Text>
                                                </View>}
                                                {item.flete && Object.enViewies(item.flete).map((i, index) => <View style={styles.content}>
                                                    <Text style={styles.key}>{i[1].ip}</Text><Text style={styles.value}>{i[1].ic}</Text>
                                                </View>)}
                                                {item['recargos origen'] && <View style={styles.box}>
                                                    <Text style={styles.title}>RECARGOS ORIGEN</Text>
                                                </View>}
                                                {item['recargos origen'] && Object.enViewies(item['recargos origen']).map((i, index) => <View style={styles.content}>
                                                    <Text style={styles.key}>{i[1].ip}</Text><Text style={styles.value}>{i[1].ic}</Text>
                                                </View>)}
                                                {item['recargos destino'] && <View style={styles.box}>
                                                    <Text style={styles.title}>RECARGOS DESTINO</Text>
                                                </View>}
                                                {item['recargos destino'] && Object.enViewies(item['recargos destino']).map((i, index) => <View style={styles.content}>
                                                    <Text style={styles.key}>{i[1].ip}</Text><Text style={styles.value}>{i[1].ic}</Text>
                                                </View>)}

                                                <View style={styles.content}>
                                                    <Text style={{ width: '50%' }}></Text>
                                                    <Text style={{ width: '50%', backgroundColor: 'yellow', padding: '3px', textAlign: 'right', fontFamily: 'Inter', fontWeight: 'medium' }}>Fecha maxima de vigencia de cotizacion: {item.VALIDEZ.split('-').reverse().map((e) => e + '/')}</Text>
                                                </View>
                                            </>

                                        })
                                    }

                                </>
                            }
                            <View style={styles.content}>
                                <Text style={{ width: '100%', padding: '3px', textAlign: 'center', color: 'black', fontFamily: 'Inter', fontWeight: 'medium', fontSize: '10px'}}>
                                    <Br /> <Br />La cotización esta sujeta a los diferentes movientos del mercado en general, PARA UN COTIZACIÓN MAS CERTERA CONTANOS O VISITANOS EN: <Br /> <Br />
                                </Text>
                            </View>

                            <View style={styles.content}>
                                <Text style={{ width: '100%', padding: '3px', textAlign: 'center', color: '#294B98', fontSize: '10px', fontFamily: 'Inter', fontWeight: 'medium', }}>
                                    <Br /> {cliente.contactos.gmail}<Br />
                                    Telf:  {cliente.contactos.telefono}  Cel: {cliente.contactos.celular}<Br />
                                    {cliente.contactos['direccion 1']}  {cliente.contactos['direccion 2']}<Br />
                                    {cliente.contactos.departamento} - BOLIVIA
                                </Text>
                            </View>




                        </View> */}




                        {trackingDB && trackingDB[query] && <View style={styles.container}  >
                            <View className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl md:p-[50px] '>





                                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom:'2px solid #505050', paddingBottom: '10px' }} >
                                    <Image source="/logo.jpeg" style={{width: '150px', height:'150px'}} ></Image>
                                    <Text style={{fontSize: '14px', ...styles.textExtraBold}}>SEDUCA INFORMA</Text>
                                    <Text style={{fontSize: '14px', textAlign: 'center', ...styles.textBold}}>subdirección de educación superior de formación profesional <Br /> LA PAZ - 2024</Text>
                                </View>









                                <Br />
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingVertical: '30px' }}>
                                    <View>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textBold}>Nombre del Instituto: </Text>
                                            <Text style={styles.textLight}>{trackingDB[query]['NOMBRE DE INSTITUTO']}</Text>
                                        </View>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textBold}>Resolución Ministerial: </Text>
                                            <Text style={styles.textLight}>{trackingDB[query]['RESOLUCIÓN MISTERIAL']}</Text>
                                        </View>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textBold}>Instituto: </Text>
                                            <Text style={styles.textLight}>{trackingDB[query]['TIPO DE INSTITUTO']}</Text>
                                        </View>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textBold}>Institución: </Text>
                                            <Text style={styles.textLight}>{trackingDB[query]['PROPIEDAD']}</Text>
                                        </View>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textBold}>Página Web: </Text>
                                            <Text style={styles.textLight}>{trackingDB[query]['LINK DE PÁGINA']}</Text>
                                        </View>
                                    </View>

                                    <View className='w-full md:w-[50%] flex flex-col items-center justify-center md:items-end pt-10 md:pt-0'>

                                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center', ...styles.textLight }}>Escanea la ubicación de la Institución con Google LENS <Br /> y ubícanos en Google MAPS</Text>

                                            <Image source={dataUrl} style={{ height: '150px', width: '150px' }}></Image>
                                            <Link href={trackingDB[query]['LINK DE UBICACIÓN']} className=''>
                                                <Text style={{}}>
                                                    Ubicar directamente con un Click aqui
                                                </Text>
                                            </Link>
                                        </View>

                                    </View>

                                </View>



                                {trackingDB && trackingDB[query] && <View className="relative  pt-5 sm:col-Text-3 mb-5 pb-5 "  >
                                    <View className='relative  my-5 mt-10 bg-[white] space-y-5   '>
                                        {/* <h5 className='text-center text-[10px] font-bold'>CARRERAS<Br /> </h5> */}
                                        <View class="relative overflow-x-auto">
                                            <View class="w-full text-[10px] text-left rtl:text-right text-gray-700 ">
                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', color: 'white', backgroundColor: '#3d57d6', padding: '5px', fontFamily: 'Inter', fontWeight: 'bold' }} >
                                                    <Text style={{ width: '33%' }}>
                                                        CARRERAS
                                                    </Text>
                                                    <Text style={{ width: '33%' }}>
                                                        NIVEL
                                                    </Text>
                                                    <Text style={{ width: '33%' }}>
                                                        TURNOS
                                                    </Text>
                                                </View>
                                                <View>
                                                    {data2 && data2 && Object.values(data2).map((item, index) => {
                                                        return <View style={{ backgroundColor: '#dee3ff', border: '1px solid black', borderTop: 'none', fontSize: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '5px' }}>
                                                            <Text style={{ width: '33%', ...styles.textLight }}>
                                                                {item[`ip`]}
                                                            </Text>
                                                            <Text style={{ width: '33%', ...styles.textLight }}>
                                                                {item[`ic`]}
                                                            </Text>
                                                            <Text style={{ width: '33%', ...styles.textLight }}>
                                                                {data2[`item${index}`].mañana && 'Mañana'}{data2[`item${index}`].tarde && 'Tarde'}{data2[`item${index}`].tarde && <Br />}{data2[`item${index}`].noche && 'Noche'}
                                                            </Text>
                                                        </View>
                                                    })}
                                                </View>
                                            </View>
                                        </View>


                                    </View>
                                </View>}




                            </View>
                        </View>}
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    )
}


export default PDFView














// import { useUser } from '@/context/Context'
// import { useEffect, useState } from 'react'
// import QRCode from "qrcode.react";
// import Link from 'next/link';

// export default function Home() {
//     const { setUserSuccess, success, trackingDB, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
//     const [query, setQuery] = useState('')
//     const [data2, setData2] = useState({})


//     useEffect(() => {
//         if (window && typeof window !== "undefined") {
//             setQuery(window.location.href.split('=')[1].replaceAll('%20', ' '))
//         }
//         if (trackingDB && trackingDB[query] && trackingDB[query].carreras) {
//             setData2({ ...trackingDB[query].carreras, ...data2 })
//         }
//     }, [cliente, query, trackingDB])
//     console.log(trackingDB)
//     return (
//         <section className='relative min-h-screen p-5 md:p-12 pt-[50px] flex flex-col justify-around bg-[#2cdcffb4] '>


//             <View className='flex flex-col items-center justify-center'>
//                 <img src="/logo.jpeg" className='w-[150px] md:w-[250px] md:h-[200px] ' alt="" />
//                 <h1 className='text-[27px] text-center font-bold  '>SEDUCA INFORMA</h1>
//                 <h2 className='text-center text-[20px] uppercase'>subdirección de educación superior de formación profesional <Br /> LA PAZ - 2024</h2>
//             </View>


//             {trackingDB && trackingDB[query] && <View className="relative  pt-5 sm:col-Text-3 mb-5 pb-5 "  >
//                 <View className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl md:p-[50px] '>

//                     <Br />
//                     <View className='flex w-full  flex-col md:flex-row md:justify-between md:items-center md:px-[150px]'>
//                         <View className='flex flex-col w-full md:w-[50%] text-[18px] '>
//                             <View>
//                                 <Text style={styles.textBold}>NomBre del Instituto: </Text> {trackingDB[query]['NOMBrE DE INSTITUTO']}
//                             </View>
//                             <View>
//                                 <Text style={styles.textBold}> Resolución Ministerial: </Text>{trackingDB[query]['RESOLUCIÓN MISTERIAL']}
//                             </View>
//                             <View>
//                                 <Text style={styles.textBold}> Instituto: </Text>{trackingDB[query]['TIPO DE INSTITUTO']}
//                             </View>
//                             <View>
//                                 <Text style={styles.textBold}>Institución:</Text>   {trackingDB[query]['PROPIEDAD']}
//                             </View>
//                             <View>
//                                 <Text style={styles.textBold}>Página Web:</Text>   {trackingDB[query]['LINK DE PÁGINA']}
//                             </View>
//                         </View>
//                         <View className='w-full md:w-[50%] flex flex-col items-center justify-center md:items-end pt-10 md:pt-0'>

//                             <View className='flex flex-col items-center justify-center md:items-center pt-10 md:pt-0 text-[10px]'>
//                                 <Text className='text-center'>Escanea la ubicación de la Institución con Google LENS <Br /> y ubícanos en Google MAPS</Text>

//                                 <View className='relative  h-[150px] w-[150px]'>
//                                     <QRCode
//                                         id={`qr`}
//                                         size={256}
//                                         style={{ height: "auto", maxwidth: "100%", width: "100%", border: '10px', backgroundColor: 'white' }}
//                                         value={trackingDB[query]['LINK DE UBICACIÓN']}
//                                         level={'H'}
//                                         includeMargin={Viewue}
//                                         renderAs={'canvas'}
//                                         viewBox={`0 0 256 256`}
//                                         imageSettings={{ src: '/logo-circle.png', height: 100, width: 100, escavate: false }}
//                                     />
//                                 </View>
//                                 <Link href={trackingDB[query]['LINK DE UBICACIÓN']} className=''>
//                                     <button className='flex items-center text-white  bg-[#3d57d6] hover:bg-gradient-to-Br focus:ring-2 focus:outline-none focus:ring-blue-800      rounded-[5px] border    text-center  p-2 px-5'>
//                                         Ubicar directamente
//                                     </button>
//                                 </Link>
//                             </View>

//                         </View>

//                     </View>



//                     {trackingDB && trackingDB[query] && <form className="relative  pt-5 sm:col-Text-3 mb-5 pb-5 "  >
//                         <View className='relative  my-5 mt-10 bg-[white] space-y-5   '>
//                             {/* <h5 className='text-center text-[10px] font-bold'>CARRERAS<Br /> </h5> */}
//                             <View class="relative overflow-x-auto">
//                                 <View class="w-full text-[10px] text-left rtl:text-right text-gray-700 ">
//                                     <View class="text-[10px] font-bold text-[#f1f1f1] uppercase bg-[#3d57d6]  ">
//                                         <View>
//                                             <Text  class="px-6 py-3 font-bold">
//                                                 Carreras
//                                             </Text>
//                                             <Text  class="px-6 py-3 font-bold">
//                                                 Nivel
//                                             </Text>
//                                             <Text  class="px-6 py-3 font-bold">
//                                                 Turnos
//                                             </Text>
//                                         </View>
//                                     </View>
//                                     <View>
//                                         {data2 && data2 && Object.values(data2).map((item, index) => {
//                                             return <View class="bg-[#dee3ff] border-b text-[10px] ">
//                                                 <Text scope="row" style={{width: '33%'}}>
//                                                     {item[`ip`]}
//                                                 </Text>
//                                                 <Text style={{width: '33%'}}>
//                                                     {item[`ic`]}
//                                                 </Text>
//                                                 <Text style={{width: '33%'}}>
//                                                     {data2[`item${index}`].mañana && 'Mañana'} <Br />  {data2[`item${index}`].tarde && 'Tarde'} {data2[`item${index}`].tarde && <Br />}  {data2[`item${index}`].noche && 'Noche'}
//                                                 </Text>

//                                             </View>
//                                         })}
//                                     </View>
//                                 </View>
//                             </View>


//                         </View>
//                     </form>}








//                 </View>
//             </View>}




//         </section>
//     )
// }
