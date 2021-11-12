<template>
  <div class="selectedRestaurant">
    <router-link to="/" class="back" aria-label="Retour" title="Retour"></router-link>
    <div>
        <p>img</p>
        <!--<p>{{ restaurant.restaurantName }}</p>-->
        <p>{{ restaurantClicked }}</p>
        <p>averageRating</p>
        <p>address</p>
        <p>comments</p>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default ({
  setup() {
    const store = useStore();
    const { restaurantClicked } = store.state;
    const { restaurantsList } = store.state;
    // let restaurantChosen;

    // console.log(restaurantClicked);

    /*
    const store = useStore();
    const { restaurantsList } = store.state;
    */
    restaurantsList.forEach((element) => {
      if (element.restaurantName === restaurantClicked) {
        // restaurantChosen = element;
        store.state.restaurantChosen = element;
      }
    });

    console.log(store.state.restaurantChosen);

    return { restaurantClicked };
  },
});
</script>

<style lang="scss">
.selectedRestaurant {
  padding-top: 30px;
  width: 350px;
  overflow: auto;

  a {
    text-decoration: none;
    display: flex;
  }
}

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
