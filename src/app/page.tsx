import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import { housingLocations } from '@/constant'
import Link from 'next/link'

export default async function Home() {
  return (
    <main>
      <a>
        <header className="brand-name">
          <Image className="brand-logo" src={Logo} alt="logo" aria-hidden="true" />
        </header>
      </a>
      <section className="content"></section>
      <section>
        <form>
          <input type="text" placeholder="Filter by city" />
          <button className="primary" type="button">
            Search
          </button>
        </form>
      </section>
      <section className="results">
        {housingLocations.map((housingLocation, index) => (
          <section className="listing" key={index}>
            <img
              className="listing-photo"
              src={housingLocation.photo}
              alt={`Exterior photo of ${housingLocation.name}`}
            />
            <h2 className="listing-heading">{housingLocation.name}</h2>
            <p className="listing-location">
              {housingLocation.city}, {housingLocation.state}
            </p>
            <Link href={`/details/${housingLocation.id}`}>Learn more</Link>
          </section>
        ))}
      </section>
    </main>
  )
}
