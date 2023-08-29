const button = document.querySelector("#speak")
const ding = new Audio("audio/ding.mp3")

function unlockAudioContext(audioCtx) {

  if (audioCtx.state !== 'suspended') return;
  const b = document.body;
  const events = ['touchstart','touchend', 'mousedown','keydown'];
  events.forEach(e => b.addEventListener(e, unlock, false));
  function unlock() { audioCtx.resume().then(clean); }
  function clean() { events.forEach(e => b.removeEventListener(e, unlock)); }
}

unlockAudioContext(ding)

ding.play()

let speechRecognition = new webkitSpeechRecognition()

speechRecognition.continuous = false;

speechRecognition.interimResults = false;
        
speechRecognition.lang = "en"



// TESTING HOWLER WITH iOS

// Howler.autoUnlock = true;

// var sound = new Howl({

//     src: ['audio/ding.mp3'],

//     onplayerror: function() {
//         sound.once('unlock', function() {
//           sound.play();
//         });
//       }

// })

// sound.play()

// ------------------------------------------------





button.addEventListener("click",()=>{
    
    speechRecognition.start()
    button.innerText = 'Listening...'
    button.classList.add('speak-active')
    
    // The ding sound works here but not at the end result
    // ding.play()
    

})

speechRecognition.onstart = () => {

    console.log("Listening...")



}

speechRecognition.onsoundstart = (e) => {
        
    console.log("We hear you!")

}

speechRecognition.onsoundend = () => {

    console.log("We stopped hearing you!")

    

    button.innerText = 'Talk'
    button.classList.toggle('speak-active')

    
    speechRecognition.stop()

    
}


const playSound = async()=>{
    
    ding.play()
}

const stopListening = async()=>{

    speechRecognition.start()
    speechRecognition.stop()
}

const revertButton = async()=>{

    button.classList.toggle('speak-active')
    button.innerText = 'Talk'
}

// Promise Based Code

speechRecognition.addEventListener('result',(e)=>{

    const speak = async()=>{

        let resultsArray = Array.from(e.results)
        let finalResult = resultsArray.pop()
        let parsedTranscript = finalResult[0].transcript.trimStart().replace('.',"")
        console.log(parsedTranscript)

        let colors = ['blue','red','green','orange','purple','pink', 'yellow']

        let finalWord = parsedTranscript.toLowerCase()


        if (colors.includes(finalWord)){

            document.body.style.backgroundColor = finalWord

            console.log('Resolved')

        }else{

            throw('Color not found!')
        }

        // for (let i of colors){

            
        //     if (parsedTranscript.toLowerCase() === i){

        //         document.body.style.backgroundColor = i

        //         console.log('Resolved')

        //         break;


        //     }else{

        //         throw('Error!')
        //     }
            



        // }

        


    }


    speak()

    .then(()=>{

        playSound()

        .then(()=>{

            stopListening()

            .then(()=>{

                revertButton()
            })
        })

    }).catch((e)=>{

        console.log("Appears there was an error: "+e)
    })

    speechRecognition.onsoundend = ()=>{

        sound.play()
        revertButton()
    }
    


})
    

    
    
    


    

// 
// speechRecognition.addEventListener('result',(e)=>{

//     // console.log(e)
//     // Creates an Array from the results object to iterate through
//     let resultsArray = Array.from(e.results)

//     // The last thing we say in the mic is the last element in the array, so using pop() gets the latest element
//     let finalResult = resultsArray.pop()
    

//     // This line removes the whitespace from the beginning of the transcript. The replace method removes the punctuation that is automatically added by Microsoft edge
//     let parsedTranscript = finalResult[0].transcript.trimStart().replace('.',"")
//     console.log(parsedTranscript)


//     let colors = ['blue','red','green','orange','purple','pink']

//     for (let i of colors){

//         if (parsedTranscript.toLowerCase() === i){

//             setTimeout(()=>{

//                 ding.autoplay = true;
//                 ding.play();

//             },950)

//             document.body.style.backgroundColor = i

//             // This seems to work on the iphone to stop recording
//             speechRecognition.start()
//             speechRecognition.stop()

//             // Need to toggle and change the button manually here for iphone
//             button.classList.toggle('speak-active')
//             button.innerText = 'Talk'

            
            
            
            
//         }

//         ding.play();
//     }
    

   





// })
