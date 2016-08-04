#!/bin/bash
# curl -X PUT -H "Content-Type: application/json" -d '{"state":true}' http://LUSRCMAC0018613:1111/98702765d8f44b18ba7440d76c2a3328/state
# curl -X GET http://LUSRCMAC0018613:1111/98702765d8f44b18ba7440d76c2a3328/state
# curl -X GET http://LUSRCMAC0018613:1111/98702765d8f44b18ba7440d76c2a3328/hue
# curl -X GET http://LUSRCMAC0018613:1111/98702765d8f44b18ba7440d76c2a3328/saturation
# curl -X GET http://LUSRCMAC0018613:1111/98702765d8f44b18ba7440d76c2a3328/brightness
# curl -X PUT -H "Content-Type: application/json" -d '{"state":true}' http://LUSRCMAC0018613:1111/98702765d8f44b18ba7440d76c2a3328/state

hostName=localhost
url1=http://$hostName:3000/98702765d8f44b18ba7440d76c2a3328
url2=http://$hostName:3000/e4c401544ba144bb8a2a0525c4a467f6
ctype="Content-Type: application/json"

turnOn={\"state\":true}
turnOff={\"state\":false}

action=$turnOff
# curl -v -X PATCH -H "Content-Type: application/json" -d '{"RGBA":[0,0,255,100]}' $url

curl -X PATCH -H "$ctype" -d "$action" $url1
curl -X PATCH -H "$ctype" -d "$action" $url2
