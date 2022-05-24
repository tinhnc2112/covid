
// const api = 'https://api.covidtracking.com/v1/us/daily.json'
// var fetchDatas = []
// function fetchData() {
//     fetch(api)
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (data) {
//             fetchDatas = data.map(({ positive, recovered, death, dateChecked: date }) => ({
//                 positive,
//                 recovered,
//                 death,
//                 date
//             }));
//             console.log("fdj");
//             console.log(fetchDatas);
//             const datas = {
//                 labels: fetchDatas.map(({ date }) =>
//                     new Date(date).toLocaleDateString(),
//                 ),
//                 datasets: [
//                     {
//                         data: fetchDatas.map((data) => data.positive),
//                         borderColor: '#3333ff',
//                         label: 'Infected',
//                         fill: true,
//                     }, {
//                         data: fetchDatas.map((data) => data.death),
//                         borderColor: 'red',
//                         backgroundColor: "rgba(255, 0, 0, 0.5)",
//                         label: 'Deaths',
//                         fill: true,
//                     }, {
//                         data: fetchDatas.map((data) => data.recovered),
//                         borderColor: 'green',
//                         backgroundColor: "rgba(0, 255, 0, 0.5)",
//                         label: 'Recovered',
//                         fill: true,
//                     }
//                 ]
//             };

//             const config = {
//                 type: 'line',
//                 data: datas,
//                 options: {}
//             };
//             const myChart = new Chart(
//                 document.getElementById('myChart'),
//                 config
//             );
//         })
// }
// fetchData()

const apiDetail = 'https://api.covidtracking.com/v1/us/daily.json'
const apiCommon = 'https://covid19.mathdro.id/api'
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const fetchDataCommon = async () => {
    let response = await fetch(apiCommon)
    let dataCommon = await response.json()
    return dataCommon
}
fetchDataCommon().then(dataCommon => {
    const recoveredValue = new Intl.NumberFormat().format(dataCommon.recovered.value)
    const infectedValue = new Intl.NumberFormat().format(dataCommon.confirmed.value)
    const deadthsValue = new Intl.NumberFormat().format(dataCommon.deaths.value)
    const dateChecked = new Date(dataCommon.lastUpdate).toLocaleDateString("en-US", options)
    let htmlRecovered = `<p>Recovered</p>
    <p style="font-size:24px">${recoveredValue}</p>
    <p>${dateChecked}</p>
    <p>Number of recoveries from COVID-19.</p>
    `
    let htmlInfected = `<p>Infected</p>
    <p style="font-size:24px">${infectedValue}</p>
    <p>${dateChecked}</p>
    <p>Number of recoveries from COVID-19.</p>
    `
    let htmlDeaths = `<p>Deaths</p>
    <p style="font-size:24px">${deadthsValue}</p>
    <p>${dateChecked}</p>
    <p>Number of recoveries from COVID-19.</p>
    `
    document.querySelector('.recovered').innerHTML = htmlRecovered
    document.querySelector('.infected').innerHTML = htmlInfected
    document.querySelector('.deaths').innerHTML = htmlDeaths

})
const fetchCountries = async () => {
    let response = await fetch(apiCommon + '/countries')
    let dataCountries = await response.json()
    return dataCountries
}

fetchCountries().then(countries => {
    debugger
    let html = countries.countries.map((country) =>
        `<option>${country.name}</option>`,
    )

    // console.log(countries)
    document.querySelector('.option_countries').innerHTML = html
})
const fetchDataDetail = async () => {
    let response = await fetch(apiDetail)
    let dataDetail = await response.json()
    return dataDetail;
}

fetchDataDetail().then(dataDetail => {
    console.log(dataDetail)
    const datas = {
        labels: dataDetail.map(({ dateChecked }) =>
            new Date(dateChecked).toLocaleDateString(),
        ),
        datasets: [
            {
                data: dataDetail.map((data) => data.positive),
                borderColor: '#3333ff',
                label: 'Infected',
                fill: true,
            }, {
                data: dataDetail.map((data) => data.death),
                borderColor: 'red',
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                label: 'Deaths',
                fill: true,
            }, {
                data: dataDetail.map((data) => data.recovered),
                borderColor: 'green',
                backgroundColor: "rgba(0, 255, 0, 0.5)",
                label: 'Recovered',
                fill: true,
            }
        ]
    };

    const config = {
        type: 'line',
        data: datas,
        options: {}
    };
    const covid_chart = new Chart(
        document.getElementById('covid_chart'),
        config
    );
});
