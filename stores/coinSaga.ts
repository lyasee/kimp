import { call, put, flush, delay, takeLatest } from 'redux-saga/effects';
import { buffers, eventChannel } from 'redux-saga';
import { setConnected, setItem } from './coin';
import * as encoding from 'text-encoding';

const createSocket = () => {
  let _client = new WebSocket('wss://api.upbit.com/websocket/v1');
  _client.binaryType = 'arraybuffer';
  return _client;
};

const sendSocket = (socket: WebSocket) => {
  socket.send(
    JSON.stringify([
      { ticket: 'kimp-app-2021' + new Date().getTime() },
      {
        type: 'ticker',
        codes: [
          'KRW-XEC',
          'KRW-MATIC',
          'KRW-SOL',
          'KRW-NU',
          'KRW-BTC',
          'KRW-ETH',
          'KRW-NEO',
          'KRW-MTL',
          'KRW-LTC',
          'KRW-XRP',
          'KRW-ETC',
          'KRW-OMG',
          // 'KRW-SNT',
          'KRW-WAVES',
          'KRW-XEM',
          'KRW-QTUM',
          'KRW-LSK',
          // 'KRW-STEEM',
          'KRW-XLM',
          'KRW-ARDR',
          'KRW-KMD',
          // 'KRW-ARK',
          'KRW-STORJ',
          // 'KRW-GRS',
          'KRW-REP',
          // 'KRW-EMC2',
          'KRW-ADA',
          // 'KRW-SBD',
          // 'KRW-POWR',
          'KRW-BTG',
          'KRW-ICX',
          'KRW-EOS',
          'KRW-TRX',
          'KRW-SC',
          // 'KRW-IGNIS',
          'KRW-ONT',
          'KRW-ZIL',
          // 'KRW-POLY',
          'KRW-ZRX',
          // 'KRW-LOOM',
          'KRW-BCH',
          // 'KRW-ADX',
          'KRW-BAT',
          'KRW-IOST',
          // 'KRW-DMT',
          // 'KRW-RFR',
          'KRW-CVC',
          'KRW-IQ',
          'KRW-IOTA',
          'KRW-MFT',
          'KRW-ONG',
          // 'KRW-GAS',
          // 'KRW-UPP',
          // 'KRW-ELF',
          'KRW-KNC',
          // 'KRW-BSV',
          'KRW-THETA',
          // 'KRW-EDR',
          // 'KRW-QKC',
          'KRW-BTT',
          // 'KRW-MOC',
          'KRW-ENJ',
          'KRW-TFUEL',
          'KRW-MANA',
          'KRW-ANKR',
          'KRW-AERGO',
          'KRW-ATOM',
          // 'KRW-TT',
          // 'KRW-CRE',
          // 'KRW-SOLVE',
          'KRW-MBL',
          // 'KRW-TSHP',
          // 'KRW-WAXP',
          'KRW-HBAR',
          // 'KRW-MED',
          // 'KRW-MLK',
          'KRW-STPT',
          // 'KRW-ORBS',
          'KRW-VET',
          'KRW-CHZ',
          // 'KRW-PXL',
          'KRW-STMX',
          // 'KRW-DKA',
          'KRW-HIVE',
          'KRW-KAVA',
          // 'KRW-AHT',
          'KRW-LINK',
          'KRW-XTZ',
          // 'KRW-BORA',
          'KRW-JST',
          // 'KRW-CRO',
          // 'KRW-TON',
          'KRW-SXP',
          // 'KRW-LAMB',
          // 'KRW-HUNT',
          // 'KRW-MARO',
          // 'KRW-PLA',
          'KRW-DOT',
          'KRW-SRM',
          // 'KRW-MVL',
          // 'KRW-PCI',
          'KRW-STRAX',
          // 'KRW-AQT',
          // 'KRW-BCHA',
          // 'KRW-GLM',
          // 'KRW-QTCON',
          // 'KRW-SSX',
          // 'KRW-META',
          // 'KRW-OBSR',
          // 'KRW-FCT2',
          // 'KRW-LBC',
          // 'KRW-CBK',
          'KRW-SAND',
          // 'KRW-HUM',
          'KRW-DOGE',
          // 'KRW-STRK',
          'KRW-PUNDIX',
          // 'KRW-FLOW',
          // 'KRW-DAWN',
          'KRW-AXS',
          'KRW-STX',
          // 'KRW-BTC',
          // 'KRW-ETH',
          // 'KRW-ETC',
          // 'KRW-XRP',
          // 'KRW-MLK',
          // 'KRW-BTT',
          // 'KRW-DOGE',
          // 'KRW-STRAX',
          // 'KRW-IOTA',
        ],
      },
    ]),
  );
};

const connectSocket = (socket: WebSocket, buffer: any) => {
  return eventChannel((emit) => {
    socket.onopen = () => {
      sendSocket(socket);
    };

    socket.onmessage = (event: WebSocketMessageEvent) => {
      try {
        const enc = new encoding.TextDecoder('utf-8');
        const arr = new Uint8Array(event.data);
        const data = JSON.parse(enc.decode(arr));
        emit(data);
      } catch (error) {}
    };

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  }, buffer || buffers.none());
};

const createConnectSocketSaga = () => {
  return function* (): any {
    let count = 0;
    const client = yield call(createSocket);
    const clientChannel = yield call(connectSocket, client, buffers.expanding(500));

    while (true) {
      if (count > 5) {
        client.send('PING');
        count = 0;
      }

      count = count + 1;

      try {
        const datas = yield flush(clientChannel);

        if (datas.length) {
          const temp: any = {};
          datas.forEach((data: any) => {
            if (temp[data.code]) {
              temp[data.code] = temp[data.code].timestamp > data.timestamp ? temp[data.code] : data;
            } else {
              temp[data.code] = data;
            }
          });

          yield put(setItem(temp));
        }
        yield delay(1000);
      } catch (e) {}
    }
  };
};

const getCoinDataSaga = createConnectSocketSaga();

export function* coinSaga() {
  yield takeLatest(setConnected, getCoinDataSaga);
  yield getCoinDataSaga();
}
