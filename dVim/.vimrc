set number
set hidden " allow change buffer even if it has unsaved changes
set relativenumber
set tabstop=2
set showtabline=2
set shiftwidth=2
set softtabstop=2
set expandtab
set confirm
"set cursorline
set laststatus=2
set hlsearch
set scrolloff=2
set splitright
set splitbelow
set termguicolors
set t_Co=256
set noshowmode
set mouse=a
set modifiable
set encoding=utf-8
set timeoutlen=500
" Having longer updatetime (default is 4000 ms = 4s) leads to noticeable
" delays and poor user experience
set updatetime=300
" Always show the signcolumn, otherwise it would shift the text each time
" diagnostics appear/become resolved
set signcolumn=yes
" set clipboard=unnamedplus
set nobackup
set noswapfile
set nowritebackup
set undolevels=1000
set history=1000

autocmd FileType python setlocal tabstop=4
autocmd FileType python setlocal shiftwidth=4
autocmd FileType python setlocal softtabstop=4

if has('persistent_undo') " something related to undo-redo
set undodir=$HOME/.vim/undo " copied from stackoverflow without under standing
set undofile 
endif

syntax on
colorscheme dayu
hi Normal guibg=NONE ctermbg=NONE


" custom functions
function Run_file()
  let s:file_type = &filetype
  if s:file_type == 'javascript'
    execute "term node %"
  elseif s:file_type == 'html'
    execute "term npx serve"
  elseif s:file_type == 'python'
    execute "term python3 %"
  elseif s:file_type == 'sh'
    execute "term sh %"
  elseif s:file_type == 'vim'
    execute "source %"
  elseif s:file_type == 'typescript'
    execute "term ts-node %"
  else
    echom s:file_type . " can not be runned"
  endif
endfunction

function! JumpLine()
  let l:word = expand('<cword>')
  if l:word =~ '^\d\+$'
    " echo l:word
    execute l:word
  else
    echo "No number under cursor"
  endif
endfunction
command! JumpLine call Jumpline()

" Custom keymaps 
let g:mapleader = "\<Space>"
nnoremap <silent> <C-F5> :call Run_file()<CR>
" reload vimrc
nnoremap <silent> <F5> :source ~/.vimrc<CR>
nnoremap <silent> <C-F4> :call JumpLine()<CR>
nnore <silent> <C-F7> :PlugUpdate<Cr>
" close all buffers and confirm before closing if any unsave changes
nnore <silent> <leader>qq :confirm qa<CR>
" nnoremap <leader>t :term<CR>
nnore <silent> <Space><Space> :Scope BufSearch<CR>
nnore <silent> <Space>. :WhichKey ''<CR>
nnore <silent><C-s> :execute('w')<CR>
inore <silent><C-s> <cmd>execute('w')<CR>
" Tabs related Mappings
" nnoremap <silent> <leader>tn :tabnew<CR>
" gt will go to next Tab
" gT will go to previous Tab
" ~~ END ~ 


call plug#begin()
  " Plug 'itchyny/lightline.vim'
  Plug 'vim-airline/vim-airline'
  Plug 'tpope/vim-commentary'
  Plug 'tpope/vim-surround'
  Plug 'tpope/vim-fugitive' " for Git commands
  Plug 'preservim/nerdtree', {'on': 'NERDTreeToggle'}
  Plug 'preservim/tagbar', {'on': 'TagbarToggle'}
  Plug 'mattn/emmet-vim', {'for': ['html', 'javascriptreact', 'typescriptreact', 'astro']}
  Plug 'vimlab/split-term.vim'
  Plug 'neoclide/coc.nvim', {'branch': 'release'}
  " Plug 'agude/vim-eldar'
  " Plug 'morhetz/gruvbox'
  Plug 'ayu-theme/ayu-vim'
  Plug 'Yggdroot/indentLine'
  Plug 'wuelnerdotexe/vim-astro', { 'for': ['javascript', 'typescript', 'astro']}
  Plug 'girishji/scope.vim'
  Plug 'ryanoasis/vim-devicons'
  Plug 'mhinz/vim-startify' " used for the start screen
  Plug 'liuchengxu/vim-which-key'
  Plug 'puremourning/vimspector'
  Plug 'Exafunction/codeium.vim'
