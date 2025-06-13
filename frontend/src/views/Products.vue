<template>
  <v-container>
    <h1 class="text-h3 mb-6">Headphones</h1>
    
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="h-100">
          <v-img
            :src="product.imageUrl"
            height="200"
            cover
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-4"></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-text>
            <div class="text-subtitle-1 mb-2">{{ formatPrice(product.price) }}원</div>
            <div class="text-body-2">{{ product.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="addToCart(product)"
            >
              Add to Cart
            </v-btn>
            <v-btn
              color="primary"
              variant="text"
              :to="'/products/' + product.id"
            >
              Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { logger } from '@/utils/logger';

export default {
  name: 'Products',
  data: () => ({
    products: []
  }),
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async fetchProducts() {
      try {
        logger.info('Fetching products');
        const response = await axios.get('/api/products');
        this.products = response.data;
        logger.info('Products fetched successfully', { count: this.products.length });
      } catch (error) {
        logger.error('Error fetching products', error);
        this.$toast.error('Failed to load products');
      }
    },
    async addToCart(product) {
      try {
        logger.info('Adding product to cart', { productId: product.id });
        await axios.post('/api/cart/items', {
          productId: product.id,
          quantity: 1
        });
        logger.info('Product added to cart successfully', { productId: product.id });
        this.$toast.success('Added to cart');
      } catch (error) {
        logger.error('Error adding product to cart', error, { productId: product.id });
        this.$toast.error('Failed to add to cart');
      }
    }
  },
  mounted() {
    logger.debug('Products component mounted');
    this.fetchProducts();
  }
}
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style> 