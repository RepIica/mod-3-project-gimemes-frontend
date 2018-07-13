const Gif = (() => {

  const all = []

  return class {
    constructor(gif){
      this.id = gif.id
      this.title = gif.title
      this.url = gif.images.original.url

      all.push(this)
    }
    static getAll(){
      return [...all]
    }
  }

})()
