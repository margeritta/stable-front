<template>
  <div>
    <v-card class="pa-2">
      <v-row class="fill-height" align="center" justify="center">
        <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
          <!-- <v-img
            :src="require('../assets/img/home/logo.png')"
            height="150px"
            width="230"
          >
          </v-img> -->
        </div>
        <br />
      </v-row>
    </v-card>
    <v-carousel hide-delimiters>
      <v-carousel-item :src="require('../assets/img/home/slider4.jpg')">
      </v-carousel-item>
      <v-carousel-item :src="require('../assets/img/home/slider2.jpg')">
        <v-row class="fill-height" align="center" justify="center">
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item :src="require('../assets/img/home/slider3.jpg')">
        <v-row class="fill-height" align="center" justify="center"> </v-row>
      </v-carousel-item>
      <v-carousel-item :src="require('../assets/img/home/slider1.jpg')">
        <v-row class="fill-height" align="center" justify="center"> </v-row>
      </v-carousel-item>
    </v-carousel>

    <v-container fluid>
      <v-card class="pa-5">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
            <v-img
              :src="require('../assets/img/home/logo.png')"
              height="140px"
              width="210"
            >
            </v-img>
          </div>
          <br />
        </v-row>
      </v-card>
      <v-card elevation="2" justify="center">
        <v-card-title primary-title class="justify-center font-weight-light">
          <div>
            <h1 class="font-weight-light">Stadnina Dworska</h1>
          </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text class="text--primary text-center">
          <div>
            <div class="font-weight-light text-h6" style="font-size: 1.5em"
              >Oferujemy profesjonalną naukę jazdy konnej zarówno dla dzieci,
              jak i dla dorosłych. Zapraszamy wszystkich, którzy lubią konie,
              kontakt z naturą lub po prostu chcą odpocząć w przyjaznej
              atmosferze</div
            >
          </div>
        </v-card-text>
      </v-card>
    </v-container>
    <v-card class="brown darken-1">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">Zbylitowska Góra</h3>
                <p class="font-weight-thin">ul. Zbylitowskich 95</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">020-800-456-747</h3>
                <p class="font-weight-thin">Pani Anastazja - kontakt z klientem, zapisy na jazdy, organizacja</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">967-800-496-666</h3>
                <p class="font-weight-thin">Pani Małgorzata - zaplecze stajenne, współpraca</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      activeBtn: 1,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