call plug#end()

call which_key#register('<Space>', "g:which_key_map")
call which_key#register('<M>', "g:which_key_map_alt")
nnoremap <silent> <leader> :<C-u>WhichKey '<Space>'<CR>
let g:which_key_map = {}
let g:which_key_map['w'] = {
  \ 'name' : '+windows' ,
  \ 'w' : ['<C-W>w'     , 'other-window']          ,
  \ 'd' : ['<C-W>c'     , 'delete-window']         ,
  \ '-' : ['<C-W>s'     , 'split-window-below']    ,
  \ '|' : ['<C-W>v'     , 'split-window-right']    ,
  \ '2' : ['<C-W>v'     , 'layout-double-columns'] ,
  \ 'h' : ['<C-W>h'     , 'window-left']           ,
  \ 'j' : ['<C-W>j'     , 'window-below']          ,
  \ 'l' : ['<C-W>l'     , 'window-right']          ,
  \ 'k' : ['<C-W>k'     , 'window-up']             ,
  \ 'H' : ['<C-W>5<'    , 'expand-window-left']    ,
  \ 'J' : [':resize +5'  , 'expand-window-below']   ,
  \ 'L' : ['<C-W>5>'    , 'expand-window-right']   ,
  \ 'K' : [':resize -5'  , 'expand-window-up']      ,
  \ '=' : ['<C-W>='     , 'balance-window']        ,
  \ 's' : ['<C-W>s'     , 'split-window-below']    ,
  \ 'v' : ['<C-W>v'     , 'split-window-below']    ,
  \ }
  " Buffer related Mappings
  let g:which_key_map['b'] = {
    \ 'name': '+Buffer',
    \ 's': ['scope#fuzzy#Buffer()', 'Buffer Selector'],
    \ 'l' : [':ls'     , 'list all buffers']           ,
    \ 'n' : [':bn'    , 'next-buffer']            ,
    \ 'd' : [':bd'    , 'delete-buffer']         ,
    \ 'p' : [':bp'    , 'previous-buffer']       ,
    \ 'w' : [':bw', 'delete current buffer and close window'],
    \ 'a' : [':ba', 'delete all buffers'],
    \ 'h' : [':help :b', 'HELP'],
    \ }
    " Git related Mappings
    let g:which_key_map['g'] = {
      \ 'name': '+Git',
      \ 's': ['<cmd>Git<CR>'     , 'Git Status']          ,
      \ 'c': ['<cmd>Git commit<CR>'     , 'Git Commit']          ,
      \ 'p': ['<cmd>Git push<CR>'     , 'Git Push']            ,
      \ 'P': ['<cmd>Git pull<CR>'     , 'Git Pull']            ,
      \ 'h': ['<cmd>Git diff<CR>'     , 'Git Diff']            ,
      \ 'b': ['<cmd>Git blame<CR>'     , 'Git Blame']           ,
      \ 'l': ['<cmd>Git log<CR>'     , 'Git Log']             ,
      \ 'D': ['<cmd>Git diff HEAD<CR>'     , 'Git Diff HEAD']        ,
      \ 'f': ['<cmd>Git fetch<CR>'     , 'Git Fetch']           ,
      \ 'I': ['<cmd>Git init<CR>'     , 'Git Init']             ,
      \ 'a': ['<cmd>Git add %<CR>'     , 'Git Add Current File'] ,
      \ }
    " Terminal and tab Mappings
    let g:which_key_map['t'] = {
      \ 'name': '+Term & Tab',
      \ 'c': [':terminal++curwin', 'Make current buffer a terminal'],
      \ 't': [':term', 'Open new horizontal terminal'],
      \ 'v': [':vert term', 'Open new vertical terminal'],
      \ 'g': [':vert ter++close gemini', 'Open gemini cli vertical'],
      \ 'r': [':vert ter++close acli rovodev run', 'Open rovodev vertical'],
      \ 'n': [':tabnew', 'Open new tab'],
      \ 'p': [':tabprevious', 'Go to last tab'],
      \ 'P': [':tabnext', 'Go to next tab']
      \ }

        " NERDTree settings
        let g:NERDTreeFileLines = 1
        " close the tab if NERDTree is the only window remaining in it
        autocmd BufEnter * if winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree() | call feedkeys(":quit\<CR>:\<BS>") | endif
        nnore <leader>no :NERDTree<CR>
        nnore <leader>e :NERDTreeToggle<CR>
        nnore <silent> <leader>nf :NERDTreeFocus<CR>
        nnore <silent> <leader>nc :NERDTreeClose<CR>
        nnore <silent> <leader>nm :NERDTreeMirror<CR>
        nnore <silent> <leader>nh :help :NERDTree<CR>
        " ~~ END ~~

        " DevIcons Setup
        " Can be enabled or disabled
        let g:webdevicons_enable_nerdtree = 1
        " whether or not to show the nerdtree brackets around flags
        let g:webdevicons_conceal_nerdtree_brackets = 1
        let g:lightline = {
          \ 'component_function': {
            \   'filetype': 'MyFiletype',
            \   'fileformat': 'MyFileformat',
            \ }
          \ }

