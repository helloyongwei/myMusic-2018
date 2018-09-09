{
  let view = {
    el: '.songInfo',
    template: `
    <form action="">
      <div class="row">
        <label for="name">歌名<input type="text" name="name" value="__name__"></label>
      </div>
      <div class="row">
        <label for="aritist">歌手<input type="text" name="aritist" value="__aritist__"></label>
      </div>
      <div class="row">
          <label for="url">url<input type="text" name="url" value="__url__"></label>
      </div>
      <input type="submit" value="保存">
    </form>
    `,
    render(data) {
      let placeholders = ["name", "aritist", "url"]
      var html = this.template
      placeholders.map((item) => {
        html = html.replace(`__${item}__`, data[item] || '')
      })
      $(this.el).html(html)
    }
  }
  let model = {
    data: {
      name: '',
      aritist: '',
      url: '',
    },
    create(data) {
       var Song = AV.Object.extend('Song');
       var song = new Song();
       song.set('name', data.name || '未知歌曲');
       song.set('aritist', data.aritist || '未知艺术家');
       song.set('url', data.url || '无');
       return song.save().then((newSong) =>{
           let {id , attributes} = newSong
           Object.assign(this.data, {id, ...attributes})

       }, (error)=> {
           console.error(error);
       });
    }
  }
  let controller = {
    init(view, modle) {
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      window.Event.listen('new', (data)=>{
        this.view.render(data)
      })
      this.bindEvents()
    },
    bindEvents() {
      $(this.view.el).on('submit', 'form', (event)=>{
        event.preventDefault()
        for (key in this.model.data) {
          this.model.data[key] = $(this.view.el).find(`[name=${key}]`).val()
          console.log(this.model.data)
        }
        this.model.create(this.model.data)
      })
    }
  }
  controller.init(view, model)
}