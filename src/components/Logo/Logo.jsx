import React from 'react'
import LogoPath from "../../images/Sortify_black_text.png"
function Logo({width='100px'}) {
  return (
    // <div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><img src={LogoPath} alt="sportify.notfound" /></svg></div>

    <div>
    <svg xmlns="http://www.w3.org/2000/svg" role="img" class="iconify iconify--logos"  aria-hidden="true" width="100" height="40" viewBox="0 0 256 228">
        <image href={LogoPath} x="0" y="0" width="256" height="228" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"/>
    </svg>
</div>




  )
}

export default Logo