function! MyFiletype()
return winwidth(0) > 70 ? (strlen(&filetype) ? &filetype . ' ' . WebDevIconsGetFileTypeSymbol() : 'no ft') : ''
endfunction

function! MyFileformat()
return winwidth(0) > 70 ? (&fileformat . ' ' . WebDevIconsGetFileFormatSymbol()) : ''
endfunction

"  ~~ END ~~

let g:user_emmet_expandabbr_key = '<c-e>'
let g:use_emmet_complete_tag = 1


autocmd BufNew,BufRead *.asm set ft=nasm

if !empty(glob('~/.vim/plugged/vim-astro'))
let g:astro_typescript = 'enable'
endif

if !empty(glob('~/.vim/plugged/tagbar'))
" let g:which_key_map['x'] = {
  "   \ 'name': '+x',
  "   \ 't': [':TagbarToggle<CR>', 'Toggle TabBar'],
  "   \ }
  let g:tagbar_autofocus = 1
  nnoremap <silent> <F8> :TagbarToggle<CR>
  endif

  if !empty(glob('~/.vim/plugged/vimspector'))
  let g:vimspector_install_gadgets = [ 'debugpy', 'vscode-cpptools', 'CodeLLDB' ]
  let g:which_key_map['d'] = {
    \ 'name' : '+Debugging' ,
    \ 'd' : [':VimspectorInstall'     , 'Install Debugging gadgets'],
    \ 'u' : [':VimspectorUpdate'     , 'Update Debugging gadgets'],
    \ 'c' : ['vimspector#Continue()'     , 'When debugging, continue. Otherwise start debugging.'],
    \ 's' : [':vimspector#Stop()'     , 'Stop Debugging.'],
    \ 'r' : ['vimspector#Restart()'     , 'Restart debugging with the same configuration.'],
    \ }
    " \ 'bp' : ['vimspector#ListBreakpoints()'     , 'Show/hide the breakpoints window'],
    " \ 'bt' : ['vimspector#ToggleBreakpoint()'     , 'Toggle line breakpoint on the current line.'],
    " https://github.com/puremourning/vimspector?tab=readme-ov-file#mappings set
    " rest of keymaps later
    endif

