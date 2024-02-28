import { useGetHomeDetailQuery } from '@/codegen/graphql/queries/home.generated'
import React from 'react'

type HomeDetailProps = {
  params: {
    slug: string
  }
}

const HomeDetail: React.FC<HomeDetailProps> = async ({ params }) => {
  const housingLocation = await useGetHomeDetailQuery.fetcher({ id: params.slug })()
  const { photo, name, city, state, availableUnits, wifi, laundry } = housingLocation?.home || {}

  return (
    <article>
      <img className="listing-photo" src={photo?.url || ''} alt={`Exterior photo of ${name}`} />
      <section className="listing-description">
        <h2 className="listing-heading">{name || ''} </h2>
        <p className="listing-location">{`${city || ''} - ${state || ''}`}</p>
      </section>
      <section className="listing-features">
        <h2 className="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {availableUnits || 0}</li>
          <li>Does this location have wifi: {wifi ? 'yes' : 'no'}</li>
          <li>Does this location have laundry: {laundry ? 'yes' : 'no'}</li>
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
