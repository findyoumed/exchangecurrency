// 박스 2개 만들기
// 드랍다운 리스트 만들기
// 환율정보 넣어두기
// 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
// 금액을 입력하면 환전이 된다
// 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 됨
// 반대로 밑에 박스에서 숫자를 바꿔도 위의 박스에 환율이 적용이 된다
// 숫자를 한국어로 읽는 법

const currencyRatio = {
    YEN: {
      USD: 0.0074,
      KRW: 9.65,
      YEN: 1,
      unit: " ￥",
      // img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png",
      img: "",
    },
    USD: {
      USD: 1,
      KRW: 1299.9,
      YEN: 134.74,
      unit: " $",
      // img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
      img: "",
    },
    KRW: {
      USD: 0.00077,
      KRW: 1,
      YEN: 0.10,
      unit: " ￦",
      // img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
      img: "",
    },
  };
  console.log("달러", currencyRatio.USD.unit);
  console.log("원", currencyRatio["KRW"]["unit"]);
  console.log("엔", currencyRatio["YEN"].unit);

  var unitWords = ["", "만", "억", "조", "경"];
  var splitUnit = 10000;
  let toButton = document.getElementById("to-button");
  let fromButton = document.getElementById("from-button");
  let toCurrency = "USD";
  let fromCurrency = "USD";
  
  console.log("선택", document.querySelectorAll("#from-currency-list li"));
  // document.querySelectorAll("#from-currency-list li").forEach(function (item) {
  //   item.addEventListener("click", function () {
  //     fromCurrency = this.id;
  //     fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
  //     convert("from");
  //   });
  // });

  document.querySelectorAll("#from-currency-list li")
  .forEach((menu) => menu.addEventListener("click", function() {
    // 버튼을 가져온다
    console.log("버튼을 누른 다음 선택되는 element", document.getElementById("from-button"));
    // 버튼에 값을 바꾼다
    document.getElementById("from-button").textContent = this.textContent;
    // 선택된 currency 값을 변수에 저장
      // fromCurrency = this.id;
      fromCurrency = this.textContent;
      console.log("fromCurrency는", fromCurrency);
      // fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
      convert("from");
  }));

  document.querySelectorAll("#to-currency-list li").forEach(function (item) {
    item.addEventListener("click", function () {
      toCurrency = this.id;
      toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
      convert("to");
    });
  });
  
  function convert(type) {
    console.log("keyup event issue. 교환받는 돈 계산");
    
    // 환전
    // 얼마를 환전? 가지고 있는 돈이 뭔지, 바꾸고자 하는 돈이 뭔지
    // 돈 * 환율 = 환전금액

    let amount = 0;
    if (type == "from") {
      // 입력갑 받기
      amount = document.getElementById("fromAmount").value;
      console.log("얼마나", amount);

      // 환전하기
      let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
      console.log("환전결과", convertedAmount);
      // 환전한 값 보여주기
      document.getElementById("toAmount").value = convertedAmount;
      // 환전한 값 한국어로
      renderKoreanNumber(amount, convertedAmount);
    } else {
      amount = document.getElementById("toAmount").value;
      let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
      document.getElementById("fromAmount").value = convertedAmount;
      renderKoreanNumber(convertedAmount, amount);
    }
  }

  function renderKoreanNumber(from, to) {
    document.getElementById("fromNumToKorea").textContent =
      readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent =
      readNum(to) + currencyRatio[toCurrency].unit;
  }

  function readNum(num) {
    let resultString = "";
    let resultArray = [];
    for (let i = 0; i < unitWords.length; i++) {
      let unitResult =
        (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }
    for (let i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    return resultString;
  }