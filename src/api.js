
const API_KEY = "0a9b9d39e3e102a0e8cdc64ffdfb90b09aec1b7510662589798fa7aa1e275d62";

// общая функция по работе с fetch
async function getData(url) {
  try {
    const response = await fetch(url)

    if(!response.ok) throw new Error('Возникла ошибка в получении данных через fetch')

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getDataForAvailableCoinList = async () => {
  const response = await getData(`https://min-api.cryptocompare.com/data/blockchain/list?api_key=${API_KEY}`)

  const data = await response.json()

  return Object.keys(data.Data)
}

