from file_manager import get_file_lines, save_dict_to_json

src_path = "database/entries.txt"
dest_path = "database/words.json"
lines = []
word_data = []

lines = get_file_lines(src_path)

for line in lines:
    word, rest = line.strip().split("|")
    hints = rest.split(",")
    word_data.append({"word": word, "hints": hints })

save_dict_to_json(word_data, dest_path)