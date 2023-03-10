const showPass = document.getElementById("genPass");
const charLen = document.getElementById("charLen");
const len = document.getElementById("len");
const upperCheck = document.getElementById("upperCheck");
const lowerCheck = document.getElementById("lowerCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");
const passStrength = document.getElementById("passStrength");
const indicator_1 = document.getElementById("indicator-1");
const indicator_2 = document.getElementById("indicator-2");
const indicator_3 = document.getElementById("indicator-3");
const indicator_4 = document.getElementById("indicator-4");
const indicator_5 = document.getElementById("indicator-5");
const genPassBtn = document.getElementById("genPassBtn");
var number = "0123456789";
var letterCase = "abcdefghijklmnopqrstuvwxyz";
const symbol = "!@#$^-_";
var points = 1;

password();
function password() {
  var pass = "";
  let passLen = len.value;
  
  let i = 0;
  while (i < passLen) {
    const xValue = generateX();
    pass += xValue;
    i++;
  }
  indicatorCheck(pass);
  showPass.innerText = pass;
}

function generateX() {
  const newPass = [];
  if (upperCheck.checked) {
    newPass.push(upperLetters());
  }
  if (lowerCheck.checked) {
    points++;
    newPass.push(lowerLetters());
  }
  if (numberCheck.checked) {
    points++;
    newPass.push(getNumber());
  }
  if (specialCheck.checked) {
    points++;
    newPass.push(getSpecial());
  }
  if (
    !(
      upperCheck.checked ||
      lowerCheck.checked ||
      numberCheck.checked ||
      specialCheck.checked
    )
  ) {
    newPass = ["A", "J", "K"];
  }
  return newPass[Math.floor(Math.random() * newPass.length)];
}

function upperLetters() {
  const upperCase = letterCase.toUpperCase();
  return upperCase[Math.floor(Math.random() * upperCase.length)];
}

function lowerLetters() {
  return letterCase[Math.floor(Math.random() * letterCase.length)];
}

function getNumber() {
  return number[Math.floor(Math.random() * number.length)];
}
function getSpecial() {
  return symbol[Math.floor(Math.random() * symbol.length)];
}

function changeStrn() {
  charLen.innerText = len.value;

  if (
    upperCheck.checked &&
    lowerCheck.checked &&
    numberCheck.checked &&
    specialCheck.checked
  ) {
    if (len.value >= 4) {
      genPassBtn.style.backgroundColor = "#A6FEB0";
      genPassBtn.disabled = false;
    } else {
      genPassBtn.disabled = true;
      genPassBtn.style.backgroundColor = "gray";
    }
  } else {
  }
}

function indicatorCheck(password) {
  const strengthValue = ["Weak", "Normal", "Medium", "Strong", "Excellent"];

  var upper = 0,
    lower = 0,
    number = 0,
    special = 0;
  for (var i = 0; i < password.length; i++) {
    if (password[i] >= "A" && password[i] <= "Z") upper++;
    else if (password[i] >= "a" && password[i] <= "z") lower++;
    else if (password[i] >= "0" && password[i] <= "9") number++;
    else special++;
  }
  
  if (password.length > 6) {
    if (upper && lower && number && special) {
      passStrength.innerText = strengthValue[4];
      indicatorLight(5);
    } else if ((upper && number && special) || lower) {
      passStrength.innerText = strengthValue[3];
      indicatorLight(4);
    } else if ((upper && lower && special) || number) {
      passStrength.innerText = strengthValue[2];
      indicatorLight(3);
    } else if ((upper && number && lower) || special) {
      passStrength.innerText = strengthValue[1];
      indicatorLight(2);
    } else if (upper || lower || special || number) {
      passStrength.innerText = strengthValue[0];
      indicatorLight(1);
    }
  }

  function indicatorLight(times) {
    for (let i = 1; i <= times; i++) {
      document.getElementById(`indicator-${i}`).style.backgroundColor =
        "#4ade80";
    }

    while (times < 5) {
      document.getElementById(`indicator-${times + 1}`).style.backgroundColor =
        "gray";
      times++;
    }
  }
}

function validate() {
  if (
    !upperCheck.checked &&
    !lowerCheck.checked &&
    numberCheck &&
    !numberCheck.checked &&
    !specialCheck.checked &&
    numberCheck
  ) {
    genPassBtn.style.backgroundColor = "gray";
    genPassBtn.disabled = true;
  } else {
    genPassBtn.style.backgroundColor = "#A6FEB0";
    genPassBtn.disabled = false;
  }

  changeStrn();
}
