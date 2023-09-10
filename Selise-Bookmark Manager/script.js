var title = document.querySelector("[name='title']");
var url = document.querySelector("[name='url']");
var categoryDropdown = document.querySelector("#category");
var button = document.querySelector(".save_button");

var bookmarksSection = document.querySelector(".bookmarks");

if (typeof(localStorage.bookmark) == "undefined") {
  localStorage.bookmark = "";
}

function addBookmark(name, link, category) {
  
  var bookmarkItem = document.createElement("div");
  bookmarkItem.classList.add("bookmark-item");

  
  var bookmarkName = document.createElement("span");
  bookmarkName.textContent = name;

  var visitLink = document.createElement("a");
  visitLink.href = link;
  visitLink.textContent = "Visit";
  visitLink.classList.add("visit");
  visitLink.setAttribute("target", "_blank");
  visitLink.dataset.link = link;

  var removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove");
  removeButton.addEventListener("click", function () {
    removeBookmark(this);
  });

  var categorySpan = document.createElement("span");
  categorySpan.textContent = "Category: " + category;

  bookmarkItem.appendChild(bookmarkName);
  bookmarkItem.appendChild(visitLink);
  bookmarkItem.appendChild(removeButton);
  bookmarkItem.appendChild(categorySpan);

  bookmarksSection.appendChild(bookmarkItem);
}

button.addEventListener("click", function (e) {
  e.preventDefault();

  let patternURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  let arrayItems, check = false, adr, itemAdr;

  var title = document.getElementById("title");

  if (title.value === "") {
    alert("Input The Bookmark Title First");
  } else if (title.value.length > 30) {
    alert("Bookmark Title must be at most 30 characters");
  } else if (url.value === "") {
    alert("you must fill the url input");
  } else if (!patternURL.test(url.value)) {
    alert("you must enter a valid url");
  } else {

    arrayItems = localStorage.bookmark.split(";");
    adr = url.value;
    adr = adr.replace(/http:\/\/|https:\/\//i, "");
    arrayItems.length--;

    for (item of arrayItems) {
      itemAdr = item.split(',')[1].replace(/http:\/\/|https:\/\//i, "");
      if (itemAdr == adr) {
        check = true;
      }
    }

    if (check == true) {
      alert("This website is already bookmarked");
    } else {
      var selectedCategory = categoryDropdown.value;
      localStorage.bookmark += `${title.value},${url.value},${selectedCategory};`;
      addBookmark(title.value, url.value, selectedCategory);
      title.value = "";
      url.value = "";
    }
  }
});

function removeBookmark(thisItem) {
  let arrayItems = [],
    index,
    item = thisItem.parentNode,
    itemURL = item.querySelector(".visit").dataset.link,
    itemName = item.querySelector("span").innerHTML;
  arrayItems = localStorage.bookmark.split(";");

  for (i in arrayItems) {
    if (arrayItems[i].startsWith(`${itemName},${itemURL}`)) {
      index = i;
      break;
    }
  }
  if (index !== undefined) {
    arrayItems.splice(index, 1);
    localStorage.bookmark = arrayItems.join(";");
  }
  bookmarksSection.removeChild(item);
}

(function fetchBookmark() {
  if (typeof(localStorage.bookmark) != "undefined" && localStorage.bookmark !== "") {
    let arrayItems = localStorage.bookmark.split(";");
    arrayItems.length--;
    for (item of arrayItems) {
      let itemSplit = item.split(',');
      addBookmark(itemSplit[0], itemSplit[1], itemSplit[2]);
    }
  }
})();

function Cancel(cancel){
 
  if(cancel=='cancel'){
      document.getElementById('title').value='';
      document.getElementById('url').value='';
  }

}