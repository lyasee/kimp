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
              'KRW-ETC',
              'KRW-XRP',
              'KRW-MLK',
              'KRW-BTT',
              'KRW-DOGE',
              'KRW-STRAX',
              'KRW-IOTA',
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
