import tkinter
from tkinter import *
from datetime import datetime
import threading, time, math

####################################
# Intialise
####################################

class Timer():
    def __init__(self):
        self.window = Tk()
        self.window.title("Parent teacher interviews timer by Paul Baumgarten")
        self.window.geometry("300x200")
        self.window.attributes('-alpha', 0.5)
        self.window.configure(background='black')
        # Labels
        self.label1 = Label(self.window, text="Current session")
        self.label1.config(fg="white", background='black', font=("Courier", 18))
        self.label1.place(x=20, y=10)
        self.label2 = Label(self.window, text="Time remaining")
        self.label2.config(fg="white", background='black', font=("Courier", 18))
        self.label2.place(x=20, y=110)
        self.session = Label(self.window, text="00:00:00")
        self.session.config(fg="white", background='black', font=("Courier", 54))
        self.session.place(x=20, y=30)
        self.remaining = Label(self.window, text="00:00:00")
        self.remaining.config(fg="white", background='black', font=("Courier", 54))
        self.remaining.place(x=20, y=130)
        # self.session['text'] = 'change the value'
    
    def tick(self):
        now = datetime.now().timestamp()
        session_timestamp = math.floor(now // 300) * 300
        session_text = datetime.fromtimestamp( session_timestamp ).strftime("%H:%M:%S")
        self.session["text"] = session_text
        remaining_seconds = 300 - int(now % 300)
        remaining_text = datetime.utcfromtimestamp( remaining_seconds ).strftime("%H:%M:%S")
        self.remaining["text"] = remaining_text
        if remaining_seconds < 30:
            self.window.configure(background='red')
            self.label1.config(background='red')
            self.label2.config(background='red')
            self.session.config(background='red')
            self.remaining.config(background='red')
        else:
            self.window.configure(background='black')
            self.label1.config(background='black')
            self.label2.config(background='black')
            self.session.config(background='black')
            self.remaining.config(background='black')
        threading.Timer(1, self.tick).start()

    def start(self):
        # Let's get this party started
        self.window.mainloop()


####################################
# Main
####################################

if __name__ == "__main__":
    timer = Timer()
    ticker = threading.Timer(1, timer.tick).start()
    timer.start()
