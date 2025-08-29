#!/bin/zsh
# The function mkcd() when called with a parameter will check if a directory
# exists with that name in the current directory. If the directory does not
# exists then it will create the directory and move into that directory even
# if it exists.

mkcd() {
    # Check if exactly one argument is provided
    if [[ $# -ne 1 ]]; then
        print "Usage: mkcd <folder_name>"
        print "Example: mkcd my_new_folder"
        return 1
    fi

    local folder_name="$1"

    # Create the folder if it doesn't exist
    if [[ ! -d "$folder_name" ]]; then
        mkdir -p "$folder_name"
        if [[ $? -eq 0 ]]; then
            print "Folder '$folder_name' created successfully."
        else
            print "Error: Failed to create folder '$folder_name'."
            return 1
        fi
    else
        print "Folder '$folder_name' already exists."
    fi

    # Change into the folder
    cd "$folder_name"
    if [[ $? -eq 0 ]]; then
        print "Changed to directory: $PWD"
    else
        print "Error: Failed to change to directory '$folder_name'."
        return 1
    fi
}
# mkcd "bash"
# exec zsh
# put this function inside .zshrc file to get global access.
