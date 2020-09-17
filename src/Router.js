import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
//import compoents
import HomeContainer from './components/HomeContainer.js';
import TodoContainer from './components/TodoContainer';
import UserContainer from './components/UserContainer';

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
    };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
    return spring(val, {
        stiffness: 330,
        damping: 22,
    });
}

// child matches will...
const bounceTransition = {
    // start in a transparent, upscaled state
    atEnter: {
        opacity: 0,
        scale: 1.2,
    },
    // leave in a transparent, downscaled state
    atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8),
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
        opacity: bounce(1),
        scale: bounce(1),
    },
};

const Router = () => (
    //define path and use component
    <Switch>
        {/* <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"> */}
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/user/:user_id" component={UserContainer} />
        <Route exact path="/todos" component={TodoContainer} />
        {/* </AnimatedSwitch> */}
    </Switch>
)

export default Router