<template>
	<div>
		<div class="section">
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
	</div>
</template>
<script>
import { Card, Button } from "@/components";
import axios from "axios";

export default {
	name: "events",
	bodyClass: "events-page",
	components: {
		Card,
		[Button.name]: Button,
	},
	data: function () {
		return { events: {} };
	},
	created: async function () {
		await this.fetchEvents();
	},
	methods: {
		fetchEvents: async function (e) {
			await axios({
				url: "http://localhost:8080/api/events",
				method: "GET",
			})
				.then((resp) => {
					this.events = resp.data;
				})
				.catch((err) => this.$toast.error(err.response.data.message.message, "Error"));
		},
	},
};
</script>
<style></style>
