import React, {useRef} from 'react';
import useWebAnimations from "@wellyshen/use-web-animations";
import './App.css';

function App() {

  var sceneryFrames =   [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }   
  ];
  
  var sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };
  
  var sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };
  
  const background1 = useRef();

  var  background1Movement = useWebAnimations({ref: background1, 
    keyframes: sceneryFrames, 
    timing: sceneryTimingBackground,
  })

  const bg1Animation = background1Movement.getAnimation();

  if (bg1Animation)
  bg1Animation.currentTime = bg1Animation.effect.getTiming().duration / 2;


  const background2 = useRef();
 
  var  background2Movement = useWebAnimations({ref: background2, 
  keyframes: sceneryFrames, 
  timing: sceneryTimingBackground})
  

  const foreground1 = useRef();
  
  var  foreground1Movement = useWebAnimations({ref: foreground1, 
    keyframes: sceneryFrames, 
    timing: sceneryTimingForeground})

  const fg1Animation = foreground1Movement.getAnimation();
  if (fg1Animation)
  fg1Animation.currentTime = fg1Animation.effect.getTiming().duration / 2;


  const foreground2 = useRef();

  var  foreground2Movement = useWebAnimations({ref: foreground2, 
  keyframes: sceneryFrames, 
  timing: sceneryTimingForeground})
  
  
  var spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }   
  ];
  
  const redQueen_alice_sprite = useRef();

  var redQueen_alice = useWebAnimations({ ref: redQueen_alice_sprite,
    keyframes: spriteFrames, 
    timing: {
    easing: 'steps(7, end)',
    direction: "reverse",
    duration: 600,
    playbackRate: 1,
    iterations: Infinity
  },
  /*
  onUpdate: ({ playState, animate, animation }) => {
    // Triggered when the animation enters the running state or changes state
    console.log("Playstate ", playState)
    console.log("Animate ", animate)
    console.log("Animation ", animation)
  },
  */
  });
  
  /* Alice tires so easily! 
    Every so many seconds, reduce their playback rate so they slow a little. 
  */
  var sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];
  
  var adjustBackgroundPlayback = (redQueen_alice) => {
    var rQA = null;
    if (redQueen_alice) {
    rQA = redQueen_alice.getAnimation();
    if (rQA) {
      /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
    /* But if they fall under 1, the background slides backwards */
    if (rQA.playbackRate < .8) {
      sceneries.forEach(function(anim) {
        const animation = anim.getAnimation();
        animation.playbackRate = rQA.playbackRate/2 * -1;
      });
    } else if (rQA.playbackRate > 1.2) {
      sceneries.forEach(function(anim) {
        const animation = anim.getAnimation();
        animation.playbackRate = rQA.playbackRate/2;
      });
    } else {
      sceneries.forEach(function(anim) {
        const animation = anim.getAnimation();
        animation.playbackRate = 0;    
      });
    }
  }}
  }
  /*
  if (redQueen_alice)
  adjustBackgroundPlayback(redQueen_alice);
  */
  
  /* Set decay */
  setInterval( () => {
    if (redQueen_alice.getAnimation() && redQueen_alice.getAnimation().playbackRate > .4) {
      redQueen_alice.getAnimation().playbackRate *= .9;    
    } 
  
    adjustBackgroundPlayback(redQueen_alice);
  
  }, 3000);

  /* But you can speed them up by giving the screen a click or a tap. */
  var goFaster = (redQueen_alice) => {
    if (redQueen_alice.getAnimation())
    redQueen_alice.getAnimation().playbackRate *= 1.2;

    adjustBackgroundPlayback(redQueen_alice);

  }

  return (
      <div onClick={() => {goFaster(redQueen_alice)}} className="wrapper">
        <div className="sky"></div>
        <div className="earth">
          <div id="red-queen_and_alice">
            <img ref={redQueen_alice_sprite} id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place."></img>
          </div>
        </div>
      
        <div ref={foreground1} className="scenery" id="foreground1">
          <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" "></img>
        </div>
 
        <div ref={foreground2} className="scenery" id="foreground2">    
          <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" "></img>
          <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" "></img>
        </div>
 
        <div ref={background1} className="scenery" id="background1">
          <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" "></img>
          <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" "></img>
          <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" "></img>
        </div>
 
        <div ref={background2} className="scenery" id="background2">
          <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" "></img>
          <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" "></img>
          <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" "></img>
        </div>
      </div>

  );
}

export default App;
