<template>
  <div class="selectedRestaurant hidden">
    <p class="back" aria-label="Retour" title="Retour"></p>
    <div>
        <p>img</p>
        <p>restaurantName</p>
        <p>averageRating</p>
        <p>address</p>
        <p>comments</p>
    </div>
  </div>
</template>

<style lang="scss">
.back {
    width: fit-content;

    &:hover {
      cursor: pointer;
      color: #42b983;
    }

    &::before {
    content: '\1F810';
    font-size: 3rem;
  }
  }
</style>
