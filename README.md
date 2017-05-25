# Info

This is a little chrome extension which disables XScreensaver while youtube is in full-screen mode.
It uses a native messaging host, so some additional manual installation is necesarry.

# Installation (Linux)

1. Get the extension
2. Download [de.t_animal.ytnoscreensaver.json](https://raw.githubusercontent.com/t-animal/youtube-noscreensaver/master/de.t_animal.ytnoscreensaver.json)
   to .config/chromium/NativeMessagingHosts/ (or .config/chrome/... if using chrome)
3. Download [xscreensaver-keep-alive-ping](https://raw.githubusercontent.com/t-animal/youtube-noscreensaver/master/xscreensaver-keep-alive-ping)
   and put its path into the json downloaded previously

Here is an example script which does step 2 and 3, to help you get started (Change to your needs, don't just copy this!):

```bash
#select whether you have chrome or chromium
browser=chromium
#browser=chrome

hostURL=https://raw.githubusercontent.com/t-animal/youtube-noscreensaver/master/de.t_animal.ytnoscreensaver.json
nativeURL=https://raw.githubusercontent.com/t-animal/youtube-noscreensaver/master/xscreensaver-keep-alive-ping

curl $hostURL > ~/.config/$browser/NativeMessagingHosts/de.t_animal.ytnoscreensaver.json

mkdir -p ~/bin
curl $nativeURL > ~/bin/xscreensaver-keep-alive-ping
cmod +x ~/bin/xscreensaver-keep-alive-ping
sed -i s,/path/to/script/,~/bin/, ~/.config/$browser/NativeMessagingHosts/de.t_animal.ytnoscreensaver.json
```