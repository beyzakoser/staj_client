import React, { useEffect, useCallback } from 'react';
import MaterialTable from 'material-table';
import {
    useHistory,
    Link as RouterLink
} from "react-router-dom";
import axios from 'axios';
var veriler = [{},];
export default function ApplicationReviewTable() {
    const history = useHistory();
    const [universityInfo, setUniversityInfo] = React.useState('');
    const [state, setState] = React.useState({
        columns: [
            { title: 'Dersin Kodu', field: 'dersKodu' },
            { title: 'Dersin Adı', field: 'dersAdi' },
            { title: 'Kredi', field: 'kredi', type: 'numeric' },
            { title: 'AKTS', field: 'akts', type: 'numeric' },
            { title: 'Başarı Notu', field: 'basariNotu' },
            { title: 'FSMVU Dersin Kodu', field: 'fsmvuDersKodu' },
            { title: 'FSMVU Dersin Grubu', field: 'fsmvuDersGrubu' },
            { title: 'FSMVU Dersin Adı', field: 'fsmvuDersinAdi' },
            { title: 'FSMVU Kredi', field: 'fsmvuKredi', type: 'numeric' },
            { title: 'FSMVU AKTS', field: 'fsmvuAkts', type: 'numeric' },
            { title: 'FSMVU Başarı Notu', field: 'fsmvuBasariNotu' },
        ],
        data: [
            {
                dersKodu: '',
                dersAdi: ' ',
                kredi: '',
                akts: '',
                basariNotu: '',
                fsmvuDersKodu: '',
                fsmvuDersGrubu:'',
                fsmvuDersinAdi: '',
                fsmvuKredi: '',
                fsmvuAkts: '',
            },
         ],
    });
    const [dbLessons, setDbLessons] = React.useState({
        lessons: [
            {
                dersKodu: '',
                grupBilgisi:'',
                dersAd: '',
                kredi: '',
                akts:'',

            },
        ],
    });

    
    
// React.useEffect(() => {       
//     //console.log(history.location.state.applicationId);
//             axios.get(`http://localhost:3004/universiteAdi/${history.location.state.applicationId}`).then(response => {
//             //veriler=response.data
//             console.log(response.data);
//             //console.log(response.data[2].dersler);
//             //console.log("grubu"+response.data[2].dersler.grupBilgisi);

//             //setUniversityInfo(response.data[1].universiteAdi);

//             //console.log(dbLessons);
//             // setState({
//             //     columns: [
//             //         { title: universityInfo + ' Dersin Kodu', field: 'dersKodu' },
//             //         { title: universityInfo + ' Dersin Adı', field: 'dersAdi' },
//             //         { title: universityInfo + ' Kredi', field: 'kredi', type: 'numeric' },
//             //         { title: universityInfo + ' AKTS', field: 'akts', type: 'numeric' },
//             //         { title: universityInfo + ' Başarı Notu', field: 'basariNotu' },
//             //         { title: 'FSMVU Dersin Kodu', field: 'fsmvuDersKodu' },
//             //         { title: 'FSMVU Dersin Grubu', field: 'fsmvuDersGrubu' },
//             //         { title: 'FSMVU Dersin Adı', field: 'fsmvuDersinAdi' },
//             //         { title: 'FSMVU Kredi', field: 'fsmvuKredi', type: 'numeric' },
//             //         { title: 'FSMVU AKTS', field: 'fsmvuAkts', type: 'numeric' },
//             //         { title: 'FSMVU Başarı Notu', field: 'fsmvuBasariNotu' },
//             //     ],
//             //     data:response.data[0] //intibağı yapılması istenen dersler

                
//             // })
//             // setDbLessons({
//             //     lessons:response.data[2],
//             // })
//         }).catch(err => console.log(err));
        
//    }, []);
//    React.useEffect(() => {       
//             axios.get(`http://localhost:3004/mufredatDersleriListele`).then(response => {
          
//             console.log(response.data);

//         }).catch(err => console.log(err));
        
//    }, []);

React.useEffect(() => {  
    axios.all([
    axios.get(`http://localhost:3004/basvuruIncele/${history.location.state.applicationId}`),
    axios.get(`http://localhost:3004/universiteAdi/${history.location.state.applicationId}`),
     axios.get("http://localhost:3004/mufredatDersleriListele")
])
.then( axios.spread((...responses) => {
    //console.log(responses[0].data); //dersler
    // console.log(responses[1].data); //uniAdi
     console.log(responses); //mufredatDersleri
    
            setUniversityInfo(responses[1].data.universiteAdi);

            setState({
                columns: [
                    { title: universityInfo + ' Dersin Kodu', field: 'dersKodu' },
                    { title: universityInfo + ' Dersin Adı', field: 'dersAdi' },
                    { title: universityInfo + ' Kredi', field: 'kredi', type: 'numeric' },
                    { title: universityInfo + ' AKTS', field: 'akts', type: 'numeric' },
                    { title: universityInfo + ' Başarı Notu', field: 'basariNotu' },
                    { title: 'FSMVU Dersin Kodu', field: 'fsmvuDersKodu' },
                    { title: 'FSMVU Dersin Grubu', field: 'fsmvuDersGrubu' },
                    { title: 'FSMVU Dersin Adı', field: 'fsmvuDersinAdi' },
                    { title: 'FSMVU Kredi', field: 'fsmvuKredi', type: 'numeric' },
                    { title: 'FSMVU AKTS', field: 'fsmvuAkts', type: 'numeric' },
                    { title: 'FSMVU Başarı Notu', field: 'fsmvuBasariNotu' },
                ],
                data:responses[0].data //intibağı yapılması istenen dersler

                
            })
            setDbLessons({
                lessons:responses[2].data,
            }) 
        
})).catch(err => console.log(err));

}, [universityInfo],[dbLessons]);

//bu kısımdaki değişken adlarını sonradan değiştirmeyi unutma
useEffect(() => {
    for (let i = 0; i<state.data.length; i++){
        for (let k = 0; k<dbLessons.lessons.length; k++ ){
            if(state.data[i].fsmvuDersKodu === dbLessons.lessons[k].dersKodu){
                state.data[i].fsmvuDersGrubu = dbLessons.lessons[k].grupBilgisi;
                state.data[i].fsmvuDersinAdi = dbLessons.lessons[k].dersAd;
                state.data[i].fsmvuAkts = dbLessons.lessons[k].akts;
                state.data[i].fsmvuKredi = dbLessons.lessons[k].kredi;
            }
        }
        
    }
}, [state]); //kod şuan bu şekilde de çalışıyor ama normalde bir atama yapılmamıştı
    

    return (
        <MaterialTable
            title="İntibak Tablosu"
            columns={[
                {
                    title: state.columns[0].title,
                    field: 'dersKodu',
                    
                    cellStyle: {

                    },
                    headerStyle: {
                        backgroundColor: '#b07d62',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[1].title,
                    field: 'dersAdi',
                    headerStyle: {
                        backgroundColor: '#b07d62',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[2].title,
                    field: 'kredi',
                    type: 'numeric',
                    headerStyle: {
                        backgroundColor: '#b07d62',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[3].title,
                    field: 'akts',
                    type: 'numeric',
                    headerStyle: {
                        backgroundColor: '#b07d62',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[4].title,
                    field: 'basariNotu',
                    headerStyle: {
                        backgroundColor: '#b07d62',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[5].title,
                    field: 'fsmvuDersKodu',
                    headerStyle: {
                        backgroundColor: '#85182a',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[6].title,
                    field: 'fsmvuDersGrubu',
                    headerStyle: {
                        backgroundColor: '#85182a',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[7].title,
                    field: 'fsmvuDersinAdi',
                    headerStyle: {
                        backgroundColor: '#85182a',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[8].title,
                    field: 'fsmvuKredi',
                    type: 'numeric',
                    headerStyle: {
                        backgroundColor: '#85182a',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[9].title,
                    field: 'fsmvuAkts',
                    type: 'numeric',
                    headerStyle: {
                        backgroundColor: '#85182a',
                        color: 'white'
                    }
                },
                {
                    title: state.columns[10].title,
                    field: 'fsmvuBasariNotu',
                    headerStyle: {
                        backgroundColor: '#85182a',
                        color: 'white'
                    }
                }
            ]}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
            options={{
                rowStyle: {

                },
                cellStyle: {

                },
                headerStyle: {

                }
            }}
        />
    );
}
