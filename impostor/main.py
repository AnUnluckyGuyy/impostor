from utils.ui import wait_for, clear

from enum import Enum

class RoleColor(Enum):
    INNOCENT = "cyan"
    IMPOSTOR = "red"
    JESTER = "magenta"

role = {
    "name": ["innocent", "impostor", "jester"],
    "color": [RoleColor.INNOCENT.value, RoleColor.IMPOSTOR.value, RoleColor.JESTER.value]
}

class Player:
    def __init__(self, name, role=None):
        self.name = name
        self.role = role

class GameState:
    def __init__(self, players, impostors, jesters):
        self.players: list[Player] = players
        self.player_count = len(self.players)
        self.impostors = impostors
        self.impostor_count = len(self.impostors)
        self.has_impostor = True if self.impostor_count > 0 else False
        self.jesters = jesters
        self.jester_count = len(self.jesters)
        self.has_jester = True if self.jester_count > 0 else False

def get_player_count():
    num = int(input("Quantos players? "))
    return num

def get_player_name():
    player_name = input("Nome: ")
    return player_name

def main():
    player_count = get_player_count()
    if player_count < 3:
        exit(1)

    players: list[Player] = []

    for i in range(player_count):
        players.append(Player(get_player_name()))

    print(players)

    game_state = GameState()

    
if __name__ == "__main__":
    main()