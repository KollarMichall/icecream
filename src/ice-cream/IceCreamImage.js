import React from 'react'

const IceCreamImage = ({ iceCreamId }) => 
iceCreamId != null && (
<img
src={`${process.env.PUBLIC_URL}/ice-cream-images/ice-cream-${iceCreamId.toString()}.svg`}
alt=""
/>
)

export default IceCreamImage
