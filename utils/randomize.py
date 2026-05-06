import random

def pick_random_player_index(players, exclude=None):
    index = random.choice(range(len(players)))
    if exclude is not None: 
        while exclude == index:
            index = random.choice(range(len(players)))
    return index

def get_random_entry(word_list):
    return random.choice(word_list)