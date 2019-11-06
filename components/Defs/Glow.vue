<template>
  <!-- https://stackoverflow.com/questions/36284828/svg-adding-shadow-filter-makes-straight-line-invisible -->
  <filter id="glow" x="-500" y="-500" height="1000" width="1000" filterUnits="userSpaceOnUse">
    <fegaussianblur class="blur" result="coloredBlur" stddeviation="4"/>
    <femerge>
      <femergenode in="coloredBlur"></femergenode>
      <!-- <femergenode in="coloredBlur"></femergenode> -->
      <femergenode in="SourceGraphic"></femergenode>
    </femerge>
  </filter>
</template>