import os
import json

def folder_to_dict(folder_path):
    folder_dict = {}
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)
        if os.path.isdir(item_path):
            subfolders = [subfolder for subfolder in os.listdir(item_path) if os.path.isdir(os.path.join(item_path, subfolder))]
            if subfolders:
                folder_dict[item] = folder_to_dict(item_path)
            else:
                files_dict = {}
                for filename in os.listdir(item_path):
                    file_path = os.path.join(item_path, filename)
                    file_name, file_extension = os.path.splitext(filename)
                    if file_name.endswith("_mi") and file_name[:-3] in files_dict:
                        files_dict[file_name[:-3]]['mi'] = {'name': file_name, 'path': file_path}
                    else:
                        files_dict[file_name] = {'name': file_name, 'path': file_path}
                folder_dict[item] = list(files_dict.values())
    return folder_dict

def main():
    root_dir = "./sqa_pdfs"
    parsed_data = folder_to_dict(root_dir)

    with open('file_structure.json', 'w') as json_file:
        json.dump(parsed_data, json_file, indent=4)

    print("File structure parsed and saved to file_structure.json")

if __name__ == "__main__":
    main()