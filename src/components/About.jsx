import '../styles/About.css';
import React, { useState } from 'react';
function About(){
     const [showComponent, setShowComponent] = useState(false);
      function handleCheckNow() {
    setShowComponent(true);
  }

    return(
        <>
        <p className="sponsored">
          Sponsored:   K.Exchange: Trade with up to 50x leverage directly from your wallet. Kaanch Decentralized Exchange — {" "}
          <span className="check-now" onClick={handleCheckNow}>
            Check Now
          </span>
        </p>
        {showComponent && (
        <div className="opened-component">
          <h2>Opened Component</h2>
          <p>Yeh component “Check Now” click karne ke baad dikh raha hai.</p>
          <InnerComponent />
          <AnotherComponent />
        </div>
      )}

        </>

    )
}
export default About;