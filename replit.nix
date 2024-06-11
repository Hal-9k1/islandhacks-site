{ pkgs }: {
  deps = [
    pkgs.vim
    pkgs.openssh
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}