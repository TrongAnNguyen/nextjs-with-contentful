import { housingLocations } from '@/constant'
import React from 'react'

type HomeDetailProps = {
  params: {
    slug: string
  }
}

const HomeDetail: React.FC<HomeDetailProps> = ({ params }) => {
  console.log('params', params.slug)
  const housingLocation = housingLocations.find((housing) => housing.id === Number(params.slug))

  return (
    <article>
      <img
        className="listing-photo"
        src={housingLocation?.photo || ''}
        alt={`Exterior photo of ${housingLocation?.name}`}
      />
      <section className="listing-description">
        <h2 className="listing-heading">{housingLocation?.name || ''} </h2>
        <p className="listing-location">
          {`${housingLocation?.city || ''} - ${housingLocation?.state || ''}`}
        </p>
      </section>
      <section className="listing-features">
        <h2 className="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {housingLocation?.availableUnits || 0}</li>
          <li>Does this location have wifi: {housingLocation?.wifi ? 'yes' : 'no'}</li>
          <li>Does this location have laundry: {housingLocation?.laundry ? 'yes' : 'no'}</li>
        </ul>
      </section>
      <section className="listing-apply">
        <h2 className="section-heading">Apply now to live here</h2>
        <form>
          <label htmlFor="first-name">First Name</label>
          <input id="first-name" type="text" />
          <label htmlFor="last-name">Last Name</label>
          <input id="last-name" type="text" />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
          <button type="submit" className="primary">
            Apply now
          </button>
        </form>
      </section>
    </article>
  )
}

export default HomeDetail
