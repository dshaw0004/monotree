#!/bin/bash
# The function mkcd() when called with a parameter will check if a directory
# exists with that name in the current directory. If the directory does not
# exists then it will create the directory and move into that directory even
# if it exists.

mkcd() {
    # Check if exactly one argument is provided
    if [ $# -ne 1 ]; then
        echo "Usage: mkcd <folder_name>"
        echo "Example: mkcd my_new_folder"
        return 1
    fi

    local folder_name="$1"

    # Create the folder if it doesn't exist
    if [ ! -d "$folder_name" ]; then
        mkdir -p "$folder_name"
        if [ $? -eq 0 ]; then
            echo "Folder '$folder_name' created successfully."
        else
            echo "Error: Failed to create folder '$folder_name'."
            return 1
        fi
    else
        echo "Folder '$folder_name' already exists."
    fi

    # Change into the folder
    cd "$folder_name"
    if [ $? -eq 0 ]; then
        echo "Changed to directory: $(pwd)"
    else
        echo "Error: Failed to change to directory '$folder_name'."
        return 1
    fi
}
# mkcd "bash"
# exec bash

# put this function inside .bashrc file to get global access.
