# Media masters

`hero-master-hevc.mp4` is the original Higgsfield render: HEVC (H.265) Main 10,
1248x1664, 24fps, ~16.7 Mbps. It is kept here and **not** served, because HEVC
in MP4 is only reliably decoded by Safari — Chrome and Firefox would show a
frozen poster.

> **Not in version control.** At 20MB it is gitignored, so a fresh clone will
> not have it and the transcode commands below cannot be re-run until it is
> copied back into this folder. The two served files *are* committed, so the
> site builds without it.

The two files actually served are transcoded from it. `ffmpeg-static` is not a
project dependency — it pulls a 44MB binary that the app never uses and the
build does not need — so install it only when re-transcoding:

```sh
npm i -D ffmpeg-static

FF=$(node -e "console.log(require('ffmpeg-static'))")

# Universal fallback — H.264 High, 8-bit 4:2:0, plays essentially everywhere
"$FF" -i media-src/hero-master-hevc.mp4 -an -vf "scale=1080:1440:flags=lanczos" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 28 -preset slow \
  -movflags +faststart public/media/hero-h264.mp4

# Smaller modern alternative
"$FF" -i media-src/hero-master-hevc.mp4 -an -vf "scale=1080:1440:flags=lanczos" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
  public/media/hero.webm
```

Measured against the master at the same timestamp: H.264 RMSE 2.81, VP9 RMSE
1.93 — both below the ~3.0 threshold where differences stop being visible.
