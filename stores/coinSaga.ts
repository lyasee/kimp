import { call, put, flush, delay } from 'redux-saga/effects';
import { buffers, eventChannel } from 'redux-saga';
import { setItem } from './coin';
import * as encoding from 'text-encoding';

const createSocket = () => {
  const client = new WebSocket('wss://api.upbit.com/websocket/v1');
  client.binaryType = 'arraybuffer';
  return client;
};

const connectSocekt = (socket: WebSocket, buffer: any) => {
  return eventChannel((emit) => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify([
          { ticket: 'ddddqdqd-122122321223221' },
          {
            type: 'ticker',
            codes: [
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
              'KRW-BCHA',
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

    socket.onmessage = (event: WebSocketMessageEvent) => {
      const enc = new encoding.TextDecoder('utf-8');
      const arr = new Uint8Array(event.data);
      const data = JSON.parse(enc.decode(arr));
      emit(data);
    };

    socket.onerror = (event: WebSocketMessageEvent) => {
      emit(event);
    };

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  }, buffer || buffers.none());
};

const createConnectSocketSaga = () => {
  return function* (): any {
    const client = yield call(createSocket);
    const clientChannel = yield call(connectSocekt, client, buffers.expanding(500));

    while (true) {
      try {
        const datas = yield flush(clientChannel);

        if (datas.length) {
          const sortedObj: any = {};
          datas.forEach((data: any) => {
            if (sortedObj[data.code]) {
              sortedObj[data.code] =
                sortedObj[data.code].timestamp > data.timestamp ? sortedObj[data.code] : data;
            } else {
              sortedObj[data.code] = data;
            }
          });

          yield put(setItem(sortedObj));
        }
        yield delay(1000);
      } catch (e) {}
    }
  };
};

const getCoinDataSaga = createConnectSocketSaga();

export function* coinSaga() {
  yield getCoinDataSaga();
}
