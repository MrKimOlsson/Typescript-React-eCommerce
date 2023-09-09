import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <>
      {/* Render the Navbar component */}      
      <Navbar />

      <div className="container">
        {/* Renders a child components of the RootLayout element component AKA the pages */}
        <Outlet />
      </div>

      {/* Render the Footer component */}
      <Footer />
    </>
  );
}

export default RootLayout