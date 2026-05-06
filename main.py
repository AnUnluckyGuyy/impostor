import random
from enum import Enum

from rich import print
from rich.panel import Panel

from utils.file_manager import get_entry_from_database
from utils.randomize import get_random_entry, pick_random_player_index
from utils.ui import wait_for, clear, get_player_count, get_player_name

class RoleColor(Enum):
    INNOCENT = "cyan"
    IMPOSTOR = "red"
    JESTER = "magenta"

class Player:
    def __init__(self, name, role=None):
        self.name = name
        self.role: dict[str, list[str] | str] = role

def show(players, word, hint):
    for player in players:
        print(Panel.fit(f"{player.name}"))
        wait_for("Pressione ENTER para mostrar a palavra")
        clear()
        match player.role["name"]:
            case "innocent":
                print(Panel.fit(f"[{player.role['color']} bold]Inocente[/]"))
                print(f"A palavra é: [{player.role['color']}]{word}[/]")
            case "impostor":
                print(Panel.fit(f"[{player.role['color']} bold]Impostor[/]"))
                print(f"A dica é: [{player.role['color']}]{hint}[/]")
            case "jester":
                print(Panel.fit(f"[{player.role['color']} bold]Palhaço[/]"))
                print(f"A palavra é: [{player.role['color']}]{word}[/]")
            case _:
                pass
        wait_for("Pressione ENTER para passar para o próximo jogador")
        clear()

def main():
    player_count = get_player_count()
    if player_count < 3:
        exit(1)

    players: list[Player] = []

    for i in range(player_count):
        players.append(Player(get_player_name(),
            {
                "name": "innocent",
                "color": RoleColor.INNOCENT.value
            }
        ))
    clear()

    impostor_index = pick_random_player_index(players)
    jester_index = pick_random_player_index(players, impostor_index)
    impostor = players[impostor_index]
    jester = players[jester_index]

    impostor.role = {
        "name": "impostor",
        "color": RoleColor.IMPOSTOR.value
    }

    jester.role = {
        "name": "jester",
        "color": RoleColor.JESTER.value
    }

    # get word and hint
    word = ""
    hint = ""
    db_path = "database/words.json"
    word_list = get_entry_from_database(db_path)
    entry = get_random_entry(word_list)
    word = entry["word"]
    hint = random.choice(entry["hints"])

    show(players, word, hint)

    starting_player = players[pick_random_player_index(players)]
    print(f"Quem começa é: {starting_player.name}")
    wait_for("Pressione ENTER para revelar o impostor")
    clear()

    print(f"O impostor era:")
    print(Panel.fit(f"[{impostor.role['color']}]{impostor.name}"))
    print(f"O palhaço era:")
    print(Panel.fit(f"[{jester.role['color']}]{jester.name}[/]"))
    print(f"A palavra era: [{RoleColor.INNOCENT.value}]{word}[/]")
    print(f"A dica era: [{RoleColor.IMPOSTOR.value}]{hint}[/]")

if __name__ == "__main__":
    main()