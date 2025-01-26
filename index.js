let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

// 4. new function define

function createAndUppendSearchResult(result) {
  let {title, link, description} = result;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  let linkBreakEl = document.createElement("br");
  resultItemEl.appendChild(linkBreakEl);

  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  resultItemEl.appendChild(urlEl);

  let titleBreakEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakEl);

  let discriptionEl = document.createElement("p");
  discriptionEl.classList.add("link-description");
  discriptionEl.textContent = description;
  resultItemEl.appendChild(discriptionEl);

  searchResultsEl.appendChild(resultItemEl);
}

// 3. new function define
function displayResult(search_results) {
  spinnerEl.classList.add("d-none");

  for (let result of search_results) {  
    createAndUppendSearchResult(result);
  }
}

// 2. define function
function searchWikipedia(event) {
  if (event.key === "Enter") {
    searchResultsEl.textContent = "";
    spinnerEl.classList.remove("d-none");
    let searchInput = searchInputEl.value;
    // console.log(searchInput)

    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
    let options = {
      method: "GET",
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let { search_results } = jsonData;
        displayResult(search_results);
      });
  }
}

// 1. add eventListener
searchInputEl.addEventListener("keydown", searchWikipedia);
