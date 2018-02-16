class AudioPresenter {
  constructor(){
    this.state ={
      presenter_elements: Array.from(document.getElementsByClassName('audio-presenter')),
      presenters: []
    };
  }

  initialize(){
    for (let [ index, presenter ] of this.state.presenter_elements.entries()){
      let timeline_url = presenter.getAttribute('data-timeline');

      this.render(presenter);

      fetch(timeline_url).then(function(response) {
        response.json().then(function(timeline_data){
          this.addPresenter(timeline_data, presenter);
          this.bindEvents();
        }.bind(this));
      }.bind(this));

    }
  }

  render(presenter){
    let source = presenter.getAttribute('data-source'),
        message = presenter.getAttribute('data-message'),
        template = `
          <div class="player">
            <progress value="0" max="100"></progress>
            <button class="play">Play Presentation</button>
          </div>
          <section class="presentation">${message}</section>
          <audio id="music" controls="controls">
            <source src="${source}" type="audio/mpeg" />
          </audio>
      `;
    presenter.innerHTML = template;
  }

  bindEvents(){
    let presenter = this.state.presenters[this.state.presenters.length - 1];
    presenter.audioElement.load();
    presenter.audioElement.addEventListener('timeupdate', function(){
      this.updateProgress(presenter.progressBar, presenter.audioElement, presenter.presentationElement, presenter.timeline );
    }.bind(this));
    presenter.audioElement.addEventListener('ended', function(){
      this.resetPlayer(presenter);
    }.bind(this));
    presenter.audioElement.addEventListener('pause', function(){
      this.resetPlayer(presenter);
    }.bind(this));
    presenter.playButton.addEventListener('touch', function() {
      this.playPauseAudio( presenter.playButton, presenter.audioElement);
    }.bind(this));
    presenter.playButton.addEventListener('click', function() {
      this.playPauseAudio( presenter.playButton, presenter.audioElement);
    }.bind(this));
  }

  addPresenter(timeline_data, presenter){
    this.state.presenters.push({
      'playButton':presenter.getElementsByClassName('player')[0],
      'audioElement': presenter.getElementsByTagName('audio')[0],
      'progressBar': presenter.getElementsByTagName('progress')[0],
      'presentationElement': presenter.getElementsByClassName('presentation')[0],
      'message': presenter.getAttribute('data-message'),
      'timeline' : timeline_data
    });
  }

  playPauseAudio(button, audio){
    if (audio.paused) {
      button.classList.add('playing');
      audio.play();
    } else {
      button.classList.remove('playing');
      audio.pause();
      audio.currentTime = 0;
    }
  }

  presentAtTime(now, presentation, timeline){
    function isSlide(slide){
      return now >= slide.time ? slide : false;
    }
    let slide = timeline.map( (slide) => isSlide(slide)).filter(Boolean);
    if (presentation.innerHTML !== slide[slide.length - 1].content) {
      presentation.innerHTML = slide[slide.length -1].content;
    }
  }

  updateProgress(progressbar, audio, presentation, timeline){
    let now = audio.currentTime;
    let progress = Math.round(now / audio.duration * 100);
    progressbar.value = progress ? progress : 0;
    if(!audio.paused){
      this.presentAtTime(now, presentation, timeline);
    }
  }

  resetPlayer(presenter){
    presenter.playButton.classList.remove('playing');
    presenter.presentationElement.innerHTML = presenter.message;
    presenter.audioElement.currentTime = 0;
  }
}
