import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
    return (
      <div>
        <h1>About Us</h1>
        <p>This is the about page content.</p>
      </div>
    );
  };
  
  export default AboutPage;

// Use Link to create a link to the About page
<Link href="/about">
  <a>About Us</a>
</Link>