if !empty(glob('~/.vim/plugged/vim-airline'))
  let g:airline#extensions#tabline#enabled = 1
  " let g:airline_statusline_ontop=1
  if !exists('g:airline_symbols')
    let g:airline_symbols = {}
  endif

  " unicode symbols
  let g:airline_left_sep = '»'
  let g:airline_left_sep = '▶'
  let g:airline_right_sep = '«'
  let g:airline_right_sep = '◀'
  let g:airline_symbols.crypt = '🔒'
  let g:airline_symbols.linenr = '☰'
  let g:airline_symbols.linenr = '␊'
  let g:airline_symbols.linenr = '␤'
  let g:airline_symbols.linenr = '¶'
  let g:airline_symbols.maxlinenr = ''
  let g:airline_symbols.maxlinenr = '㏑'
  let g:airline_symbols.branch = '⎇'
  let g:airline_symbols.paste = 'ρ'
  let g:airline_symbols.paste = 'Þ'
  let g:airline_symbols.paste = '∥'
  let g:airline_symbols.spell = 'Ꞩ'
  let g:airline_symbols.notexists = 'Ɇ'
  let g:airline_symbols.whitespace = 'Ξ'
endif

if match(&rtp, 'vim-startify') != -1 "  !empty(glob('~/.vim/plugged/vim-startify')) 
  if filereadable(expand('~/.vim/dvim.txt'))
    let g:startify_custom_header =
    \ startify#pad(readfile('/home/dshaw/.vim/dvim.txt'))
  else
    let g:startify_custom_header = startify#pad([
        \"██████╗  ██╗   ██╗ ██╗ ███╗   ███╗", 
        \"██╔══██╗ ██║   ██║ ██║ ████╗ ████║",
        \"██║  ██║ ██║   ██║ ██║ ██╔████╔██║",
        \"██║  ██║ ╚██╗ ██╔╝ ██║ ██║╚██╔╝██║",
        \"██████╔╝  ╚████╔╝  ██║ ██║ ╚═╝ ██║",
        \"╚═════╝    ╚═══╝   ╚═╝ ╚═╝     ╚═╝" 
        \ ])
  endif
endif

if !empty(glob('~/.vim/plugged/indentLine'))
  let g:indentLine_color_term = 239
  let g:indentLine_char_list = ['|', '¦', '┆', '┊']
endif

if !empty(glob('~/.vim/plugged/scope.vim'))
  let g:which_key_map['s'] = {
    \ 'name': 'Telescope',
    \ 'f': ['scope#fuzzy#File()', 'Fuzzy Find File'],
    \ 'b': ['scope#fuzzy#BufSearch()', 'Buffer Search'],
    \ 's': ['scope#fuzzy#Grep()', 'Grep Search'],
    \ 'c': ['scope#fuzzy#CmdHistory()', 'Command history'],
    \ 'g': ['scope#fuzzy#GitFile()', 'GitFile'],
    \ 'j': ['scope#fuzzy#Jumplist()', 'List all the jump lists'],
    \ 'k': ['scope#fuzzy#Colorscheme()', 'Change colorscheme'],
    \ 'm': ['scope#fuzzy#Mark()', 'List all marks in buffer'],
    \ 'r': ['scope#fuzzy#Register()', 'Open vim register'],
    \ 't': ['scope#fuzzy#Tag()', 'tags'],
    \ }
    " \ 't': ['scope#fuzzy#FileType()', 'Change buffer file type'],
endif


if !empty(glob('~/.vim/plugged/coc.nvim')) " all the COC config goes here
      " https://raw.githubusercontent.com/neoclide/coc.nvim/master/doc/coc-example-config.vim

      " May need for Vim (not Neovim) since coc.nvim calculates byte offset by count
      " Some servers have issues with backup files, see #649
      " set nobackup
      " set nowritebackup


      " Use tab for trigger completion with characters ahead and navigate
      " NOTE: There's always complete item selected by default, you may want to enable
      " no select by `"suggest.noselect": true` in your configuration file
      " NOTE: Use command ':verbose imap <tab>' to make sure tab is not mapped by
      " other plugin before putting this into your config
      inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#pum#next(1) :
      \ CheckBackspace() ? "\<Tab>" :
