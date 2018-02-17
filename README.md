# Audio Presentation
![Dylan On Users](https://media.giphy.com/media/xBqnekPyrBTPPdkZ4z/giphy.gif)

Use this to create audio presentations. 
It will present text along side an audio track to explain or accompany whats being heard at that time.
You can see an example in use at http://quirkiaudio.com
Or follow the Developing instructions below.

## Usage

Download the latest minified js and optional css files in /dist or build them yourself by cloning this repo and running `yarn build`.

Or just...
```
npm install audio-presentation
```

Include the audio_presenter.min.js and optionally the audio_presenter.min.css files in your page.

Begin creating Audio Presentations in your html with this.

```
    <div
      class="audio-presenter"
      data-source="path_or_url_to_mp3_file"
      data-timeline="pathi_or_url_to_json_containing_timeline_data"
      data-message="Default Message to Display when not playing">
    </div>

```
Then initialize the script in your own JS in a document ready with...
```
let audioPresentation = new AudioPresentation();
audioPresenter.start();

```

Vanilla JS Document ready example.
```
document.onreadystatechange = () => {
  let audioPresentation = new AudioPresentation();
  if (document.readyState === "interactive") audioPresentation.start();
}
```

## Creating a Timeline

Timeline JSON should be an aray of objects each conatining time and message key.

Example object:
```
{"time:" time_in_seconds.milliseconds, "message": string_to_display_at_time}
```

Example JSON:
```
[
{"time:" "0.00","message": "And so it begins.."}
{"time:" "30.00","message": "We're 30 seconds in"},
{"time:" "60.00","message": "This is the Best Part!!"},
]
```

## Building
1. Clone this repo.
2. `npm install`
3. `yarn build`

## Developing
1. Clone this repo.
2. `npm install`
3. `yarn start`
