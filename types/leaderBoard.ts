export interface IByBtLeaderBoardResponse {
  code: string;
  data: {
    list: ILeaderBoard[];
    longNum: number;
    longs: number;
    shortNum: number;
    shorts: number;
  };
  msg: string;
  success: boolean;
}

export interface ILeaderBoard {
  id: number;
  change7d: number;
  change24h: number;
  createTime: number;
  isRealName: boolean;
  predictedSide: number; // -1 , 1 Long, 2 Short
  price: number;
  profit: number;
  updateTime: number;
  userName: string;
}
