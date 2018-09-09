{
  let view = {
    el: '.songInfo',
    template: `
    <form action="">
      <div class="row">
        <label for="name">歌名<input type="text" value="__name__"></label>
      </div>
      <div class="row">
        <label for="singer">歌手<input type="text" value="__singer__"></label>
      </div>
      <div class="row">
          <label for="url">url<input type="text" value="__url__"></label>
      </div>
      <input type="submit" value="保存">
    </form>
    `,
    render(data) {
      let placeholders = ["name", "singer", "url"]
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
      singer: '',
      url: '',
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
    },
  }
  controller.init(view, model)
}