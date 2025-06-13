<template>
  <v-container>
    <v-row v-if="product">
      <v-col cols="12" md="6">
        <v-img
          :src="product.imageUrl"
          height="400"
          cover
          class="rounded-lg"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey-lighten-4"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>

      <v-col cols="12" md="6">
        <h1 class="text-h3 mb-4">{{ product.name }}</h1>
        <div class="text-h5 mb-4">{{ formatPrice(product.price) }}원</div>
        <div class="text-body-1 mb-6">{{ product.description }}</div>

        <v-row align="center" class="mb-6">
          <v-col cols="auto">
            <v-btn
              icon
              @click="decreaseQuantity"
              :disabled="quantity <= 1"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <span class="text-h6">{{ quantity }}</span>
          </v-col>
          <v-col cols="auto">
            <v-btn
              icon
              @click="increaseQuantity"
              :disabled="quantity >= product.stock"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-btn
          color="primary"
          size="large"
          block
          @click="addToCart"
          :disabled="product.stock === 0"
        >
          {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
        </v-btn>

        <div class="mt-4">
          <v-alert
            v-if="product.stock <= 5 && product.stock > 0"
            type="warning"
            variant="tonal"
          >
            Only {{ product.stock }} items left in stock!
          </v-alert>
        </div>
      </v-col>
    </v-row>

    <v-row v-else class="justify-center">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { logger } from '@/utils/logger';

export default {
  name: 'ProductDetail',
  data: () => ({
    product: null,
    quantity: 1
  }),
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async fetchProduct() {
      try {
        logger.info('Fetching product details', { productId: this.$route.params.id });
        const response = await axios.get(`/api/products/${this.$route.params.id}`);
        this.product = response.data;
        logger.info('Product details fetched successfully', { 
          productId: this.product.id,
          name: this.product.name
        });
      } catch (error) {
        logger.error('Error fetching product details', error, { 
          productId: this.$route.params.id 
        });
        this.$toast.error('Failed to load product details');
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
        logger.debug('Quantity decreased', { 
          productId: this.product.id,
          newQuantity: this.quantity 
        });
      }
    },
    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++;
        logger.debug('Quantity increased', { 
          productId: this.product.id,
          newQuantity: this.quantity 
        });
      }
    },
    async addToCart() {
      try {
        logger.info('Adding product to cart', { 
          productId: this.product.id,
          quantity: this.quantity 
        });
        await axios.post('/api/cart/items', {
          productId: this.product.id,
          quantity: this.quantity
        });
        logger.info('Product added to cart successfully', { 
          productId: this.product.id,
          quantity: this.quantity 
        });
        this.$toast.success('Added to cart');
      } catch (error) {
        logger.error('Error adding product to cart', error, { 
          productId: this.product.id,
          quantity: this.quantity 
        });
        this.$toast.error('Failed to add to cart');
      }
    }
  },
  mounted() {
    logger.debug('ProductDetail component mounted', { 
      productId: this.$route.params.id 
    });
    this.fetchProduct();
  }
}
</script> 