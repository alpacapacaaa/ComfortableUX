export interface Receipt {
  id: number;
  senderName: string;
  senderBank: string;
  senderAccount: string;
  receiverName: string;
  receiverBank: string;
  receiverAccount: string;
  amount: number;
  memo: string;
  date: string;
  approvalNo: string;
}

export const ME = {
  name: "이하늘",
  bank: "Comfortable Bank",
  account: "110-****-4821",
  balance: 3482910,
};

// 실제 은행이 아닌 가상의 은행 이름만 사용한다.
const OTHER_BANKS = ["한별은행", "다온저축은행", "포레스트뱅크", "미래드림뱅크"];
const SURNAMES = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오"];
const GIVEN_NAMES = [
  "민준", "서연", "도윤", "하윤", "시우", "지안", "예준", "수아",
  "주원", "지우", "현우", "다은", "건우", "서준", "유나", "재현",
];
const MEMOS = ["생일선물", "월세", "용돈", "정산", "공동경비", "경조사비", "치킨값", "적금", "카드값", "회식비"];

function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function pick<T>(arr: T[], seed: number) {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function maskedAccount(seed: number) {
  const prefix = 100 + Math.floor(seededRandom(seed) * 800);
  const suffix = 1000 + Math.floor(seededRandom(seed + 1) * 8999);
  return `${prefix}-****-${suffix}`;
}

function approvalNumber(id: number) {
  return `88${String(id).padStart(6, "0")}`;
}

const ID_BASE = 20400;

function dateForId(id: number) {
  // id가 커질수록 시간이 조금씩 흐르는 것처럼 보이게 한다.
  const base = new Date("2026-07-18T09:00:00");
  const minutesOffset = (id - ID_BASE) * 11;
  const d = new Date(base.getTime() + minutesOffset * 60000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function generateStrangerReceipt(id: number): Receipt {
  const senderName = pick(SURNAMES, id * 10 + 1) + pick(GIVEN_NAMES, id * 10 + 2);
  const receiverName = pick(SURNAMES, id * 10 + 3) + pick(GIVEN_NAMES, id * 10 + 4);
  const amount = 10000 + Math.floor(seededRandom(id * 10 + 5) * 430) * 1000;

  return {
    id,
    senderName,
    senderBank: pick(OTHER_BANKS, id * 10 + 6),
    senderAccount: maskedAccount(id * 10 + 7),
    receiverName,
    receiverBank: pick(OTHER_BANKS, id * 10 + 8),
    receiverAccount: maskedAccount(id * 10 + 9),
    amount,
    memo: pick(MEMOS, id * 10 + 10),
    date: dateForId(id),
    approvalNo: approvalNumber(id),
  };
}

// 로그인한 "나"의 실제 거래 4건. 전역 순번 체계 위에 흩어져 있다는 설정.
export const MY_RECEIPTS: Record<number, Receipt> = {
  20475: {
    id: 20475,
    senderName: ME.name,
    senderBank: ME.bank,
    senderAccount: ME.account,
    receiverName: "박서준",
    receiverBank: "한별은행",
    receiverAccount: "552-****-1190",
    amount: 12000,
    memo: "점심값",
    date: "2026.07.20 12:41",
    approvalNo: "48839201",
  },
  20483: {
    id: 20483,
    senderName: ME.name,
    senderBank: ME.bank,
    senderAccount: ME.account,
    receiverName: "최윤아",
    receiverBank: "다온저축은행",
    receiverAccount: "301-****-7734",
    amount: 120000,
    memo: "경조사비",
    date: "2026.07.21 09:15",
    approvalNo: "48839344",
  },
  20491: {
    id: 20491,
    senderName: "주식회사 드림페이롤",
    senderBank: "미래드림뱅크",
    senderAccount: "901-****-2200",
    receiverName: ME.name,
    receiverBank: ME.bank,
    receiverAccount: ME.account,
    amount: 2350000,
    memo: "급여",
    date: "2026.07.22 10:03",
    approvalNo: "48839412",
  },
  20498: {
    id: 20498,
    senderName: ME.name,
    senderBank: ME.bank,
    senderAccount: ME.account,
    receiverName: "주식회사 드림모바일",
    receiverBank: "포레스트뱅크",
    receiverAccount: "773-****-0091",
    amount: 58000,
    memo: "통신비",
    date: "2026.07.22 18:47",
    approvalNo: "48839477",
  },
};

export const MY_RECEIPT_IDS = Object.keys(MY_RECEIPTS)
  .map(Number)
  .sort((a, b) => a - b);

export function getReceipt(id: number): Receipt {
  return MY_RECEIPTS[id] ?? generateStrangerReceipt(id);
}

export const HOME_TRANSACTIONS = [
  { id: 20498, title: "주식회사 드림모바일", date: "07.22 18:47", amount: 58000, direction: "out" as const },
  { id: 20491, title: "주식회사 드림페이롤", date: "07.22 10:03", amount: 2350000, direction: "in" as const },
  { id: 20483, title: "최윤아", date: "07.21 09:15", amount: 120000, direction: "out" as const },
  { id: 20475, title: "박서준", date: "07.20 12:41", amount: 12000, direction: "out" as const },
];

export const ID_MIN = ID_BASE;
export const ID_MAX = ID_BASE + 200;
