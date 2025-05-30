set number
set relativenumber
set tabstop=4
set showtabline=2
set expandtab
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
" utf-8 byte sequence
set encoding=utf-8
set timeoutlen=2000
" Having longer updatetime (default is 4000 ms = 4s) leads to noticeable
" delays and poor user experience
set updatetime=300

" Always show the signcolumn, otherwise it would shift the text each time
" diagnostics appear/become resolved
set signcolumn=yes

syntax on
colorscheme ayu
let ayucolor="dark"

function Demo()
        echo &filetype
        " let s:file_path = expand("%:p:h:t") . expand("%:t") " get the full path of the file
endfunction

function Run_file()
        let s:file_type = &filetype
        if s:file_type == 'python'
                execute "term python3 %"
        elseif s:file_type == 'vim'
                execute "source %"
        else
                echom s:file_type . " can not be runned"
        endif
endfunction

nnoremap <C-F6> :call Demo()<CR>
nnoremap <silent> <C-F5> :call Run_file()<CR>


call plug#begin()

Plug 'itchyny/lightline.vim'
Plug 'tpope/vim-commentary'
Plug 'preservim/nerdtree', {'on': 'NERDTreeToggle'}
Plug 'mattn/emmet-vim'
Plug 'vimlab/split-term.vim'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'ayu-theme/ayu-vim'
Plug 'liuchengxu/vim-which-key', { 'on': ['WhichKey', 'WhichKey!' ] }
Plug 'Yggdroot/indentLine'
Plug 'wuelnerdotexe/vim-astro'

call plug#end()

let g:mapleader = "\<Space>"

nnore <silent> <C-F7> :PlugUpdate<Cr>
" close all buffers and confirm before closing if any unsave changes
nnore <silent> <leader>qq :confirm qa<CR>
inoremap <silent> <C-CR> <Esc>:put _<CR>i
nnoremap <silent> <C-CR> :put _<CR>
" close the current buffer
nnoremap <silent> <leader>bq :bd<CR>  
nnoremap <leader>t :term<CR>
nnore <leader>e :NERDTreeToggle<CR>
nnore <silent> <leader>nf :NERDTreeFocus<CR>
nnoremap <leader>co :CocStart<CR>
nnore <silent> <Space><Space> :WhichKey '<Space>'<CR>
nnore <silent> <Space>. :WhichKey ''<CR>
inoremap <C-s> <Esc>:execute('wa')<CR>i
nnore <silent><C-s> :execute('wa')<CR>

let g:user_emmet_expandabbr_key = '<c-e>'
let g:use_emmet_complete_tag = 1


if !empty(glob('~/.vim/plugged/vim-astro'))
        let g:astro_typescript = 'enable'
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
        nnoremap <silent> K :call ShowDocumentation()<CR>

        function! ShowDocumentation()
          if CocAction('hasProvider', 'hover')
            call CocActionAsync('doHover')
          else
            call feedkeys('K', 'in')
          endif
        endfunction

        " Highlight the symbol and its references when holding the cursor
        autocmd CursorHold * silent call CocActionAsync('highlight')

        " Symbol renaming
        nmap <leader>rn <Plug>(coc-rename)

        " Formatting selected code
        xmap <leader>f  <Plug>(coc-format-selected)
        nmap <leader>f  <Plug>(coc-format-selected)

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
        nnoremap <silent><nowait> <space>s  :<C-u>CocList -I symbols<cr>
        " Do default action for next item
        nnoremap <silent><nowait> <space>j  :<C-u>CocNext<CR>
        " Do default action for previous item
        nnoremap <silent><nowait> <space>k  :<C-u>CocPrev<CR>
        " Resume latest coc list
        nnoremap <silent><nowait> <space>p  :<C-u>CocListResume<CR>
endif
