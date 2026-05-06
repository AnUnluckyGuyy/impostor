import json

def save_dict_to_json(my_dict, filepath):
    with open(filepath, "w") as file:
        json.dump(my_dict, file, ensure_ascii=False, indent=2)

def get_file_lines(filepath):
    with open(filepath, "r") as file:
        return file.readlines()
    
def get_entry_from_database(src_path):
    with open(src_path, "r") as file:
        words = json.load(file)
    return words