#! /bin/bash

CONFIG_FILE_URL="https://raw.githubusercontent.com/dshaw0004/dVim/main/.vimrc"

wget --help

if [ $? -eq 0 ]; then
	clear

	mkdir ~/.vim
	mkdir ~/.vim/autoload
	wget -O ~/.vim/autoload/plug.vim -nv https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

	if [ $? -eq 0 ]; then
		echo "Vim Plug installed successfully"
	else
		echo "Error: could not download Vim Plug.\nExiting the process"
		exit 1
	fi

	wget -O ~/.vimrc https://raw.githubusercontent.com/dshaw0004/dVim/main/.vimrc

	if [ $? -eq 0 ]; then
		echo ".vimrc file copied successfully"
	else
		echo "Error: could not download .vimrc\nExiting the process"
		exit 1
	fi

	echo "To download the plugins please install git too."
	exit 0

fi

curl --help

if [ $? -eq 0 ]; then
	clear

	curl -o ~/.vimrc https://raw.githubusercontent.com/dshaw0004/dVim/main/.vimrc

	if [ $? -eq 0 ]; then
		echo ".vimrc file copied successfully"
	else
		echo "Error: could not download .vimrc\nExiting the process"
		exit 1
	fi

	curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
		https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

	if [ $? -eq 0 ]; then
		echo "Vim Plug installed successfully"
	else
		echo "Error: could not download Vim Plug.\nExiting the process"
		exit 1
	fi

	echo "To download the plugins please install git too."
	exit 0
fi
