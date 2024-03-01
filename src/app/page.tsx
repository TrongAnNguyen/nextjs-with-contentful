import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import Link from 'next/link'
import { useGetHomesQuery } from '@/codegen/graphql/queries/home.generated'

export default async function Home() {
  const housingLocations = await useGetHomesQuery.fetcher()()

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
        {housingLocations.homeCollection?.items.map((housingLocation, index) => (
          <section className="listing" key={index}>
            <Image
              className="listing-photo"
              src={housingLocation.photo?.url || ''}
              alt={`Exterior photo of ${housingLocation.name}`}
              width={0}
              height={0}
              sizes="100vw"
            />
            <h2 className="listing-heading">{housingLocation.name}</h2>
            <p className="listing-location">
              {housingLocation.city}, {housingLocation.state}
            </p>
            <Link href={`/details/${housingLocation.sys.id}`}>Learn more</Link>
          </section>
        ))}
      </section>
    </main>
  )
}
