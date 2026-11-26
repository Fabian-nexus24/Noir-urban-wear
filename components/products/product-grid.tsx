"use client"
import Link from "next/link"
import { ArrowUpRight, Plus, Star } from "lucide-react"
import type { Product } from "@/types/store"
import { formatPrice } from "@/data/products"
import { useCart } from "@/components/cart/cart-provider"
export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart(); const available = product.stock === "available"
  return <article className="product-card"><Link href={`/products/${product.slug}`} className="product-image-wrap"><img src={product.image} alt={product.name} className="product-image" loading="lazy"/><span className={`stock-pill ${available ? "in-stock" : "sold-stock"}`}>{available ? (product.isNew ? "NEW IN" : "IN STOCK") : product.stock === "sold-out" ? "SOLD OUT" : "OUT OF STOCK"}</span><span className="image-arrow"><ArrowUpRight /></span></Link><div className="product-info"><div className="product-meta"><span>{product.category}</span><span className="rating"><Star fill="currentColor"/> {product.rating.toFixed(1)}</span></div><Link href={`/products/${product.slug}`} className="product-name">{product.name}</Link><div className="price-row"><strong>{formatPrice(product.price)}</strong>{product.previousPrice && <del>{formatPrice(product.previousPrice)}</del>}</div><button disabled={!available} className="quick-add" onClick={() => add(product.id)}>{available ? <><Plus /> QUICK ADD</> : "CURRENTLY UNAVAILABLE"}</button></div></article>
}
export function ProductGrid({ products, className = "" }: { products: Product[]; className?: string }) { return <div className={`product-grid ${className}`}>{products.map((product) => <ProductCard key={product.id} product={product}/>)}</div> }
