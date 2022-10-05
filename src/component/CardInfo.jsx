import React from 'react'

export default function CardInfo({ title }) {
    return (
        <div className='container card__info'>
            <h2 style={{marginBottom: '2rem'}}>{title}</h2>
            <h5 className='all__movies'>See All Movies</h5>
        </div>
    )
}
