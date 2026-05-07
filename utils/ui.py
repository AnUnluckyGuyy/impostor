import os
import cursor

def clear():
    os.system("cls" if os.name == "nt" else "clear")

def wait_for(prompt):
    cursor.hide()
    input(prompt)
    cursor.show()

def get_player_count():
    while True:
        try:
            return int(input("Quantos players? "))
        except ValueError:
            print("Você deve digitar um número!")

def get_player_name():
    player_name = input("Nome: ")
    return player_name