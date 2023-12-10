import React from 'react'

function Kcartbiner(props) {
    return (
        <div>
            <div className="card card-b1 " >
                <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_0nxrkxob.json" background="transparent" speed="1" style={{ width: 150, height: 140 }} loop autoplay></lottie-player>
                <div className='card-l title'>{props.name}</div>
                <div className='card-r count'><span className='count-text' >{props.count}</span></div>
            </div>
        </div>
    )
}

export default Kcartbiner