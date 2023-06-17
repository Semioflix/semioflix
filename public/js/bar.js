const searchSerie = document.querySelector('.search-serie');
const searchResult = document.querySelector('.search-result');
const searchInput = document.querySelector('.search-serie input');

searchSerie.addEventListener('click', () => searchResult.style.display = 'block');

searchInput.addEventListener('blur', () => setTimeout(() => {
  searchResult.style.display = 'none';
  result.innerHTML = '';
}, 200));

searchInput.addEventListener('keyup', () => {
  const searchValue = searchInput.value.toLowerCase();
  const result = document.querySelector('#search-result');

  result.innerHTML = '';

  if (searchValue.length > 2) {
    fetch('/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchValue })
    })
      .then(res => res.json())
      .then(data => {
        result.innerHTML = '';

        data.forEach(serie => {
          let element = createElements("div", {
            class: "result"
          },
            {},
            [{
              tag: "a",
              attributes: {
                href: "/serie/" + serie.id
              },
              childrens: [{
                tag: "img",
                attributes: {
                  class: "serie-cover",
                  src: serie.cover,
                  alt: serie.title
                }
              }, {
                tag: "div",
                childrens: [{
                  tag: "h3",
                  attributes: {
                    class: "serie-title"
                  },
                  othersAttributes: {
                    innerHTML: serie.title
                  }
                }, {
                  tag: "p",
                  attributes: {
                    class: "serie-description"
                  },
                  othersAttributes: {
                    innerHTML: serie.description
                  }
                }, {
                  tag: "span",
                  attributes: {
                    class: "serie-yaer"
                  },
                  othersAttributes: {
                    innerHTML: "Produzido em: " + new Date(serie.createdAt).getFullYear()
                  }
                }]
              }]
            }
            ]);

          result.appendChild(element);
        })
      });
  }
})