## Issue

Image data is corrupted when reusing a canvas.

## Steps to reproduce

1. Fill a canvas with black.
2. Draw an image with transparency.
3. Output the canvas to PNG.
4. Repeat the above multiple times.

```
$ node.exe test.js
```

### Expected

Each PNG should represent a single image on a black background.

![Expected results](/expected.png)

### Actual

Each PNG is the combination of all previous images combined and on a black background.

![Actual results](/actual.png)

## My Environment

```
$ npm ls | grep canvas@
└── canvas@2.9.3
```

```
$ node.exe --version
v16.16.0
```

```
$ systeminfo | grep -E '^OS [NV]'
OS Name:                   Microsoft Windows 10 Pro
OS Version:                10.0.19043 N/A Build 19043
```

Also reproduced on Ubuntu 20.04 with canvas@2.9.3 and node v10.19.0.
