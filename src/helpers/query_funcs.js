import addDays from './date_funcs';

function getCompoundInterest(bank_data, days) {
  let i = 0;
  for (let j = 0; j < bank_data.length; j++) {
    if (bank_data[j].max_time >= days) {
      i = j;
      break;
    }
  }

  var offlineRate = bank_data[i].interest_rate / 10000 + 1;
  var onlineRate = bank_data[i].interest_rate_online / 10000 + 1;

  if (days % 30 === 0) {
    offlineRate = offlineRate ** (days / 30);
    onlineRate = onlineRate ** (days / 30);
  } else {
    let pay_date_aux = days - (days % 30);
    offlineRate = offlineRate ** (pay_date_aux / 30 + 1);
    onlineRate = onlineRate ** (pay_date_aux / 30 + 1);
  }

  return { offlineRate, onlineRate };
}

function getQueryResult(bank_data, amount, days) {
  const { offlineRate, onlineRate } = getCompoundInterest(bank_data, days);

  const offlineSum = amount * offlineRate;
  const onlineSum  = amount * onlineRate;

  const pay_date = addDays(new Date(), days);
  
  return {
    offlineRate,
    onlineRate,
    offlineSum,
    onlineSum,
    pay_date,
  }
}

function winnerBank(banks, amount, days) {
  let winner = banks[0];
  let winnerResult = getQueryResult(banks[0].data, amount, days);
  for (let i = 1; i < banks.length; i++) {
    const bank = banks[i];
    const bankResult = getQueryResult(bank.data, amount, days);
    if (bankResult.offlineRate > winnerResult.offlineRate) {
      winner = bank;
      winnerResult = bankResult;
    }
  }

  return { 
    bank_name: winner.name,
    ...winnerResult,
   };
}

export default winnerBank;