\ coc#refresh()
inoremap <expr><S-TAB> coc#pum#visible() ? coc#pum#prev(1) : "\<C-h>"

" Make <CR> to accept selected completion item or notify coc.nvim to format
" <C-g>u breaks current undo, please make your own choice
inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm()
\: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

function! CheckBackspace() abort
let col = col('.') - 1
return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use <c-space> to trigger completion
if has('nvim')
inoremap <silent><expr> <c-space> coc#refresh()
else
inoremap <silent><expr> <c-@> coc#refresh()
endif

" Use `[g` and `]g` to navigate diagnostics
" Use `:CocDiagnostics` to get all diagnostics of current buffer in location list
nmap <silent> <leader>[g <Plug>(coc-diagnostic-prev)
nmap <silent> <leader>]g <Plug>(coc-diagnostic-next)

" GoTo code navigation
nmap <silent> <leader>gd <Plug>(coc-definition)
nmap <silent> <leader>gy <Plug>(coc-type-definition)
nmap <silent> <leader>gi <Plug>(coc-implementation)
nmap <silent> <leader>gr <Plug>(coc-references)

" Use K to show documentation in preview window
nnoremap <silent> <C-k><C-i> :call ShowDocumentation()<CR>

function! ShowDocumentation()
if CocAction('hasProvider', 'hover')
call CocActionAsync('doHover')
else
call feedkeys('<C-k><C-i>', 'in')
endif
endfunction

" Highlight the symbol and its references when holding the cursor
autocmd CursorHold * silent call CocActionAsync('highlight')

" Symbol renaming
nmap <leader>rn <Plug>(coc-rename)

" Formatting selected code
xmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>fd  <Plug>(coc-format-document)
" Organize imports and format document on save
augroup OrganizeImports
autocmd!
autocmd BufWritePost * 
\ if CocAction('hasProvider', 'format') |
\   call CocAction('runCommand', 'editor.action.formatDocument') |
\ endif
" autocmd BufWritePost *.ts, *.tsx, *.js, *.jsx, *.json, *.py
"       \ if CocAction('hasProvider', 'format') |
"       \   call CocAction('runCommand', 'editor.action.organizeImport') | 
"       \ endif
augroup end

augroup mygroup
autocmd!
" Setup formatexpr specified filetype(s)
autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
" Update signature help on jump placeholder
autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end

" Applying code actions to the selected code block
" Example: `<leader>aap` for current paragraph
xmap <leader>a  <Plug>(coc-codeaction-selected)
nmap <leader>a  <Plug>(coc-codeaction-selected)

" Remap keys for applying code actions at the cursor position
nmap <leader>ac  <Plug>(coc-codeaction-cursor)
" Remap keys for apply code actions affect whole buffer
nmap <leader>as  <Plug>(coc-codeaction-source)
" Apply the most preferred quickfix action to fix diagnostic on the current line
nmap <leader>qf  <Plug>(coc-fix-current)

" Remap keys for applying refactor code actions
nmap <silent> <leader>re <Plug>(coc-codeaction-refactor)
xmap <silent> <leader>r  <Plug>(coc-codeaction-refactor-selected)
nmap <silent> <leader>r  <Plug>(coc-codeaction-refactor-selected)

" Run the Code Lens action on the current line
nmap <leader>cl  <Plug>(coc-codelens-action)

" Map function and class text objects
" NOTE: Requires 'textDocument.documentSymbol' support from the language server
xmap if <Plug>(coc-funcobj-i)
omap if <Plug>(coc-funcobj-i)
xmap af <Plug>(coc-funcobj-a)
omap af <Plug>(coc-funcobj-a)
xmap ic <Plug>(coc-classobj-i)
omap ic <Plug>(coc-classobj-i)
xmap ac <Plug>(coc-classobj-a)
omap ac <Plug>(coc-classobj-a)

