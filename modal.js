// function toggleDisplayOfGivenDomElements(elements=[]) {
//     for (let x of elements)
//     {
//         console.log(x);
//             if (x.style.display === "none") {
//             x.style.display = "block";
//             } else {
//             x.style.display = "none";
//             }
//     } 
// }

// function toggleVisibilityOfGivenDomElements(elements=[]) {
//     for (let x of elements)
//     {
//         console.log(x);
//             if (x.style.visibility === "hidden") {
//             x.style.visibility = "visible";
//             } else {
//             x.style.visibility = "hidden";
//             }
//     } 
// }

const modal = document.querySelectorAll("#modal");
const fader = document.querySelectorAll(".fader");
const transitionDuration = 300;

let isPressed = false;

function displayGivenDomElementsWithTransition(elements=[],property='opacity',start=0,end=1,duration=transitionDuration) {
    for (const x of elements)
    {
        //x.style.transitionProperty = `${property}`;
        //x.style.transitionDuration = '0ms';
        //        console.log(window.getComputedStyle(x)[property]);
        x.style[property] = start;
        x.style.display = "block";
// lehetne így is:        x.style.setProperty(property,start);
//        console.log(window.getComputedStyle(x)[property]);
                x.style.transitionProperty = `${property}`;
        //x.style.transitionProperty = `${property}`
        x.style.transitionDuration = `${duration}ms`;
//        x.style.setProperty('transitionDuration',`${duration}ms`); //This doesn't work... why?
        console.log(window.getComputedStyle(x).transitionDuration);
//        x.style.top = '10px';
        x.style[property] = end;
//        console.log(window.getComputedStyle(x)[property]);
//        x.style.transitionProperty = `${property}`;
//        x.style.transitionDuration = '0ms';
    } 
}

//async 
function pressme() {
    // for (let x of document.querySelectorAll('.caller-button')) {
    //     x.removeEventListener('click', pressme);
    // }
//    console.log(document.activeElement);
    isPressed = true;
    displayGivenDomElementsWithTransition(fader,'opacity',0,0.7,transitionDuration);
    displayGivenDomElementsWithTransition(modal,'opacity',0,1,transitionDuration);
    console.log('pressme fut');
    modal[0].focus();
    //console.log(document.activeElement);
    // for (let x of document.querySelectorAll('.fader,#modal button')) {
    //     x.addEventListener('click', makeModalAndFaderDisappear, { capture : false, passive : true });
    // }
}

// Ez az aszinkron függvény váratlan időpontokban felülírja a transition időtartamát, 
// ha a duration argumentum nem ugyanaz, mint a displayGivenElementsWithTransition()-ben!!

async function removeGivenDomElementsWithTransition(elements=[],property='opacity',start=1,end=0,duration=transitionDuration) {
    for (let x of elements)
    {
        // let originalValue = window.getComputedStyle(x)[property];
        // if(originalValue===undefined) originalValue = 'initial';
        // console.log(originalValue);
//        x.style.transitionProperty = `${property}`;
//        x.style.transitionDuration = '0ms';
        x.style[property] = start;
//        console.log(window.getComputedStyle(x)[property]);
        x.style.transitionProperty = `${property}`;
        x.style.transitionDuration = `${duration}ms`;
        x.style[property] = end;
//        console.log(window.getComputedStyle(x)[property]);
        await new Promise(r => setTimeout(r,duration));
        if (!isPressed) x.style.display = "none";
//        x.style.transitionProperty = `${property}`;
//        x.style.transitionDuration = '0ms';
//        x.style.setProperty(property,originalValue);
        console.log('removeGivenDomElementsWithTransition fut');
//        console.log(window.getComputedStyle(x)[property]);
    } 
}

function makeModalAndFaderDisappear() {
    // for (let x of document.querySelectorAll('.fader,#modal button')) {
    //     x.removeEventListener('click', makeModalAndFaderDisappear);
    // }
    isPressed = false;
    removeGivenDomElementsWithTransition(modal,'opacity',1,0,transitionDuration);
    removeGivenDomElementsWithTransition(fader,'opacity',0.7,0,transitionDuration);
    console.log('makeModalAndFaderDisappear fut');
    // for (let x of document.querySelectorAll('.caller-button')) {
    //     x.addEventListener('click', pressme);
    //     //console.log(x)
    // }    
}

for (let x of document.querySelectorAll('.caller-button')) {
    x.addEventListener('click', pressme, { capture : false, passive : true });
    //console.log(x)
}
for (let x of document.querySelectorAll('.fader,#modal button')) {
    x.addEventListener('click', makeModalAndFaderDisappear, { capture : false, passive : true });
    //console.log(x)
}

