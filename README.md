# 💰 My Budget Tracker

React + TypeScript로 만든 개인 예산 관리 앱입니다.  
수입과 지출을 입력하고, 잔액을 실시간으로 확인할 수 있습니다.


## 🚀 주요 기능

- 수입/지출 항목 추가
- 거래 수정 및 삭제
- 항목별 합계 (총 수입 / 총 지출 / 잔액)
- **로컬 스토리지**에 자동 저장 (새로고침해도 데이터 유지)


## 🛠️ 사용 기술

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **LocalStorage**


## 📦 프로젝트 구조
src
 ┣ assets
 ┃ ┗ react.svg
 ┣ components
 ┃ ┣ EditTransactionForm.tsx
 ┃ ┣ TransactionForm.tsx
 ┃ ┣ TransactionItem.tsx
 ┃ ┣ TransactionList.tsx
 ┃ ┗ TransactionSummary.tsx
 ┣ App.css
 ┣ App.tsx
 ┣ index.css
 ┣ main.tsx
 ┣ types.ts
 ┗ vite-env.d.ts
