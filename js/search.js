/* =======================
// Menu and Search
======================= */

var searchOpenIcon = $(".search-button"),
searchCloseIcon = $(".search__close"),
searchInput = $(".search__text"),
searchBox = $(".search");

searchOpenIcon.click(function () {
  searchOpen();
});

searchCloseIcon.click(function () {
  searchClose();
});

function searchOpen() {
  searchBox.addClass("is-visible");
  setTimeout(function () {
    searchInput.focus();
  }, 300);
}

function searchClose() {
  searchBox.removeClass("is-visible");
}

$('.search, .search__box').on('click keyup', function (event) {
  if (event.target == this || event.keyCode == 27) {
    $('.search').removeClass('is-visible');
  }
});

// =====================
// Simple Jekyll Search
// =====================
var sjs = SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/search.json',
  // searchResultTemplate: "",
  // noResultsText: '<li class="no-results"><h3>검색 결과가 없습니다.</h3></li>'
})
