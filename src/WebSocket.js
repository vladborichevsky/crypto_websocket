
const API_KEY = "0a9b9d39e3e102a0e8cdc64ffdfb90b09aec1b7510662589798fa7aa1e275d62";

const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

let resultData = {};

socket.addEventListener('message', (event) => { 
  const answer = JSON.parse(event.data) 

  if (answer.TYPE === '5' && answer.TYPE !== undefined) { 
    if(Object.keys(resultData).includes(answer.FROMSYMBOL)) {
      Object.keys(resultData).forEach(item => {
        if(answer.FROMSYMBOL == item){
          resultData[answer.FROMSYMBOL] = answer.PRICE
        }
      })
    } else {
      resultData[answer.FROMSYMBOL] = answer.PRICE
    }
  }
}); 

export const getDataByWebSocket = () => {
  return resultData
}

export const sendNewMessageToWebSocketToSub = (tickerList) => {
  const messageArr = []
  
  tickerList.forEach(ticker => {
    messageArr.push(`5~CCCAGG~${ticker}~USD`)
  })

  let message = JSON.stringify({"action": "SubAdd", "subs": messageArr})

  // нужна эта запись, потому что наша отправка данных в отдельной функции и обработчик событий не срабатывает
  if (socket.readyState === WebSocket.OPEN) { 
    socket.send(message);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(message);
    },
    { once: true }
  );
};


export const sendNewMessageToWebSocketToSubRemove = (ticker) => {
  const message = JSON.stringify({"action": "SubRemove", "subs": [`5~CCCAGG~${ticker}~USD`]})

  // нужна эта запись, потому что наша отправка данных в отдельной функции и обработчик событий не срабатывает
  if (socket.readyState === WebSocket.OPEN) { 
    socket.send(message);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(message);
    },
    { once: true }
  );
}





