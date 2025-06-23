let makeURL = (per, page) => `https://api.are.na/v2/channels/sky-rngwpiq-quo?per=${per}&page=${page}`;

fetch(makeURL(1, 1))
  .then((res) => res.json())
  .then((json) => count = json.length)
  .then((count) => {
    let per = 100;
    let pages = Math.ceil(count/per);

    let fetches = [];
    for (let page = 1; page <= pages; page++) {
      fetches.push(fetch(makeURL(per, page)).then((res) => res.json()).then((json) => json.contents))
    }

    Promise.all(fetches)
      .then((contents) => {
        contents.forEach((content) => {
          content.forEach((c) => {
            let div = document.createElement('div');

            div.className = 'entry';
            if (c.class === 'Text') {
              let text = c.content_html;
              div.innerHTML = text ;
            } else if (c.class === 'Image') {
              div.innerHTML = '<a href="' + c.image.original.url + '" target="_blank"><img src="' + c.image.display.url + '"></a><div class="caption">' + c.title + '</div>';
            }
            document.getElementById('entries').insertBefore(div, document.getElementById('entries').childNodes[0]);
        });
      });
    });
  });
