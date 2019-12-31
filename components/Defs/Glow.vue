<template>
  <filter id="glow" x="-50%" y="-100%" height="110%" width="110%" filterUnits="userSpaceOnUse">
    <!-- camelCase is important -->
    <feGaussianBlur  result="coloredBlur" stdDeviation="4"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</template>
