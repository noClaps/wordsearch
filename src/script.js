// @ts-check

const wordtxt = await fetch("/words.txt").then((r) => r.text());
const words = wordtxt.split("\n");

const addFilterButton = document.querySelector("#add-filter");
if (!addFilterButton) throw new Error("Add filter button not found");
const searchButton = document.querySelector("#search");
if (!searchButton) throw new Error("Search button not found");

addFilterButton.addEventListener("click", () => {
  const filtersEl = document.querySelector(".filters");
  if (!filtersEl) throw new Error("Filters element not found");

  const select = document.createElement("select");

  for (const opt of [
    "starts-with",
    "ends-with",
    "contains",
    "is-of-length",
    "contains-all-of",
    "contains-any-of",
    "contains-only",
  ]) {
    const option = document.createElement("option");
    option.value = opt;
    option.innerText = opt.replaceAll("-", " ");
    select.appendChild(option);
  }

  const input = document.createElement("input");
  input.type = "text";

  const remove = document.createElement("button");
  remove.innerText = "✕";
  remove.addEventListener("click", () => {
    remove.parentElement?.remove();
  });

  const div = document.createElement("div");
  div.className = "filter";
  div.append("Word ", select, " ", input, remove);

  filtersEl.appendChild(div);
});

searchButton.addEventListener("click", () => {
  let filteredWords = words;

  const filterEls = document.querySelectorAll(".filter");
  for (const filterEl of filterEls) {
    const select = filterEl.querySelector("select");
    if (!select) throw new Error(`Select element not found in ${filterEl}`);
    const input = filterEl.querySelector("input");
    if (!input) throw new Error(`Input element not found in ${filterEl}`);

    switch (select.value) {
      case "starts-with":
        filteredWords = filteredWords.filter((w) => w.startsWith(input.value));
        break;
      case "ends-with":
        filteredWords = filteredWords.filter((w) => w.endsWith(input.value));
        break;
      case "contains":
        filteredWords = filteredWords.filter((w) => w.includes(input.value));
        break;
      case "is-of-length":
        const len = +input.value;
        if (!len || len < 1) {
          alert("Length filter must be a number greater than 0");
          return;
        }

        filteredWords = filteredWords.filter((w) => w.length === +input.value);
        break;
      case "contains-all-of": {
        const validChars = input.value.split("");
        filteredWords = filteredWords.filter((w) => {
          for (const c of validChars) {
            if (!w.includes(c)) return false;
          }
          return true;
        });
        break;
      }
      case "contains-any-of": {
        const validChars = input.value.split("");
        filteredWords = filteredWords.filter((w) => {
          for (const c of validChars) {
            console.log(w, c);
            if (w.includes(c)) return true;
          }
          return false;
        });
        break;
      }
      case "contains-only": {
        const validChars = input.value.split("");
        filteredWords = filteredWords.filter((w) => {
          for (const c of w.split("")) {
            if (!validChars.includes(c)) return false;
          }
          return true;
        });
        break;
      }
    }
  }

  const output = document.querySelector("output");
  if (!output) throw new Error("Output element not found");
  output.innerHTML = filteredWords.map((w) => `<span>${w}</span>`).join("");
});

export {};
