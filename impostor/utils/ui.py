import os
import cursor

def clear():
    os.system("cls" if os.name == "nt" else "clear")

def wait_for(prompt):
    cursor.hide()
    input(prompt)
    cursor.show()