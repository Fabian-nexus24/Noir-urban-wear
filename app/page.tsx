import Link from "next/link"
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react"
import { categories, products } from "@/data/products"
import { ProductGrid } from "@/components/products/product-grid"

const categoryIds = ["Shoes", "T-Shirts", "Hoodies & Outerwear", "Accessories"]
const categoryImages = {
  Shoes: "/images/noir-category-shoes.webp",
  "T-Shirts": "/images/noir-category-tees.webp",
  "Hoodies & Outerwear": "/images/noir-category-outerwear.webp",
  Accessories: "/images/noir-category-accessories.webp",
}

export default function Home() {
  const newArrivals = products.filter((product) => product.isNew).slice(0, 4)
  const newArrivalIds = new Set(newArrivals.map((product) => product.id))
  const bestSellers = products.filter((product) => product.featured && !newArrivalIds.has(product.id)).slice(0, 4)
  const featuredIds = new Set([...newArrivalIds, ...bestSellers.map((product) => product.id)])

  const categorySections = categoryIds.map((name, index) => {
    const category = categories.find((item) => item.name === name)!
    const categoryProducts = products.filter((product) => product.category === name && !featuredIds.has(product.id)).slice(0, 4)
    categoryProducts.forEach((product) => featuredIds.add(product.id))

    return { name, index, category, products: categoryProducts }
  })

  return (
    <div className="home-page">
      <section className="hero home-hero" aria-labelledby="home-hero-title">
        <img
          className="hero-image"
          src="/images/noir-campaign-hero.webp"
          alt="A model in charcoal streetwear against a warm, textured city backdrop"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light-eyebrow">THIKA, KENYA <span>·</span> MADE FOR YOUR EVERYDAY</p>
          <h1 id="home-hero-title">WEAR YOUR<br /><span>IDENTITY.</span></h1>
          <p className="hero-desc">Streetwear made for those who move differently. Discover your style. Make your statement.</p>
          <div className="hero-actions">
            <Link className="button-light" href="/shop">SHOP COLLECTION <ArrowUpRight aria-hidden="true" /></Link>
            <Link className="hero-secondary" href="/shop?sort=newest">EXPLORE NEW ARRIVALS <ArrowDown aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="hero-index"><span>01</span><span className="index-line" aria-hidden="true" /> THE NOIR EDIT / 26</div>
        <div className="hero-vertical" aria-hidden="true">WEAR YOUR IDENTITY —</div>
      </section>

      <div className="ticker" aria-label="Built for the city. Made for your everyday. Thika to everywhere.">
        <span>BUILT FOR THE CITY</span><Sparkles aria-hidden="true" />
        <span>MADE FOR YOUR EVERYDAY</span><Sparkles aria-hidden="true" />
        <span>THIKA TO EVERYWHERE</span><Sparkles aria-hidden="true" />
        <span>BUILT FOR THE CITY</span>
      </div>

      <section className="section-shell arrivals-section" aria-labelledby="new-arrivals-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FRESH FROM THE STUDIO</p>
            <h2 id="new-arrivals-title">NEW ARRIVALS</h2>
            <p className="section-intro">Fresh pieces. New energy. Discover what&apos;s new.</p>
          </div>
          <Link className="text-link" href="/shop">VIEW ALL PIECES <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <ProductGrid products={newArrivals} />
      </section>

      <section className="categories-section" id="categories" aria-labelledby="category-title">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR NEXT GO-TO</p>
              <h2 id="category-title">SHOP BY CATEGORY</h2>
            </div>
            <p className="section-aside">Pieces for every side of you.</p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link key={category.name} href={`/shop?category=${encodeURIComponent(category.name)}`} className="category-card">
                <img src={categoryImages[category.name]} alt={`Editorial streetwear campaign for ${category.name}`} loading="lazy" />
                <span className="category-index">0{index + 1}</span>
                <div><small>{category.note}</small><h3>{category.name}</h3></div>
                <span className="category-arrow" aria-hidden="true"><ArrowUpRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell best-section" aria-labelledby="best-sellers-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COMMUNITY PICKS</p>
            <h2 id="best-sellers-title">BEST SELLERS</h2>
            <p className="section-intro">The pieces you keep coming back to.</p>
          </div>
          <Link className="text-link" href="/shop">SHOP THE EDIT <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <ProductGrid products={bestSellers} className={bestSellers.length === 2 ? "product-grid--two" : ""} />
      </section>

      <section className="statement-banner" aria-labelledby="statement-title">
        <img
          src="/images/noir-statement-campaign.webp"
          alt="A model in layered olive and off-white streetwear against concrete city architecture"
          loading="lazy"
        />
        <div className="statement-overlay" />
        <div className="statement-copy">
          <p className="eyebrow light-eyebrow">NOIR IS A STATE OF MIND</p>
          <h2 id="statement-title">YOUR STYLE.<br />YOUR STATEMENT.</h2>
          <p>Don&apos;t follow the crowd. Define your own identity through what you wear.</p>
          <Link className="button-light" href="/shop">SHOP NOW <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>

      {categorySections.map(({ name, index, category, products: categoryProducts }) => (
        <section className={`section-shell category-products category-products-${index}`} key={name} aria-labelledby={`category-products-${index}`}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE NOIR ROTATION / 0{index + 1}</p>
              <h2 id={`category-products-${index}`}>{name.toUpperCase()}</h2>
            </div>
            <Link className="text-link" href={`/shop?category=${encodeURIComponent(name)}`}>VIEW CATEGORY <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <ProductGrid products={categoryProducts} className={`category-products-grid category-products-grid--${categoryProducts.length}`} />
          <span className="sr-only">{category.note}</span>
        </section>
      ))}

      <section className="store-strip" aria-labelledby="store-title">
        <div className="store-icon"><MapPin aria-hidden="true" /></div>
        <div>
          <p className="eyebrow">COME THROUGH</p>
          <h2 id="store-title">FIND US IN THIKA.</h2>
          <p>Uhuru Street, Thika Town, Kenya <span>·</span> 10:00 AM – 8:00 PM</p>
        </div>
        <a href="https://maps.google.com/?q=Uhuru+Street+Thika+Town+Kenya" target="_blank" rel="noreferrer" className="button-outline">GET DIRECTIONS <ArrowUpRight aria-hidden="true" /></a>
      </section>
    </div>
  )
}