" Remap <C-f> and <C-b> to scroll float windows/popups
if has('nvim-0.4.0') || has('patch-8.2.0750')
nnoremap <silent><nowait><expr> <C-f> coc#float#has_scroll() ? coc#float#scroll(1) : "\<C-f>"
nnoremap <silent><nowait><expr> <C-b> coc#float#has_scroll() ? coc#float#scroll(0) : "\<C-b>"
inoremap <silent><nowait><expr> <C-f> coc#float#has_scroll() ? "\<c-r>=coc#float#scroll(1)\<cr>" : "\<Right>"
inoremap <silent><nowait><expr> <C-b> coc#float#has_scroll() ? "\<c-r>=coc#float#scroll(0)\<cr>" : "\<Left>"
vnoremap <silent><nowait><expr> <C-f> coc#float#has_scroll() ? coc#float#scroll(1) : "\<C-f>"
vnoremap <silent><nowait><expr> <C-b> coc#float#has_scroll() ? coc#float#scroll(0) : "\<C-b>"
endif

" Use CTRL-S for selections ranges
" Requires 'textDocument/selectionRange' support of language server
" nmap <silent> <C-s> <Plug>(coc-range-select)
" xmap <silent> <C-s> <Plug>(coc-range-select)

" Add `:Format` command to format current buffer
command! -nargs=0 Format :call CocActionAsync('format')

" Add `:Fold` command to fold current buffer
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" Add `:OR` command for organize imports of the current buffer
command! -nargs=0 OR   :call     CocActionAsync('runCommand', 'editor.action.organizeImport')

" Add (Neo)Vim's native statusline support
" NOTE: Please see `:h coc-status` for integrations with external plugins that
" provide custom statusline: lightline.vim, vim-airline
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

" Mappings for CoCList
" Show all diagnostics
nnoremap <silent><nowait> <space>a  :<C-u>CocList diagnostics<cr>
" Manage extensions
" nnoremap <silent><nowait> <space>e  :<C-u>CocList extensions<cr>
" Show commands
" nnoremap <silent><nowait> <space>c  :<C-u>CocList commands<cr>
" Find symbol of current document
nnoremap <silent><nowait> <space>o  :<C-u>CocList outline<cr>
" Search workspace symbols
" nnoremap <silent><nowait> <space>s  :<C-u>CocList -I symbols<cr>
" Do default action for next item
nnoremap <silent><nowait> <space>j  :<C-u>CocNext<CR>
" Do default action for previous item
nnoremap <silent><nowait> <space>k  :<C-u>CocPrev<CR>
" Resume latest coc list
" nnoremap <silent><nowait> <space>p  :<C-u>CocListResume<CR>
" Installed lsp => coc-html coc-css coc-python coc-pyright
" coc-tsserver coc-react-refactor coc-eslint coc-smartf
" coc-snippets coc-rust-analyzer coc-flutter coc-phpls
autocmd FileType css setl iskeyword+=-
autocmd FileType scss setl iskeyword+=@-@ " for scss files
" edit snippets of current file type
nnoremap <silent><leader>se :CocCommand snippets.editSnippets<CR>
nnoremap <silent><leader>sa :CocCommand document.renameCurrentWord<CR>
endif

if !empty(glob('~/.vim/plugged/codeium.vim'))
  let g:codeium_no_map_tab = v:true 
  let g:codeium_manual = v:true
  inoremap <silent><C-j> codeium#Accept()
  " let g:which_key_map['c'] = {
  "       \ 'name' : '+Codeium' ,
  "       \ }
  " \ 'd' : [':Copilot disable'     , 'Disable Copilot'],
  " \ 'e' : [':Copilot enable'    , 'Enable Copilot'],
  " \ 's' : [':Copilot status'    , 'Get Copilot Status'],

endif
