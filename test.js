while (container.children.length > 0) container.children[0].remove();
let myLayout = [];
Object.keys(grapples).forEach(grapple => {
    grappledata = grapples[grapple];
    myLayout.push({
        "tag": "div",
        "style": {
            "width": "100px",
            "height": "100%",
            "display": "inline-block",
            "whiteSpace": "normal",
        },
        "children": [
            {
                "tag": "img",
                "src": "./images/grapples/" + grappledata.end + ".png",
            },
            {
                "tag": "div",
                "innerHTML": grappledata.text + "<br /><br />",
                "style": { "height": "61.82px", },
            },
            {
                "tag": "div",
                "innerHTML": player.grapple == grapple ? "Using" : (grappledata.unlocked ? "USE" : grappledata.cost + "¢"),
                "grappleData": grappledata,
                "class": player.grapple != grapple ? ["buybtn"] : [],
            },
        ],
    });
    if (grappledata.unlocked && player.grapple != grapple) myLayout[0].children[2].onclick = () => {
        player.grapple = grapple;
        let lcl = "";
        for (let i = 0; i < Object.keys(grapples).length; i++) {
            if (player.grapple == Object.keys(grapples)[i]) {
                lcl += "2";
            } else {
                if (grapples[Object.keys(grapples)[i]].unlocked) lcl += "1";
                if (!grapples[Object.keys(grapples)[i]].unlocked) lcl += "0";
            }
        }
        localStorage.setItem("edwardscamera.sticktogether.grapples", lcl);
        updateGrapples();
    };
    if (!thisbtn.grappledata.unlocked) myLayout[0].children[2].onclick = () => {
        if (player.coins >= thisbtn.grappledata.cost) {
            grapples[grapple].unlocked = true;
            player.coins -= thisbtn.grappledata.cost;
            (new Audio("./sounds/coin.wav")).play();
            localStorage.setItem("edwardscamera.sticktogether.coin", player.coins);
            player.grapple = grapple;
            let lcl = "";
            for (let i = 0; i < Object.keys(grapples).length; i++) {
                if (player.grapple == Object.keys(grapples)[i]) {
                    lcl += "2";
                } else {
                    if (grapples[Object.keys(grapples)[i]].unlocked) lcl += "1";
                    if (!grapples[Object.keys(grapples)[i]].unlocked) lcl += "0";
                }
            }
            localStorage.setItem("edwardscamera.sticktogether.grapples", lcl);
            updateGrapples();
        } else {
            (new Audio("./sounds/hurt.wav")).play();
        }
    };
});
createLayout([

], document.querySelector("#grapples"));