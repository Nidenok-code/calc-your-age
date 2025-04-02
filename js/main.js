const inputForm = document.forms.input.querySelectorAll("input");
const btn = document.querySelector("button");
const outText = document.querySelectorAll(".outputSpan");

btn.addEventListener("click", () => {
  let accept = 0;
  const now = new Date();
  const data = new Date(
    inputForm[2].value,
    inputForm[1].value - 1,
    inputForm[0].value
  );

  if (data.getTime() > now.getTime()) {
    inputForm.forEach((item, index) => {
      if (index === 0) {
        invalidDate(item, `Must be a valid date`);
      } else {
        invalidDate(item, ``);
      }
    });
    return null;
  } else {
    inputForm.forEach((item) => {
      validDate(item);
    });
  }

  inputForm.forEach((item) => {
    if (item.value !== "" && isFinite(item.value) && item.value > 0) {
      if (item.name === "day") {
        if (
          item.value <=
          new Date(data.getFullYear(), data.getMonth(), 0).getDate()
        ) {
          accept += 1;
        } else {
          invalidDate(item, `Must be a valid ${item.name}`);
        }
      } else if (item.name === "month") {
        if (item.value <= 12) {
          accept += 1;
        } else {
          invalidDate(item, `Must be a valid ${item.name}`);
        }
      } else {
        accept += 1;
      }
    } else if (item.value === "") {
      invalidDate(item, "This field is required");
    } else {
      invalidDate(item, `Must be a valid ${item.name}`);
    }
  });

  if (accept === 3) {
    inputForm.forEach((item) => {
      validDate(item);
    });
    let year = now.getFullYear() - inputForm[2].value;
    let month = now.getMonth() - data.getMonth();
    let day = now.getDate() - data.getDate();
    if (day < 0) {
      month--;
      day += new Date(data.getFullYear(), data.getMonth(), 0).getDate();
    }
    if (month < 0) {
      year--;
      month += 12;
    }
    outText[0].innerText = year;
    outText[1].innerText = month;
    outText[2].innerText = day;
  }
});

function allInvalid() {}

function invalidDate(item, note) {
  item.style.borderColor = "#FF5959";
  item.previousElementSibling.style.color = "#FF5959";
  item.nextElementSibling.innerText = note;
}

function validDate(item) {
  item.style.borderColor = "#DCDCDC";
  item.previousElementSibling.style.color = "#716F6F";
  item.nextElementSibling.innerText = "";
}
