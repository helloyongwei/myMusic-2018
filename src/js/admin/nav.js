{
  let view = {
    el: '.page > .nav',
    template: `
    <nav>
        <ul>
          <li class="tab song active">歌曲</li>
          <li class="tab upload">上传</li>
        </ul>
      </nav>
    `,
    render() {
      $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render()
      this.bindEvents()
    },
    bindEvents() {
      let $ul = $('ul')
      $ul[0].addEventListener('click', this.toggleTab)
    },
    toggleTab(event) {
      let li = event.target
      $(li).addClass('active').siblings().removeClass('active')
      let $songList = $('.songList')
      let $uploadSong = $('.uploadSong')
      $songList.toggle('active')
      $uploadSong.toggle('active')
    }
  }
  controller.init(view, model)
}