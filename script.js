const hasil = document.querySelector("div.hasil p");
const player = document.querySelectorAll("div.player img");
const pBatu = player[0];
const pGunting = player[1];
const pKertas = player[2];
const pComp = document.querySelector("div.comp img");


function compPick() {        
    let comp = Math.random()
    if(comp<1/3) comp = 0;          // 0 => BATU
    else if(comp<2/3) comp = 1;     // 1 => GUNTING
    else comp = 2;                  // 2 => KERTAS
    return comp;
}

function game(p) {
    let c = compPick();
    if(p == c) {
        return 0;
    } else if( p + 1 == c || (p == 2 && c == 0) ) {
        return 1;
    } else if( p == c + 1 || (c == 2 && p == 0) ) {
        return -1;
    }
}


const resButton = document.querySelector("button");
resButton.onclick = function() {
    hasil.classList.remove('result');
    hasil.innerHTML = ''
    pComp.classList.remove('compImg')
    pComp.setAttribute('src', 'img/computer.png')
    resButton.classList.remove('play')

    player.forEach(function(element){
        element.classList.remove('picked')
        element.classList.add('hov')
    })
}

function compThinking() {
    const imgName = ['batu', 'gunting', 'kertas'];
    const time1 = new Date().getTime();
    let i = 0;
    let think = setInterval(function(){
        if(new Date().getTime() - time1 > 700) clearInterval(think);
        pComp.setAttribute('src', 'img/'+ imgName[i++] +'.jpg');
        if(i == imgName.length) i = 0;
    }, 70)
}


function finalRes(constName, result, drawTo, loseTo, winTo) {
    if( resButton.classList.contains('play') ===  false ) {
        compThinking();

        resButton.classList.add('play')
        constName.classList.add('picked');
        player.forEach(function(element) {
            element.classList.remove('hov')
        })
        setTimeout(function(){
    
            switch (result) {
                case -1:
                    hasil.innerHTML = 'Kamu KALAH'
                    pComp.setAttribute('src', 'img/'+ loseTo +'.jpg')
                    break;
                case 0:
                    hasil.innerHTML = 'SERI'
                    pComp.setAttribute('src', 'img/'+ drawTo +'.jpg')
                    break;
                case 1:
                    hasil.innerHTML = 'Kamu MENANG'
                    pComp.setAttribute('src', 'img/'+ winTo +'.jpg')
                    break;
            }
            hasil.classList.add('result');
            pComp.classList.add('compImg')
        }, 800)
    }
}


pBatu.addEventListener('click', function() {
    const r = game(0);
    finalRes(pBatu, r, 'batu', 'kertas', 'gunting')
})

pGunting.addEventListener('click', function() {
    const r = game(1);
    finalRes(pGunting, r, 'gunting', 'batu', 'kertas')
})

pKertas.addEventListener('click', function() {
    const r = game(2);
    finalRes(pKertas, r, 'kertas', 'gunting', 'batu')
})

