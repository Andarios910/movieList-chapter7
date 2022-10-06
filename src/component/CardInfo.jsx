import React from 'react'

export default function CardInfo({ title, check }) {
    return (
        <div className='container card__info'>
            <h2 style={{marginBottom: '2rem'}}>{title}</h2>
            {
                check ? '':<h5 className='all__movies'>See All Movies</h5>
            }
        </div>
    )
}
