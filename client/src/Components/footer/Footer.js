import React from 'react';
import './Footer.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <div className='footer'>
      <div className="top">
        <div className="contact">
          <div className="grop">
            < EmailIcon sx={{ fontSize: "10px" }}  /> MealMatch@gmail.com
          </div>
          <div className="grop">
          <LocationOnIcon sx={{ fontSize: "10px" }}  /> colombo 07 127/4
            
          </div>
          <div className="grop">
          <LocalPhoneIcon sx={{ fontSize: "10px" }} /> 0716775718
          </div>
        </div>
        <div className="icon">
          <FacebookIcon/>
          <TwitterIcon/>
          <InstagramIcon />
        </div>
      </div>
      <div className="buttom">
      Copyright © 2023 MealMatch. All Right Reserved
      </div>
    </div>
  )
}

export default Footer