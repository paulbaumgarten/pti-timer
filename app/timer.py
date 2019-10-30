import json
import os
import eel                          # Web front end

####################################
# Intialise
####################################
eel.init('web', allowed_extensions=['.js', '.html'])

####################################
# Main
####################################
if __name__ == "__main__":
    eel.start('index.html', block=False, size=(300,200), geometry={'size': (200, 100), 'position': (300, 50)})
    while True:
        eel.sleep(1)
