import React from 'react'
import { useParams } from 'react-router-dom'

export default function CategoryProductsPage() {
    const {categoryId} = useParams()
  return (
    <div>CategoryProductsPage</div>
  )
}
