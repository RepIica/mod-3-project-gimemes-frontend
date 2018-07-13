class GifAdapter {

  search(input){
    const baseURL = `https://api.giphy.com/v1/gifs/search?q=${input}&limit=1&api_key=BQeVJRSOZLeAlYdrzp8n6g3lCT3VKrNS`
    return fetch(baseURL)
      .then(r => r.json())
  }
}
