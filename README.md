# pti-timer

Parent teacher interviews timer

## Online version

Access the online version at [https://paulbaumgarten.github.io/pti-timer/web/](https://paulbaumgarten.github.io/pti-timer/web/)

## Downloadable/installable version

The .exe file can be found in the `app/dist` file but be warned it will upset your security/virus scanners (this is a known issue with PyInstaller created EXE files). Therefore the recommended approach is to build it yourself as per the following instructions...

```bash
# Install PyInstaller if you don't already have it
pip install pyinstaller
# Create your EXE file
pyinstaller --onefile --clean --noconsole timer.py
```

This will create a dist folder which will contain your EXE file.


## Author

Paul Baumgarten 2019
