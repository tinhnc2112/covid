const apiDetail = 'https://api.covidtracking.com/v1/us/daily.json'
const apiCommon = 'https://covid19.mathdro.id/api'
var countryData = ''
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const fetchDataCommon = async (country) => {
    if (country) {
        let response = await fetch(`${apiCommon}/countries/${country}`)
        let dataCommon = await response.json()
        return dataCommon
    } else {
        let response = await fetch(apiCommon)
        let dataCommon = await response.json()
        return dataCommon
    }
}
// 
const renderCards = (item) => {
    const html = `
    <p>${item.title}</p>
    <p style="font-size:24px">${item.value}</p>
    <p>${item.date}</p>
    <p>${item.desc}</p>
    `
    document.querySelector(item.selector).innerHTML = html
}


fetchDataCommon().then(dataCommon => {
    const recoveredValue = new Intl.NumberFormat().format(dataCommon.recovered.value)
    const infectedValue = new Intl.NumberFormat().format(dataCommon.confirmed.value)
    const deathsValue = new Intl.NumberFormat().format(dataCommon.deaths.value)
    const dateChecked = new Date(dataCommon.lastUpdate).toLocaleDateString("en-US", options)
    const cards = {
        recovered: {
            title: 'Recovered',
            value: recoveredValue,
            date: dateChecked,
            desc: 'Number of recoveries from COVID-19.',
            selector: '.recovered'
        }, infected: {
            title: 'Infected',
            value: infectedValue,
            date: dateChecked,
            desc: 'Number of active cases from COVID-19.',
            selector: '.infected'
        }, deaths: {
            title: 'Deaths',
            value: deathsValue,
            date: dateChecked,
            desc: 'Number of deaths caused by COVID-19.',
            selector: '.deaths'
        }
    }

    renderCards(cards.recovered);
    renderCards(cards.infected);
    renderCards(cards.deaths);
})

const fetchCountries = async () => {
    let response = await fetch(`${apiCommon}/countries`)
    let dataCountries = await response.json()
    return dataCountries
}

fetchCountries().then(countries => {
    let html = countries.countries.map((country) =>
        `<option value="${country.name}">${country.name}</option>`,
    )
    document.querySelector('.option_countries').innerHTML = html
})

const countriesPicker = async (country) => {
    // const optionCountries = document.querySelector('.option_countries')
    // optionCountries.onchange = function () {
    // }
    // country = this.value
    countryData = country
    // fetchDataDetail(country)
    fetchDataCommon(country)
    fetchDataDetail(countryData).then(dataDetail => {
        console.log('hello')
        console.log(dataDetail);
        if (countryData) {
            const datas = {
                labels: ["Infected", "Recovered", "Deaths"]
                ,
                datasets: [
                    {
                        data: [dataDetail.confirmed.value],
                        borderColor: '#3333ff',
                        label: 'Infected',
                        fill: true,
                    }, {
                        data: [dataDetail.deaths.value],
                        borderColor: 'red',
                        backgroundColor: "rgba(255, 0, 0, 0.5)",
                        label: 'Deaths',
                        fill: true,
                    }, {
                        data: [dataDetail.recovered.value],
                        borderColor: 'green',
                        backgroundColor: "rgba(0, 255, 0, 0.5)",
                        label: 'Recovered',
                        fill: true,
                    }
                ]
            }
            const config = {
                type: 'bar',
                data: datas,
                options: {}
            };
            const covidChart = document.getElementById('covid_chart')

            const covid_chart = new Chart(
                covidChart, config
            );
            // if (covid_chart) {
            //     covid_chart.destroy()
            // }
        } else {
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
            }
            const config = {
                type: 'line',
                data: datas,
                options: {}
            };
            const covidChart = document.getElementById('covid_chart')

            const covid_chart = new Chart(
                covidChart, config
            );
            // if (covid_chart) {
            //     covid_chart.destroy()
            // }
        }
    });


}


// countriesPicker();

const fetchDataDetail = async (country) => {
    if (country) {
        let response = await fetch(`${apiCommon}/countries/${country}`)
        let dataDetail = await response.json()
        console.log(dataDetail)

        return dataDetail
    } else {
        let response = await fetch(apiDetail)
        let dataDetail = await response.json()
        return dataDetail;
    }
}

