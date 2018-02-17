# Audio Presentation

Use this to create audio presentations. 
It will present text along side an audio track to explain/accompany whats beeing heard at that time.

## Usage

Download the latest minified js and optional css files in /dist or build them yourself by cloning this repo and running `yarn build`.
`Include those files in your page and begin creating Audio Presentations in your html with this.

```
    <div
      class="audio-presenter"
      data-source="path_or_url_to_mp3_file"
      data-timeline="pathi_or_url_to_json_containing_timeline_data"
      data-message="Default Message to Display when not playing">
    </div>

```

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
