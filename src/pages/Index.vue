<template>
	<div>
		<div class="page-header clear-filter" filter-color="orange">
			<parallax
				class="page-header-image"
				style="background-image: url('img/home.jpg')"
			>
			</parallax>
			<div class="container">
				<div class="content-center brand">
					<!-- <img class="n-logo" src="img/now-logo.png" alt="" /> -->
					<h1 class="h1-seo">Evento</h1>
					<h3>Where we make your event the best.</h3>
				</div>
				<!-- <h6 class="category category-absolute">
          Designed by
          <a href="http://invisionapp.com/" target="_blank">
            <img src="img/invision-white-slim.png" class="invision-logo" /> </a
          >. Coded by
          <a href="https://www.creative-tim.com" target="_blank">
            <img
              src="img/creative-tim-white-slim2.png"
              class="creative-tim-logo"
            /> </a
          >.
        </h6> -->
			</div>
		</div>

		<div class="section section-about-us">
			<div class="container">
				<div class="row">
					<div class="col-md-8 ml-auto mr-auto text-center">
						<h2 class="title">Welcome to Evento</h2>
						<h5 class="description">
							From Wedding Functions to Birthday Parties or Corporate Events to
							Musical Functions, We offer full range of Events Management
							Services that scale to your needs & budget.
						</h5>
					</div>
				</div>
				<div class="separator separator-primary"></div>
				<div class="section-story-overview">
					<div class="row">
						<div class="col-md-6">
							<div
								class="image-container image-left"
								style="background-image: url('img/home1.jpg')"
							></div>
						</div>
						<div class="col-md-5">
							<!-- First image on the right side, above the article -->
							<div
								class="image-container image-right"
								style="background-image: url('img/home2.jpg')"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="section section-about-us">
			<div class="container">
				<div class="row">
					<div class="col-md-8 ml-auto mr-auto text-center">
						<h2 class="title">Our Events</h2>
					</div>
				</div>
				<div class="separator separator-primary"></div>
				<div class="section-story-overview">
					<div class="row">
						<div class="col-md-4" v-for="event in events" :key="event.id">
							<card class="text-center hover-shadow" style="width: 100%">
								<img
									slot="image"
									class="card-img-top"
									:src="event.image"
									:alt="event.title"
								/>
								<div>
									<h4 class="card-title">{{ event.title }}</h4>
									<router-link
										class="btn btn-primary"
										:to="{ name: 'event', params: { slug: event.slug } }"
									>
										Read More
									</router-link>
								</div>
							</card>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="section section-about-us">
			<div class="container">
				<div class="row">
					<div class="col-md-8 ml-auto mr-auto text-center">
						<h2 class="title">Gallery</h2>
					</div>
				</div>
				<div class="separator separator-primary"></div>
				<div class="section-gallery">
					<div class="row">
						<div class="col-md-12 ml-auto mr-auto">
							<div class="row collections">
								<div class="col-md-4" v-for="img in imgs" :key="img._id">
									<el-image
										style="width: 100%; height: auto"
										:src="img.image"
										:preview-src-list="[img.image]"
									>
									</el-image>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Parallax, Card, Button } from "@/components";
import axios from "axios";

export default {
	name: "index",
	bodyClass: "index-page",
	components: {
		Parallax,
		Card,
		[Button.name]: Button,
	},
	data: function () {
		return {
			events: {},
			imgs: {},
		};
	},
	created: async function () {
		await this.fetchEvents();
		await this.fetchGallery();
	},
	methods: {
		fetchEvents: async function (e) {
			await axios({
				url: "http://localhost:8080/api/events/featured",
				method: "GET",
			})
				.then((resp) => {
					this.events = resp.data;
				})
				.catch((err) => this.$toast.error(err.response.data.message.message, "Error"));
		},
		fetchGallery: async function (e) {
			await axios({
				url: "http://localhost:8080/api/gallery/featured",
				method: "GET",
			})
				.then((resp) => {
					this.imgs = resp.data;
				})
				.catch((err) => this.$toast.error(err.response.data.message.message, "Error"));
		},
	},
};
</script>
<style></style>
