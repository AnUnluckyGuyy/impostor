import os
import cursor

def clear():
    os.system("cls" if os.name == "nt" else "clear")

def wait_for(prompt):
    cursor.hide()
    input(prompt)
    cursor.show()

def get_player_count():
    num = int(input("Quantos players? "))
    return num

def get_player_name():
    player_name = input("Nome: ")
    return player_name