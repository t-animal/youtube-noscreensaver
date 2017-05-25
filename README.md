# Info

This is a little chrome extension which disables XScreensaver while youtube is in full-screen mode.
It uses a native messaging host, so some additional manual installation is necesarry.

# Installation (Linux)

1. Get the extension from [github](https://github.com/t-animal/youtube-noscreensaver/raw/HEAD/youtube-noscreensaver.crx)
   or clone this repo and load as an unpacked extension (Google requires 5$ payment to publish on chrome store)
2. Download [de.t_animal.ytnoscreensaver.json](https://raw.githubusercontent.com/t-animal/youtube-noscreensaver/master/de.t_animal.ytnoscreensaver.json)
   to .config/chromium/NativeMessagingHosts/ (or .config/chrome/... if using chrome)
3. Download [xscreensaver-keep-alive-ping](https://raw.githubusercontent.com/t-animal/youtube-noscreensaver/master/xscreensaver-keep-alive-ping)
   and put its path into the json downloaded previously

Here is an example script which does these steps, to help you get started (Change to your needs, don't just copy this!):

```bash
#select whether you have chrome or chromium
browser=chromium
#browser=chrome

extensionURL=https://github.com/t-animal/youtube-noscreensaver/raw/HEAD/youtube-noscreensaver.crx
hostURL=https://raw.githubusercontent.com/t-animal/youtube-noscreensaver/master/de.t_animal.ytnoscreensaver.json
nativeURL=https://raw.githubusercontent.com/t-animal/youtube-noscreensaver/master/xscreensaver-keep-alive-ping

mkdir -p ~/bin
curl $extensionURL > /tmp/youtube-noscreensaver.crx
curl $hostURL > ~/.config/$browser/NativeMessagingHosts/de.t_animal.ytnoscreensaver.json
curl $nativeURL > ~/bin/xscreensaver-keep-alive-ping

$browser /tmp/youtube-noscreensaver.crx
echo "The browser should just have opened and ask you to install the extension. It might have warned you that it's unsafe."
echo "If you have doubts, check the sources and install as an unpacked extension :)"

cmod +x ~/bin/xscreensaver-keep-alive-ping
sed -i s,/path/to/script/,~/bin/, ~/.config/$browser/NativeMessagingHosts/de.t_animal.ytnoscreensaver.json
```