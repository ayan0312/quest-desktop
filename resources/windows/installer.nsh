!macro customUnInstall
  MessageBox MB_YESNO "需要删除当前设置吗?" /SD IDNO IDNO SkipRemoval
    SetShellVarContext current
    RMDir /r "$APPDATA\electron-win"
  SkipRemoval:
!macroend